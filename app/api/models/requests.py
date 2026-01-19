"""API request models."""
from typing import Optional

from pydantic import BaseModel, Field

from app.config import get_settings

settings = get_settings()


class VerifyRequest(BaseModel):
    """Request model for face verification."""
    
    model_name: str = Field(
        default=settings.default_model,
        description="Face recognition model to use",
    )
    detector_backend: str = Field(
        default=settings.default_detector,
        description="Face detection backend to use",
    )
    enforce_detection: bool = Field(
        default=True,
        description="Whether to fail if no face is detected",
    )


class DetectRequest(BaseModel):
    """Request model for face detection."""
    
    detector_backend: str = Field(
        default=settings.default_detector,
        description="Face detection backend to use",
    )


class EmbeddingRequest(BaseModel):
    """Request model for embedding generation."""
    
    model_name: str = Field(
        default=settings.default_model,
        description="Face recognition model to use",
    )


class AnalysisRequest(BaseModel):
    """Request model for facial analysis."""
    
    actions: Optional[list[str]] = Field(
        default=["age", "gender", "emotion"],
        description="Attributes to analyze",
    )
