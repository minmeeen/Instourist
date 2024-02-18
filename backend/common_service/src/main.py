from fastapi import FastAPI
from pydantic import BaseModel
# import portal
import src.service.BEservice as service
# from .service import analytic_service
class PlaceReq(BaseModel):
    placeName: str
    period: int

app = FastAPI()

@app.get("/health")
async def root():
    return {"message": "Healthy!"}

@app.get("/languageDetected/locationId={locationId}&time={timestamp}&duration={duration}")
async def getLanguageDetected(locationId: str, timestamp: int, duration: str):
    data = service.getLanguageDetected(locationId, timestamp, duration)
    return data

# @app.post("/getAnalyticData")
# async def getAnalyticData(req: PlaceReq):
#     return portal.getAnalyticDataFunc(req.placeName, req.period)

# # @app.get("/analytics")
# # async def getAnalytics():
# #     return service.getAnalyticData()


# @app.get("/testAnalytics")
# async def getTestAnalytics():
#     return analytic_service.AnalyticData()