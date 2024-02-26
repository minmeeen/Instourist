from fastapi import FastAPI
from pydantic import BaseModel
import src.config as config
import src.service.BEservice as service
from src.service.schedule import scheduler
from starlette.exceptions import HTTPException
from fastapi.exceptions import RequestValidationError
from src.middleware.exception_handler import request_validation_exception_handler, http_exception_handler, unhandled_exception_handler
from src.middleware.middleware import log_request_middleware
from src.middleware.logger import logger
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from src.config import ANALYTIC_SERVICE, FRONTEND_SERVICE, INSTOURIST_URL

class PlaceReq(BaseModel):
    placeName: str
    period: int

app = FastAPI()

app.middleware("http")(log_request_middleware)
app.add_exception_handler(RequestValidationError, request_validation_exception_handler)
app.add_exception_handler(HTTPException, http_exception_handler)
app.add_exception_handler(Exception, unhandled_exception_handler)

if __name__ == "__main__":
    uvicorn.run(app, host=config.HOSTNAME, port=int(config.APP_PORT))

scheduler.start()

origins = [
    INSTOURIST_URL,
    FRONTEND_SERVICE,
    ANALYTIC_SERVICE,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def root():
    return {"message": "Healthy!"}

@app.get("/languageDetected/locationId={locationId}&time={timestamp}&duration={duration}")
async def getLanguageDetected(locationId: str, timestamp: int, duration: str):
    data = service.getLanguageDetected(locationId, timestamp, duration)
    return data