"""Caching utilities with optional Redis backend."""
import json
import threading
import time
from typing import Any, Dict, Optional, Tuple

try:
    import redis.asyncio as aioredis
except Exception:  # pragma: no cover - optional dependency
    aioredis = None

from app.config import get_settings
from app.core.logging import get_logger

settings = get_settings()
logger = get_logger(__name__)


class CacheManager:
    """Manage cache connections and operations."""

    def __init__(self):
        """Initialize cache manager."""
        self.redis: Optional["aioredis.Redis"] = None
        self.enabled = bool(settings.redis_enabled and aioredis is not None)
        self._memory_cache: Dict[str, Tuple[Optional[float], Any]] = {}
        self._memory_lock = threading.Lock()
        self._backend = "redis" if self.enabled else "memory"

    async def connect(self) -> None:
        """Connect to Redis with connection pooling."""
        if not self.enabled:
            if settings.redis_enabled and aioredis is None:
                logger.warning(
                    "Redis enabled but redis client not installed. "
                    "Falling back to in-memory cache."
                )
            logger.info("Using in-memory cache backend")
            self._backend = "memory"
            return

        try:
            # Create connection pool with explicit settings
            pool = aioredis.ConnectionPool.from_url(
                settings.redis_url,
                max_connections=settings.redis_max_connections,
                socket_timeout=settings.redis_socket_timeout,
                socket_connect_timeout=settings.redis_socket_connect_timeout,
                decode_responses=True,
                encoding="utf-8",
            )
            
            self.redis = aioredis.Redis(connection_pool=pool)
            await self.redis.ping()
            logger.info(
                f"Connected to Redis successfully with pool size {settings.redis_max_connections}"
            )
            self._backend = "redis"
        except Exception as e:
            logger.warning(f"Failed to connect to Redis: {e}. Falling back to in-memory cache.")
            self.enabled = False
            self.redis = None
            self._backend = "memory"

    async def disconnect(self) -> None:
        """Disconnect from Redis."""
        if self.redis:
            await self.redis.close()
            logger.info("Disconnected from Redis")

    def _memory_get(self, key: str) -> Optional[Any]:
        with self._memory_lock:
            entry = self._memory_cache.get(key)
            if not entry:
                return None
            expires_at, value = entry
            if expires_at is not None and time.time() > expires_at:
                self._memory_cache.pop(key, None)
                return None
            return value

    def _memory_set(self, key: str, value: Any, ttl: Optional[int]) -> bool:
        expires_at = (time.time() + ttl) if ttl else None
        with self._memory_lock:
            self._memory_cache[key] = (expires_at, value)
        return True

    def _memory_delete(self, key: str) -> bool:
        with self._memory_lock:
            return self._memory_cache.pop(key, None) is not None

    async def get(self, key: str) -> Optional[Any]:
        """
        Get value from cache.
        
        Args:
            key: Cache key
            
        Returns:
            Cached value or None
        """
        if not self.enabled or not self.redis:
            return self._memory_get(key)

        try:
            value = await self.redis.get(key)
            if value:
                return json.loads(value)
            return None
        except Exception as e:
            logger.error(f"Cache get error: {e}")
            return None

    async def set(
        self, key: str, value: Any, ttl: Optional[int] = None
    ) -> bool:
        """
        Set value in cache.
        
        Args:
            key: Cache key
            value: Value to cache
            ttl: Time to live in seconds (defaults to config)
            
        Returns:
            True if successful, False otherwise
        """
        if not self.enabled or not self.redis:
            ttl = ttl or settings.cache_ttl_seconds
            return self._memory_set(key, value, ttl)

        try:
            ttl = ttl or settings.cache_ttl_seconds
            await self.redis.setex(
                key, ttl, json.dumps(value, default=str)
            )
            return True
        except Exception as e:
            logger.error(f"Cache set error: {e}")
            return False

    async def delete(self, key: str) -> bool:
        """
        Delete value from cache.
        
        Args:
            key: Cache key
            
        Returns:
            True if successful, False otherwise
        """
        if not self.enabled or not self.redis:
            return self._memory_delete(key)

        try:
            await self.redis.delete(key)
            return True
        except Exception as e:
            logger.error(f"Cache delete error: {e}")
            return False

    @staticmethod
    def generate_key(*args: Any, prefix: str = "") -> str:
        """
        Generate cache key from arguments.
        
        Args:
            *args: Arguments to hash
            prefix: Key prefix
            
        Returns:
            Cache key
        """
        # Optimize for bytes (images) - use hash instead of MD5
        parts = []
        for arg in args:
            if isinstance(arg, bytes):
                # Use Python's built-in hash for speed (not cryptographic but fine for cache keys)
                parts.append(str(hash(arg)))
            else:
                parts.append(str(arg))
        
        content = ":".join(parts)
        # Use faster hash for non-cryptographic purposes
        hash_value = str(hash(content))
        
        if prefix:
            return f"{prefix}:{hash_value}"
        return hash_value


# Global cache manager instance
cache_manager = CacheManager()
