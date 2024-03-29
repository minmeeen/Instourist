from .db_connect import Database
from datetime import datetime, timedelta
from src.model import LanguageDetectedResponse, LangugesResponse
from operator import attrgetter

from src.middleware.logger import logger
from src.config import DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME

connection_params = {
    "host": DB_HOST,
    "database": DB_NAME,
    "user": DB_USER,
    "password": DB_PASSWORD,
    "port": DB_PORT
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

def getLanguageDetected(locationId, timestamp, duration):
    logger.info(f'get language detected with parameter {locationId}, {timestamp}, {duration}')
    days = duration.split('D')
    currentTime = datetime.utcfromtimestamp(timestamp).date() #'yyyy-mm'dd'
    newTime = currentTime - timedelta(days=int(days[0]))

    logger.info('call find post detected by date')
    languageDetected = db.findPostDetectedByDate(locationId, newTime, currentTime) #list of languages
    if languageDetected is None :
        return None
    else :
        languages = {}
        for language in languageDetected :
            if language[0] in languages :
                languages[language[0]] += 1
            else :
                languages[language[0]] = 1
        
        listOfLanguages = []
        for language in languages:
            listOfLanguages.append(LangugesResponse(languageName=language, total=languages[language]))
        
        sortedListOfLanguages = sorted(listOfLanguages, key=attrgetter('total'), reverse=True)
        response = LanguageDetectedResponse(NumberOfPosts=len(languageDetected), Languges=sortedListOfLanguages)
        return response
    
def getLocationIdFromIG():
    return db.getIGLocation()

def insertPostToInitialData(user_id, username, full_name, caption, post_created_at, post_taken_at, location_id, created_at, created_by):
    db.insertPostToInitialData(user_id, username, full_name, caption, post_created_at, post_taken_at, location_id, created_at, created_by)