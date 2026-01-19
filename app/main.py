"""Main application entry point."""
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.routes import (
    analysis,
    detection,
    embedding,
    health,
    liveness,
    verification,
)
from app.config import get_settings
from app.core.exceptions import FaceScreeningException
from app.core.logging import get_logger, setup_logging
from app.core.security import get_cors_config
from app.services.model_manager import model_manager
from app.utils.cache import cache_manager
from app.utils.performance import performance_manager


# Setup logging
setup_logging()
logger = get_logger(__name__)
settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifecycle events.
    Handles startup and shutdown tasks.
    """
    logger.info("Starting up Face Screening Service...")
    
    # Initialize thread pool for CPU-bound operations
    performance_manager.initialize(max_workers=settings.thread_pool_workers)
    
    # Connect to Redis
    await cache_manager.connect()
    
    # Pre-load models (in background or blocking depending on needs)
    # For now blocking to ensure readiness
    try:
        model_manager.preload_models()
    except Exception as e:
        logger.error(f"Failed to preload models: {e}")
    
    logger.info("Face Screening Service ready to accept requests")
    
    yield
    
    # Shutdown
    logger.info("Shutting down Face Screening Service...")
    await cache_manager.disconnect()
    performance_manager.shutdown(wait=True)


def create_app() -> FastAPI:
    """Create and configure FastAPI application."""
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        description="Face detection, matching, and liveness verification for KYC",
        lifespan=lifespan,
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # CORS Middleware
    app.add_middleware(
        CORSMiddleware,
        **get_cors_config(),
    )
    
    # Performance Middleware
    from app.core.middleware import PerformanceMiddleware
    app.add_middleware(PerformanceMiddleware)

    # Exception Handler
    @app.exception_handler(FaceScreeningException)
    async def face_screening_exception_handler(request: Request, exc: FaceScreeningException):
        logger.error(f"Request failed: {exc.message} - {exc.details}")
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "error": exc.__class__.__name__,
                "message": exc.message,
                "details": exc.details,
            },
        )

    # Register Routes
    app.include_router(health.router, tags=["Health"])
    app.include_router(verification.router, prefix="/api/face", tags=["Verification"])
    app.include_router(detection.router, prefix="/api/face", tags=["Detection"])
    app.include_router(liveness.router, prefix="/api/face", tags=["Liveness"])
    app.include_router(embedding.router, prefix="/api/face", tags=["Embedding"])
    app.include_router(analysis.router, prefix="/api/face", tags=["Analysis"])

    return app


app = create_app()
