from fastapi import FastAPI
from pydantic import BaseModel

class PlaceReq(BaseModel):
    placeName: str
    period: int

app = FastAPI()

@app.get("/health")
async def root():
    return {"message": "Healthy analytic!"}


# @app.get("/analytics")
# async def getAnalytics():
#     return service.getAnalyticData()
