"""Health check routes."""
from fastapi import APIRouter

from app.api.models.responses import HealthResponse
from app.config import get_settings
from app.services.model_manager import model_manager

router = APIRouter()
settings = get_settings()


@router.get(
    "/",
    response_model=HealthResponse,
    summary="Basic health check",
)
async def root():
    """Basic health check."""
    return {
        "status": "healthy",
        "service": settings.app_name,
        "version": settings.app_version,
    }


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Detailed health check",
)
async def health_check():
    """Detailed health check."""
    return {
        "status": "healthy",
        "service": settings.app_name,
        "version": settings.app_version,
        "models_available": settings.SUPPORTED_MODELS,
        "detectors_available": settings.SUPPORTED_DETECTORS,
    }


@router.get("/health/ready")
async def readiness_check():
    """Readiness probe."""
    # Check if models are loaded
    if not model_manager._initialized:
        return {"status": "not_ready"}
    return {"status": "ready"}


@router.get("/health/live")
async def liveness_check():
    """Liveness probe."""
    return {"status": "alive"}
