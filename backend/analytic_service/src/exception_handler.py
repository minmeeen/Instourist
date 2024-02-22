import sys

from typing import Union

from fastapi import Request
from fastapi.exceptions import RequestValidationError, HTTPException
from fastapi.exception_handlers import http_exception_handler as _http_exception_handler
from fastapi.exception_handlers import (
    request_validation_exception_handler as _request_validation_exception_handler,
)
from fastapi.responses import JSONResponse
from fastapi.responses import PlainTextResponse
from fastapi.responses import Response

from src.logger import logger

async def request_validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    logger.debug("Custom request_validation_exception_handler was called")
    body = await request.body()
    query_params = request.query_params._dict  # pylint: disable=protected-access
    detail = {"errors": exc.errors(), "body": body.decode(), "query_params": query_params}
    logger.info(detail)
    return await _request_validation_exception_handler(request, exc)


async def http_exception_handler(request: Request, exc: HTTPException) -> Union[JSONResponse, Response]:
    logger.debug("Custom http_exception_handler was called")
    error_message = {"detail": exc.detail}
    return JSONResponse(status_code=exc.status_code, content=error_message)


async def unhandled_exception_handler(request: Request, exc: Exception) -> PlainTextResponse:
    logger.debug("Custom unhandled_exception_handler was called")
    host = getattr(getattr(request, "client", None), "host", None)
    port = getattr(getattr(request, "client", None), "port", None)
    url = f"{request.url.path}?{request.query_params}" if request.query_params else request.url.path
    exception_type, exception_value, exception_traceback = sys.exc_info()
    exception_name = getattr(exception_type, "__name__", None)
    logger.error(
        f'{host}:{port} - "{request.method} {url}" 500 Internal Server Error <{exception_name}: {exception_value}>'
    )
    error_message = {"detail": str("Something went wrong. Please try again.")}
    return JSONResponse(status_code=500, content=error_message)
