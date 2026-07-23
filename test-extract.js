/**
 * test-extract.js — Quick test for the /api/extract endpoint
 */
const fs = require('fs');
const http = require('http');

const filePath = 'drawing.jpg';
const fileBuffer = fs.readFileSync(filePath);
const boundary = '----FormBoundary' + Date.now();

const header = Buffer.from(
  `--${boundary}\r\n` +
  `Content-Disposition: form-data; name="file"; filename="drawing.jpg"\r\n` +
  `Content-Type: image/jpeg\r\n\r\n`
);
const footer = Buffer.from(`\r\n--${boundary}--\r\n`);
const body = Buffer.concat([header, fileBuffer, footer]);

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/extract',
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
    'Content-Length': body.length,
  },
};

console.log('Sending drawing.jpg to /api/extract...');
const startTime = Date.now();

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`Status: ${res.statusCode} (${elapsed}s)`);
    try {
      const parsed = JSON.parse(data);
      console.log(JSON.stringify(parsed, null, 2));
    } catch {
      console.log(data);
    }
  });
});

req.on('error', (err) => { console.error('Request error:', err.message); });
req.write(body);
req.end();
