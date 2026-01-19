<<<<<<< Updated upstream
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
=======
# Face Screening Service

A production-ready, scalable Face Recognition API built with FastAPI and DeepFace.

## Features

- 🔍 **Face Verification**: Compare selfie with ID photo
- 👤 **Face Detection**: Detect and count faces
- 👁️ **Liveness Check**: Anti-spoofing verification
- 🔢 **Face Embeddings**: Generate vector representations
- 📊 **Facial Analysis**: Age, gender, and emotion analysis
- 🚀 **High Performance**: Redis caching, async processing, model pre-loading
- 🔒 **Secure**: API Key authentication, rate limiting, input validation
- 🐳 **Dockerized**: Easy deployment with Docker Compose

## Quick Start

### Prerequisites

- Docker and Docker Compose
- OR Python 3.10+ and Redis

### Using Docker (Recommended)

1. Clone the repository
2. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
3. Start the services:
   ```bash
   docker-compose up -d
   ```
4. The API will be available at `http://localhost:8001`

### Local Development

1. Create a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start Redis (required for caching):
   ```bash
   docker run -d -p 6379:6379 redis:alpine
   ```
4. Start the application:
   ```bash
   uvicorn app.main:app --reload --port 8001
   ```

## API Documentation

Interactive API documentation is available at:
- Swagger UI: `http://localhost:8001/docs`
- ReDoc: `http://localhost:8001/redoc`

### Authentication

All API endpoints (except health checks) require authentication headers:

```http
X-API-Key: your_api_key
X-API-Secret: your_api_secret
```

Default credentials for testing:
- Key: `test_api_key_12345`
- Secret: `test_secret_67890`

### Example Usage

**Verify Faces:**

```bash
curl -X POST "http://localhost:8001/api/face/verify" \
  -H "X-API-Key: test_api_key_12345" \
  -H "X-API-Secret: test_secret_67890" \
  -F "selfie=@selfie.jpg" \
  -F "id_photo=@id_card.jpg"
```

**Detect Faces:**

```bash
curl -X POST "http://localhost:8001/api/face/detect" \
  -H "X-API-Key: test_api_key_12345" \
  -H "X-API-Secret: test_secret_67890" \
  -F "image=@group_photo.jpg"
```

## Configuration

Configuration is managed via environment variables in `.env`:

| Variable | Description | Default |
|----------|-------------|---------|
| `API_KEY` | API Key for auth | `test_api_key_12345` |
| `API_SECRET` | API Secret for auth | `test_secret_67890` |
| `REDIS_ENABLED` | Enable caching | `true` |
| `DEFAULT_MODEL` | Face recognition model | `ArcFace` |
| `DEFAULT_DETECTOR` | Face detection backend | `retinaface` |
| `RATE_LIMIT_PER_MINUTE` | Max requests per minute | `100` |

## Architecture

The project follows a modular service-oriented architecture:

```
app/
├── api/            # API Layer (Routes & Models)
├── core/           # Core Infrastructure (Config, Logging, Security)
├── services/       # Business Logic (Face Service, Model Manager)
└── utils/          # Utilities (Cache, Validators)
```

## Performance Tuning

- **Models**: Pre-loaded at startup to reduce first-request latency.
- **Caching**: Redis caches embeddings (1h) and verification results (5m).
- **Workers**: Gunicorn configured with multiple workers for concurrency.
- **Async**: Non-blocking I/O for request handling.

## License

MIT
>>>>>>> Stashed changes
