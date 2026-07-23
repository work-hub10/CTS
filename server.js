/**
 * server.js — Express backend for Drawing Extraction OCR
 * 
 * POST /api/extract
 *   - Accepts multipart file upload (PDF, JPG, PNG) up to 20MB
 *   - Authenticates to Vertex AI via service account
 *   - Sends file to Gemini 2.5 Flash for engineering drawing analysis
 *   - Returns structured JSON with extracted objects
 */

require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { GoogleAuth } = require('google-auth-library');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const PROJECT_ID = process.env.GCP_PROJECT_ID || 'tenxds-agents-idp';
const LOCATION = process.env.GCP_LOCATION || 'us-central1';
const MODEL = 'gemini-2.5-flash';

// ─── CORS ────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080'],
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Serve static frontend files from the root directory
app.use(express.static(__dirname));

// ─── MULTER (file upload, 20MB max) ──────────────
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}. Accepted: PDF, JPG, PNG.`));
    }
  },
});

// ─── GOOGLE AUTH (cached, auto-refreshing) ───────
const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});
let cachedClient = null;

async function getAccessToken() {
  if (!cachedClient) {
    cachedClient = await auth.getClient();
  }
  const tokenResponse = await cachedClient.getAccessToken();
  return tokenResponse.token || tokenResponse;
}

// ─── EXTRACTION PROMPT ──────────────────────────
const EXTRACTION_PROMPT = `You are an expert engineering drawing analyst. You will be given an engineering
general arrangement drawing (tank, piping, or cathodic protection drawing).

Extract every identifiable structured engineering object visible in the drawing —
this includes equipment tags (e.g. nozzles, manways, anodes, rectifiers), table
rows (e.g. nozzle schedules, design data tables), and named details.

For each object, return:
- object_id: the tag/label/row identifier as shown on the drawing (e.g. "N4", "M1")
- object_type: what kind of object it is (e.g. "Nozzle", "Manway", "Design Parameter")
- key_attributes: the relevant attributes/values associated with it (size, service,
  quantity, rating, or other listed properties), as a short comma-separated string
- references: any cross-references to other drawings, details, or specs mentioned
  for this object, if visible
- confidence: your own confidence (0.0-1.0) that this extraction is accurate,
  based on text clarity and ambiguity

Return ONLY valid JSON matching this exact schema, with no markdown code fences,
no explanation, and no additional text:

{
  "objects": [
    { "object_id": "", "object_type": "", "key_attributes": "", "references": "", "confidence": 0.0 }
  ]
}

If a field is not present or unclear for an object, use an empty string rather
than guessing. Do not fabricate objects that are not visibly present in the drawing.`;

// ─── HELPER: call Vertex AI ─────────────────────
async function callGemini(fileBuffer, mimeType) {
  const accessToken = await getAccessToken();
  const base64Data = fileBuffer.toString('base64');

  const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}:generateContent`;

  const requestBody = JSON.stringify({
    contents: [
      {
        role: 'user',
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data,
            },
          },
          {
            text: EXTRACTION_PROMPT,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 65536,
    },
  });

  return new Promise((resolve, reject) => {
    const url = new URL(endpoint);
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body: data });
      });
    });

    req.on('error', reject);
    req.write(requestBody);
    req.end();
  });
}

