from fastapi import FastAPI
from pydantic import BaseModel
from src.service.analytic_service import AnalyticData
from starlette.exceptions import HTTPException
from fastapi.exceptions import RequestValidationError
from src.middleware.exception_handler import request_validation_exception_handler, http_exception_handler, unhandled_exception_handler
from src.middleware.middleware import log_request_middleware
from src.middleware.logger import logger
from datetime import datetime

current_dateTime = datetime.now()

app = FastAPI()

app.middleware("http")(log_request_middleware)
app.add_exception_handler(RequestValidationError, request_validation_exception_handler)
app.add_exception_handler(HTTPException, http_exception_handler)
app.add_exception_handler(Exception, unhandled_exception_handler)


class DateReq(BaseModel):
    date: str

@app.get("/health")
async def root():
    return {"message": "Healthy analytic!"}


@app.post("/analytics")
async def getAnalytics(req: DateReq):
    logger.info(f"Start calling analytic service at {current_dateTime}")
    return AnalyticData(req.date)