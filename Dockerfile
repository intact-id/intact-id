# Builder stage
FROM python:3.10-slim AS builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libgl1 \
    libglib2.0-0 \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Create virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install dependencies separately to cache them
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Pre-download models to bake them into the image
# This prevents downloading on first run and avoids worker timeouts
RUN python -c "\
from deepface import DeepFace; \
import numpy as np; \
dummy = np.zeros((224, 224, 3), dtype=np.uint8); \
DeepFace.build_model('ArcFace'); \
DeepFace.extract_faces(img_path=dummy, detector_backend='retinaface', enforce_detection=False) \
" || true

# Runtime stage
FROM python:3.10-slim

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    libgomp1 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy virtual environment from builder
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copy pre-downloaded model weights from builder
COPY --from=builder /root/.deepface /root/.deepface

# Copy application code
COPY . .

# Environment variables for performance
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
# PYTHONOPTIMIZE=2 causes TensorFlow to crash as it relies on docstrings
ENV OMP_NUM_THREADS=4
ENV TF_NUM_INTRAOP_THREADS=4
ENV TF_NUM_INTEROP_THREADS=1

# Expose port
EXPOSE 8000

# Start command
CMD ["./scripts/start.sh"]
