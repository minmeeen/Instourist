from fastapi import FastAPI
from pydantic import BaseModel
from .portal import *

class PlaceReq(BaseModel):
    placeName: str
    period: int | None = None

app = FastAPI()

@app.get("/health")
async def root():
    return {"message": "Healthy!"}

@app.post("/getAnalyticData")
async def getAnalyticData(req: PlaceReq):
    return getAnalyticDataFunc(req.placeName, req.period)