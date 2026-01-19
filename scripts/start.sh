#!/bin/bash
set -e

# Default settings based on performance testing
# 2-4 workers is usually optimal for CPU-bound tasks in containers
APP_WORKERS=${WORKER_PROCESSES:-4}
APP_THREADS=${WORKER_THREADS:-2}
TIMEOUT=${OPERATION_TIMEOUT_SECONDS:-60}

# Start Gunicorn with Uvicorn workers
# - Preload app for faster worker startup and memory sharing
# - Increase timeout for model loading
# - Use larger max-requests to recycle workers periodically
exec gunicorn app.main:app \
    --workers $APP_WORKERS \
    --worker-class uvicorn.workers.UvicornWorker \
    --threads $APP_THREADS \
    --bind ${HOST:-0.0.0.0}:${PORT:-8001} \
    --timeout 120 \
    --graceful-timeout 30 \
    --keep-alive 5 \
    --max-requests 1000 \
    --max-requests-jitter 50 \
    --preload \
    --log-level ${LOG_LEVEL:-info}
