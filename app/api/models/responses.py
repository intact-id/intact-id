"""API response models."""
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class BaseResponse(BaseModel):
    """Base response model."""
    pass


class VerifyResponse(BaseResponse):
    """Response model for face verification."""
    
    match: bool = Field(..., description="Whether faces match")
    confidence: float = Field(..., description="Match confidence (0-100)")
    distance: float = Field(..., description="Raw distance metric")
    threshold: float = Field(..., description="Model threshold")
    model: str = Field(..., description="Model used")
    detector: str = Field(..., description="Detector used")
    similarity_metric: str = Field(..., description="Similarity metric used")
    facial_areas: Dict[str, Any] = Field(..., description="Facial areas")
    duration_ms: float = Field(..., description="Processing time in ms")


class FaceRegion(BaseModel):
    """Face region coordinates."""
    x: int
    y: int
    w: int
    h: int


class DetectedFace(BaseModel):
    """Detected face details."""
    confidence: float
    region: Dict[str, int]


class DetectResponse(BaseResponse):
    """Response model for face detection."""
    
    face_count: int
    has_single_face: bool
    faces: List[DetectedFace]
    detector: str


class LivenessChecks(BaseModel):
    """Liveness check details."""
    face_detected: bool
    single_face: bool
    image_quality: str
    lighting: str
    blur_score: float
    brightness: float


class LivenessResponse(BaseResponse):
    """Response model for liveness check."""
    
    liveness_score: float
    passed: bool
    checks: LivenessChecks
    issues: List[str]
    recommendation: str


class EmbeddingResponse(BaseResponse):
    """Response model for embedding generation."""
    
    embedding: List[float]
    dimension: int
    model: str


class AnalysisResponse(BaseResponse):
    """Response model for facial analysis."""
    
    age: Optional[int]
    gender: Optional[str]
    gender_confidence: Optional[Dict[str, float]]
    emotion: Optional[str]
    emotion_confidence: Optional[Dict[str, float]]


class ErrorResponse(BaseResponse):
    """Standard error response."""
    
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


class HealthResponse(BaseResponse):
    """Health check response."""
    
    status: str
    service: str
    version: str
    models_available: Optional[List[str]] = None
    detectors_available: Optional[List[str]] = None
