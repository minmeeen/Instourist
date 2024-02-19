from .db_connect import Database
from datetime import datetime, timedelta
from src.model import LanguageDetectedResponse, LangugesResponse

connection_params = {
    "host": "172-104-62-253.ip.linodeusercontent.com",
    "database": "instourist_db",
    "user": "instourist",
    "password": "e5q6&!E*D0G8v5mAy1",
    "port": "5432"
}

db = Database(connection_params)

def isExistPost(user_id, taken_at):
    return db.findExistPost(user_id, taken_at)

def addPost(user_id, username, full_name, caption,  post_created_at, post_taken_at, location_id, created_at, created_by):
    db.insertPostToInitialData(user_id, username, full_name, caption,  post_created_at, post_taken_at, location_id, created_at, created_by)

def findLocationId(igLocation):
    return db.findLocationId(igLocation)

def closeDB():
    db.close()

# def getAnalyticData():
#     try:
#         analytic_service.AnalyticData()
#     except Exception as e :
#         print(f"error : {e}")

#create response model
def getLanguageDetected(locationId, timestamp, duration):
    days = duration.split('D')
    currentTime = datetime.utcfromtimestamp(timestamp).date() #'yyyy-mm'dd'
    newTime = currentTime - timedelta(days=int(days[0]))
    languageDetected = db.findPostDetectedByDate(locationId, newTime, currentTime) #list of languages
    if languageDetected is None :
        return {"Message" : "No data"}
    else :
        languages = {}
        for language in languageDetected :
            if language[0] in languages :
                languages[language[0]] += 1
            else :
                languages[language[0]] = 1

        listOfLanguages = []
        for language in languages:
            print(language)
            print(languages[language])
            listOfLanguages.append(LangugesResponse(languageName=language, total=languages[language]))

            
        response = LanguageDetectedResponse(NumberOfPosts=len(languageDetected), Languges=listOfLanguages)
        return response