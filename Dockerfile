# Builder stage
FROM python:3.10-slim AS builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Create virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install dependencies separately to cache them
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Pre-download models to bake them into the image (optional but recommended for speed)
# This prevents downloading on first run
# RUN python -c "from deepface import DeepFace; DeepFace.build_model('ArcFace')"

# Runtime stage
FROM python:3.10-slim

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy virtual environment from builder
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

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
EXPOSE 8001

# Start command
CMD ["./scripts/start.sh"]