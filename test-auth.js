/**
 * test-auth.js — Standalone Vertex AI auth test
 * 
 * Loads the service account via google-auth-library, gets an access token,
 * and makes one minimal generateContent call to gemini-2.5-flash ("say hello")
 * to confirm the Node-side auth flow works.
 */

require('dotenv').config();
const { GoogleAuth } = require('google-auth-library');
const https = require('https');

const PROJECT_ID = process.env.GCP_PROJECT_ID || 'tenxds-agents-idp';
const LOCATION = process.env.GCP_LOCATION || 'us-central1';
const MODEL = 'gemini-2.5-flash';

async function main() {
  console.log('=== Vertex AI Auth Test ===');
  console.log(`Project: ${PROJECT_ID}`);
  console.log(`Location: ${LOCATION}`);
  console.log(`Model: ${MODEL}`);
  console.log(`Credentials file: ${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);
  console.log('');

  // Step 1: Authenticate
  console.log('[1/3] Authenticating via service account...');
  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  const accessToken = tokenResponse.token || tokenResponse;
  console.log(`  ✓ Access token obtained (${String(accessToken).substring(0, 20)}...)`);

  // Step 2: Build request
  console.log('[2/3] Sending minimal generateContent request...');
  const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}:generateContent`;

  const requestBody = JSON.stringify({
    contents: [
      {
        role: 'user',
        parts: [{ text: 'Say hello in one sentence.' }],
      },
    ],
  });

  // Step 3: Make the request
  const response = await new Promise((resolve, reject) => {
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

  // Step 4: Print result
  console.log(`[3/3] Response status: ${response.statusCode}`);
  console.log('');

  if (response.statusCode === 200) {
    const parsed = JSON.parse(response.body);
    const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text || '(no text in response)';
    console.log('=== SUCCESS ===');
    console.log(`Gemini says: "${text.trim()}"`);
    console.log('');
    console.log('Auth flow is working. Ready to build the full /api/extract endpoint.');
  } else {
    console.log('=== FAILED ===');
    console.log(`Status: ${response.statusCode}`);
    console.log(`Body: ${response.body}`);

    if (response.statusCode === 401 || response.statusCode === 403) {
      console.log('');
      console.log('⚠ This is likely a permissions issue. Ensure the service account has');
      console.log('  the "Vertex AI User" IAM role on the project.');
    } else if (response.statusCode === 429) {
      console.log('');
      console.log('⚠ Rate limit exceeded. Wait and try again.');
    }
  }
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
