"""Performance utilities for async execution and monitoring."""
import asyncio
import functools
import time
from concurrent.futures import ThreadPoolExecutor
from typing import Any, Callable, Optional

from app.core.logging import get_logger

logger = get_logger(__name__)


class PerformanceManager:
    """Manages thread pool and performance metrics."""

    _instance = None
    _executor: Optional[ThreadPoolExecutor] = None

    def __new__(cls):
        """Singleton pattern."""
        if cls._instance is None:
            cls._instance = super(PerformanceManager, cls).__new__(cls)
        return cls._instance

    def initialize(self, max_workers: int = None):
        """
        Initialize thread pool executor.
        
        Args:
            max_workers: Maximum number of worker threads
        """
        if self._executor is None:
            self._executor = ThreadPoolExecutor(
                max_workers=max_workers,
                thread_name_prefix="deepface_worker"
            )
            logger.info(f"Initialized ThreadPoolExecutor with {max_workers or 'default'} workers")

    def shutdown(self, wait: bool = True):
        """
        Shutdown thread pool executor.
        
        Args:
            wait: Wait for pending tasks to complete
        """
        if self._executor:
            self._executor.shutdown(wait=wait)
            logger.info("ThreadPoolExecutor shutdown complete")
            self._executor = None

    async def run_in_executor(
        self,
        func: Callable,
        *args,
        timeout: Optional[float] = None,
        **kwargs
    ) -> Any:
        """
        Run a blocking function in the thread pool.
        
        Args:
            func: Function to execute
            *args: Positional arguments
            timeout: Optional timeout in seconds
            **kwargs: Keyword arguments
            
        Returns:
            Function result
            
        Raises:
            asyncio.TimeoutError: If timeout is exceeded
        """
        if self._executor is None:
            raise RuntimeError("PerformanceManager not initialized")

        loop = asyncio.get_event_loop()
        partial_func = functools.partial(func, *args, **kwargs)
        
        try:
            if timeout:
                return await asyncio.wait_for(
                    loop.run_in_executor(self._executor, partial_func),
                    timeout=timeout
                )
            else:
                return await loop.run_in_executor(self._executor, partial_func)
        except asyncio.TimeoutError:
            logger.error(f"Operation timed out after {timeout}s: {func.__name__}")
            raise


# Global performance manager instance
performance_manager = PerformanceManager()


def async_timed(func: Callable) -> Callable:
    """
    Decorator to time async function execution.
    
    Args:
        func: Async function to time
        
    Returns:
        Wrapped function
    """
    @functools.wraps(func)
    async def wrapper(*args, **kwargs):
        start_time = time.time()
        try:
            result = await func(*args, **kwargs)
            duration = (time.time() - start_time) * 1000
            logger.debug(f"{func.__name__} completed in {duration:.2f}ms")
            return result
        except Exception as e:
            duration = (time.time() - start_time) * 1000
            logger.error(f"{func.__name__} failed after {duration:.2f}ms: {e}")
            raise
    return wrapper


class PerformanceMetrics:
    """Track performance metrics."""
    
    def __init__(self):
        """Initialize metrics."""
        self.request_count = 0
        self.total_duration = 0.0
        self.cache_hits = 0
        self.cache_misses = 0
        self.errors = 0
    
    def record_request(self, duration_ms: float, cached: bool = False, error: bool = False):
        """
        Record a request.
        
        Args:
            duration_ms: Request duration in milliseconds
            cached: Whether result was from cache
            error: Whether request resulted in error
        """
        self.request_count += 1
        self.total_duration += duration_ms
        
        if cached:
            self.cache_hits += 1
        else:
            self.cache_misses += 1
            
        if error:
            self.errors += 1
    
    @property
    def average_duration(self) -> float:
        """Get average request duration."""
        if self.request_count == 0:
            return 0.0
        return self.total_duration / self.request_count
    
    @property
    def cache_hit_rate(self) -> float:
        """Get cache hit rate percentage."""
        total = self.cache_hits + self.cache_misses
        if total == 0:
            return 0.0
        return (self.cache_hits / total) * 100
    
    @property
    def error_rate(self) -> float:
        """Get error rate percentage."""
        if self.request_count == 0:
            return 0.0
        return (self.errors / self.request_count) * 100
    
    def get_stats(self) -> dict:
        """Get all statistics."""
        return {
            "total_requests": self.request_count,
            "average_duration_ms": round(self.average_duration, 2),
            "cache_hit_rate": round(self.cache_hit_rate, 2),
            "cache_hits": self.cache_hits,
            "cache_misses": self.cache_misses,
            "error_rate": round(self.error_rate, 2),
            "total_errors": self.errors,
        }
    
    def reset(self):
        """Reset all metrics."""
        self.request_count = 0
        self.total_duration = 0.0
        self.cache_hits = 0
        self.cache_misses = 0
        self.errors = 0


# Global metrics instance
metrics = PerformanceMetrics()
