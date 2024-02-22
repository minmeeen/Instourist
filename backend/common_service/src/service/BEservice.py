from .db_connect import Database
from datetime import datetime, timedelta
from src.model import LanguageDetectedResponse, LangugesResponse

import logging

connection_params = {

}

db = Database(connection_params)
logger = logging.getLogger('mylogger')
logger.setLevel(logging.INFO)
logging.basicConfig(level=logging.INFO)

def isExistPost(user_id, taken_at):
    return db.findExistPost(user_id, taken_at)

def addPost(user_id, username, full_name, caption,  post_created_at, post_taken_at, location_id, created_at, created_by):
    db.insertPostToInitialData(user_id, username, full_name, caption,  post_created_at, post_taken_at, location_id, created_at, created_by)

def findLocationId(igLocation):
    return db.findLocationId(igLocation)

def closeDB():
    db.close()

def getLanguageDetected(locationId, timestamp, duration):
    logging.info(f'get language detected with parameter {locationId}, {timestamp}, {duration}')
    days = duration.split('D')
    currentTime = datetime.utcfromtimestamp(timestamp).date() #'yyyy-mm'dd'
    newTime = currentTime - timedelta(days=int(days[0]))

    logging.info('call find post detected by date')
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
            listOfLanguages.append(LangugesResponse(languageName=language, total=languages[language]))

            
        response = LanguageDetectedResponse(NumberOfPosts=len(languageDetected), Languges=listOfLanguages)
        return response
    
def getLocationIdFromIG():
    return db.getIGLocation()

def insertPostToInitialData(user_id, username, full_name, caption, post_created_at, post_taken_at, location_id, created_at, created_by):
    db.insertPostToInitialData(user_id, username, full_name, caption, post_created_at, post_taken_at, location_id, created_at, created_by)