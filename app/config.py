"""Configuration management using Pydantic Settings."""
from functools import lru_cache
from typing import List, Optional

from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # Application
    app_name: str = Field(default="Face Screening Service", alias="APP_NAME")
    app_version: str = Field(default="2.0.0", alias="APP_VERSION")
    debug: bool = Field(default=False, alias="DEBUG")
    host: str = Field(default="0.0.0.0", alias="HOST")
    port: int = Field(default=8001, alias="PORT")

    # API Authentication
    api_key: str = Field(default="test_api_key_12345", alias="API_KEY")
    api_secret: str = Field(default="test_secret_67890", alias="API_SECRET")

    # Security
    rate_limit_per_minute: int = Field(default=100, alias="RATE_LIMIT_PER_MINUTE")
    max_file_size_mb: int = Field(default=10, alias="MAX_FILE_SIZE_MB")
    allowed_origins: str = Field(
        default="http://localhost:3000,http://localhost:8000",
        alias="ALLOWED_ORIGINS",
    )

    # Redis
    redis_enabled: bool = Field(default=True, alias="REDIS_ENABLED")
    redis_host: str = Field(default="localhost", alias="REDIS_HOST")
    redis_port: int = Field(default=6379, alias="REDIS_PORT")
    redis_db: int = Field(default=0, alias="REDIS_DB")
    redis_password: Optional[str] = Field(default=None, alias="REDIS_PASSWORD")
    cache_ttl_seconds: int = Field(default=3600, alias="CACHE_TTL_SECONDS")

    # Model Configuration
    default_model: str = Field(default="ArcFace", alias="DEFAULT_MODEL")
    default_detector: str = Field(default="retinaface", alias="DEFAULT_DETECTOR")
    preload_models: str = Field(default="ArcFace,Facenet512", alias="PRELOAD_MODELS")
    preload_detectors: str = Field(
        default="retinaface,opencv", alias="PRELOAD_DETECTORS"
    )

    # Performance
    worker_processes: int = Field(default=4, alias="WORKER_PROCESSES")
    worker_threads: int = Field(default=2, alias="WORKER_THREADS")
    max_concurrent_requests: int = Field(
        default=100, alias="MAX_CONCURRENT_REQUESTS"
    )
    thread_pool_workers: int = Field(default=8, alias="THREAD_POOL_WORKERS")
    operation_timeout_seconds: int = Field(
        default=30, alias="OPERATION_TIMEOUT_SECONDS"
    )
    
    # Redis Connection Pool
    redis_max_connections: int = Field(default=50, alias="REDIS_MAX_CONNECTIONS")
    redis_socket_timeout: int = Field(default=5, alias="REDIS_SOCKET_TIMEOUT")
    redis_socket_connect_timeout: int = Field(
        default=5, alias="REDIS_SOCKET_CONNECT_TIMEOUT"
    )

    # Logging
    log_level: str = Field(default="INFO", alias="LOG_LEVEL")
    log_format: str = Field(default="json", alias="LOG_FORMAT")

    # Constants
    SUPPORTED_MODELS: List[str] = [
        "ArcFace",
        "Facenet",
        "VGG-Face",
        "Facenet512",
        "OpenFace",
        "DeepFace",
        "DeepID",
        "Dlib",
        "SFace",
        "GhostFaceNet",
    ]
    SUPPORTED_DETECTORS: List[str] = [
        "opencv",
        "retinaface",
        "mtcnn",
        "ssd",
        "dlib",
        "mediapipe",
    ]
    ALLOWED_EXTENSIONS: set = {"jpg", "jpeg", "png"}
    DEFAULT_IMAGE_SIZE: tuple = (640, 640)

    class Config:
        """Pydantic config."""

        env_file = ".env"
        case_sensitive = False

    @property
    def max_file_size_bytes(self) -> int:
        """Get max file size in bytes."""
        return self.max_file_size_mb * 1024 * 1024

    @property
    def allowed_origins_list(self) -> List[str]:
        """Get allowed origins as list."""
        return [origin.strip() for origin in self.allowed_origins.split(",")]

    @property
    def preload_models_list(self) -> List[str]:
        """Get models to preload as list."""
        return [model.strip() for model in self.preload_models.split(",")]

    @property
    def preload_detectors_list(self) -> List[str]:
        """Get detectors to preload as list."""
        return [detector.strip() for detector in self.preload_detectors.split(",")]

    @property
    def redis_url(self) -> str:
        """Get Redis connection URL."""
        if self.redis_password:
            return f"redis://:{self.redis_password}@{self.redis_host}:{self.redis_port}/{self.redis_db}"
        return f"redis://{self.redis_host}:{self.redis_port}/{self.redis_db}"


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
