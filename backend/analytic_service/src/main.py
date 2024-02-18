from fastapi import FastAPI
from pydantic import BaseModel
from src.analytic_service import AnalyticData

app = FastAPI()

class DateReq(BaseModel):
    date: str

@app.get("/health")
async def root():
    return {"message": "Healthy analytic!"}


@app.get("/analytics")
async def getAnalytics(req: DateReq):
    return AnalyticData(req.date)