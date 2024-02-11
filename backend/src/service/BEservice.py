from .db_connect import Database
from datetime import datetime, timedelta
# from . import analytic_service as analytic_service

connection_params = {
    "host": "localhost",
    "database": "postgres",
    "user": "postgres",
    "password": "postgres",
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

def getLanguageDetected(locationId, timestamp, duration):
    days = duration.split('D')
    currentTime = datetime.utcfromtimestamp(timestamp).date() #'yyyy-mm'dd'
    newTime = currentTime - timedelta(days=int(days[0]))
    languageDetected = db.findPostDetectedByDate(locationId, newTime, currentTime) #list of languages
    print(languageDetected)

    languages = {}
    response = {"Number of posts" : len(languageDetected), "Languages" : languages}
    for language in languageDetected :
        if language[0] in languages :
            languages[language[0]] += 1
        else :
            languages[language[0]] = 1

    print(languages)
    print(response)
    return response