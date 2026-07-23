# 10xDS Reverse BIM — Drawing Extraction OCR Backend

## Prerequisites

- **Node.js** v18+ 
- A **Google Cloud service account** JSON key with the **Vertex AI User** IAM role on the project
- The `gemini-2.5-flash` model accessible in your GCP project

## Setup

### 1. Install Dependencies

```bash
cd CTS
npm install
```

### 2. Configure Environment

Create a `.env` file in the `CTS/` directory (or edit the existing one):

```
GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
GCP_PROJECT_ID=tenxds-agents-idp
GCP_LOCATION=us-central1
PORT=3001
```

### 3. Place your Service Account Key

Copy your GCP service account JSON key file to `CTS/service-account.json`.

> **Important**: The service account must have the **Vertex AI User** (`roles/aiplatform.user`) IAM role granted on the GCP project. Without this role, API calls will return 403 Forbidden.

### 4. Test Authentication

```bash
npm run test-auth
```

You should see:
```
=== SUCCESS ===
Gemini says: "Hello there!"
Auth flow is working. Ready to build the full /api/extract endpoint.
```

### 5. Start the Backend Server

```bash
npm start
```

The server will start on `http://localhost:3001` with endpoint `POST /api/extract`.

### 6. Start the Frontend

Serve `index.html` on port 8080 (e.g. via `npx serve -p 8080` or any static file server):

```bash
npx -y serve -l 8080 .
```

### 7. Use the Application

1. Open `http://localhost:8080/index.html` in your browser
2. Navigate to **Drawing Extraction**
3. Upload a PDF, JPG, or PNG engineering drawing using the dropzone
4. Watch Gemini 2.5 Flash extract structured objects in real-time
5. Review, accept, or flag extracted objects in the table

## API Endpoint

### `POST /api/extract`

**Request**: Multipart form data with a `file` field (PDF, JPG, or PNG, max 20MB)

**Response** (200 OK):
```json
{
  "success": true,
  "objects": [
    {
      "object_id": "N1",
      "object_type": "Nozzle",
      "key_attributes": "600 NB, 150#, RF, Inlet",
      "references": "Nozzle Schedule",
      "confidence": 0.95
    }
  ],
  "meta": {
    "objectCount": 42,
    "elapsedSeconds": 35.2,
    "model": "gemini-2.5-flash",
    "filename": "drawing.jpg"
  }
}
```

### `GET /api/health`

Returns server status and configuration.

## Security Notes

- `service-account.json` and `.env` are in `.gitignore` — never commit these
- The service account key is only read server-side via the `GOOGLE_APPLICATION_CREDENTIALS` environment variable
- Access tokens are cached and auto-refreshed by `google-auth-library`
