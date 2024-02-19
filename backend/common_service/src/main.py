from fastapi import FastAPI
from pydantic import BaseModel
# import portal
import src.service.BEservice as service
from src.service.schedule import scheduler
class PlaceReq(BaseModel):
    placeName: str
    period: int

app = FastAPI()
scheduler.start()

@app.get("/health")
async def root():
    return {"message": "Healthy!"}

@app.get("/languageDetected/locationId={locationId}&time={timestamp}&duration={duration}")
async def getLanguageDetected(locationId: str, timestamp: int, duration: str):
    data = service.getLanguageDetected(locationId, timestamp, duration)
    return data

# @app.get("/testCallAnalyticService")
# async def testCall():
#     response = requests.get("http://0.0.0.0:8001/health")
#     return response.json()

# @app.post("/sentDateToAnalytic") #sent created_at await getdataset service!!
# async def sentDateToAnalytic():
#     response = requests.post("http://0.0.0.0:8001/analytics", json={"date" : "2024-02-11"})
#     return response.json()