// ─── HELPER: parse and clean Gemini response ────
function parseGeminiResponse(rawBody) {
  const parsed = JSON.parse(rawBody);

  // Check for truncation via finishReason
  const finishReason = parsed.candidates?.[0]?.finishReason;
  const wasTruncated = finishReason === 'MAX_TOKENS' || finishReason === 'SAFETY';

  // Extract text from the response
  const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('No text content in Gemini response');
  }

  // Strip markdown code fences if present (```json ... ```)
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*\n?/i, '');
  cleaned = cleaned.replace(/\n?```\s*$/i, '');
  cleaned = cleaned.trim();

  // Attempt direct JSON parse first
  let result;
  try {
    result = JSON.parse(cleaned);
  } catch (directParseErr) {
    // Truncation recovery: if the JSON was cut off, try to salvage completed objects
    console.log('[parse] Direct parse failed, attempting truncation recovery...');
    result = attemptTruncationRecovery(cleaned);
    if (!result) {
      throw directParseErr; // Re-throw original error if recovery fails
    }
    console.log(`[parse] Recovery succeeded: salvaged ${result.objects.length} objects`);
  }

  // Validate structure
  if (!result.objects || !Array.isArray(result.objects)) {
    throw new Error('Response missing "objects" array');
  }

  // Normalize confidence to 0-1 range (Gemini sometimes returns 0-100)
  result.objects = result.objects.map(obj => ({
    object_id: obj.object_id || '',
    object_type: obj.object_type || '',
    key_attributes: obj.key_attributes || '',
    references: obj.references || '',
    confidence: obj.confidence > 1 ? obj.confidence / 100 : obj.confidence,
  }));

  return result;
}

/**
 * Attempt to recover partial JSON from a truncated Gemini response.
 * Finds the last complete object in the array and closes the JSON.
 */
function attemptTruncationRecovery(truncatedJson) {
  try {
    // Find the last complete object by looking for the last '},' or '}' followed by valid structure
    // Strategy: progressively trim from the end until we get valid JSON
    
    // First, find the "objects" array start
    const arrayStart = truncatedJson.indexOf('[');
    if (arrayStart === -1) return null;

    // Find all complete object boundaries (closing braces that end an object in the array)
    const objectPattern = /\}\s*,/g;
    let lastCompleteEnd = -1;
    let match;
    while ((match = objectPattern.exec(truncatedJson)) !== null) {
      lastCompleteEnd = match.index + 1; // position right after the '}'
    }

    if (lastCompleteEnd === -1) return null;

    // Reconstruct: take everything up to the last complete object, then close the array and outer object
    const salvaged = truncatedJson.substring(0, lastCompleteEnd) + '\n  ]\n}';
    const result = JSON.parse(salvaged);
    
    if (result.objects && Array.isArray(result.objects) && result.objects.length > 0) {
      return result;
    }
    return null;
  } catch {
    return null;
  }
}

// ─── POST /api/extract ──────────────────────────
app.post('/api/extract', upload.single('file'), async (req, res) => {
  const startTime = Date.now();

  try {
    // Validate file
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded. Send a PDF, JPG, or PNG file in the "file" field.',
      });
    }

    console.log(`[extract] Received file: ${req.file.originalname} (${(req.file.size / 1024).toFixed(1)} KB, ${req.file.mimetype})`);

    // Call Gemini
    console.log('[extract] Sending to Vertex AI Gemini...');
    const response = await callGemini(req.file.buffer, req.file.mimetype);

    // Handle HTTP-level errors
    if (response.statusCode !== 200) {
      console.error(`[extract] Vertex AI returned ${response.statusCode}: ${response.body.substring(0, 500)}`);

      if (response.statusCode === 401 || response.statusCode === 403) {
        return res.status(response.statusCode).json({
          error: 'Authentication failed — ensure the service account has the "Vertex AI User" IAM role on the GCP project.',
          details: `HTTP ${response.statusCode}`,
        });
      }
      if (response.statusCode === 429) {
        return res.status(429).json({
          error: 'Rate limit exceeded — please wait a moment and retry.',
          details: 'HTTP 429',
        });
      }
      // 5xx or other
      return res.status(502).json({
        error: 'Vertex AI service error — this is likely transient, safe to retry.',
        details: `HTTP ${response.statusCode}`,
      });
    }

    // Parse response
    console.log('[extract] Parsing Gemini response...');
    let result;
    try {
      result = parseGeminiResponse(response.body);
    } catch (parseErr) {
      console.error('[extract] JSON parse error:', parseErr.message);
      console.error('[extract] Raw response body (first 1000 chars):', response.body.substring(0, 1000));
      return res.status(422).json({
        error: 'Gemini returned malformed data that could not be parsed as valid JSON. Try re-uploading.',
        details: parseErr.message,
      });
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`[extract] Success: ${result.objects.length} objects extracted in ${elapsed}s`);

    return res.json({
      success: true,
      objects: result.objects,
      meta: {
        objectCount: result.objects.length,
        elapsedSeconds: parseFloat(elapsed),
        model: MODEL,
        filename: req.file.originalname,
      },
    });

  } catch (err) {
    console.error('[extract] Unexpected error:', err);
    return res.status(500).json({
      error: `Server error: ${err.message}`,
    });
  }
});

// ─── MULTER ERROR HANDLER ───────────────────────
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ error: 'File too large. Maximum size is 20MB.' });
    }
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }
  if (err.message && err.message.includes('Unsupported file type')) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

// ─── HEALTH CHECK ───────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', model: MODEL, project: PROJECT_ID });
});

// ─── START ──────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('═══════════════════════════════════════════════');
  console.log('  10xDS Reverse BIM — Extraction API Server');
  console.log('═══════════════════════════════════════════════');
  console.log(`  Port:     ${PORT}`);
  console.log(`  Project:  ${PROJECT_ID}`);
  console.log(`  Location: ${LOCATION}`);
  console.log(`  Model:    ${MODEL}`);
  console.log(`  Endpoint: POST http://localhost:${PORT}/api/extract`);
  console.log('═══════════════════════════════════════════════');
  console.log('');

  // Automatically open browser on startup
  const { exec } = require('child_process');
  const url = `http://localhost:${PORT}`;
  const startCommand = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
  exec(`${startCommand} ${url}`, (err) => {
    if (err) console.error('Failed to auto-open browser:', err.message);
  });
});
