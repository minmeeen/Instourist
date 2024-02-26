import requests
from datetime import datetime
from apify_client import ApifyClient
from .BEservice import getLocationIdFromIG, isExistPost, insertPostToInitialData, findLocationId
from src.middleware.logger import logger
from src.config import ANALYTIC_SERVICE, APIFY_API_TOKEN, APIFY_ACTOR_ID
import json
import pytz
# Replace with your Apify API token and actor ID
api_token = APIFY_API_TOKEN #new token
actor_id = APIFY_ACTOR_ID

client = ApifyClient(api_token)

def getDatasetFromApify():
    logger.info('call get dataset from apify')
    logger.info('call get location id from ig')
    listOfLocationFromIG = getLocationIdFromIG()
    for locations in listOfLocationFromIG:
        for location in locations[0] :
            # Prepare the Actor input
            run_input = {
                "directUrls": ["https://www.instagram.com/explore/locations/"+location],
                "resultsType": "details",
                "resultsLimit": 200,
                "addParentData": False,
                "searchType": "hashtag",
                "searchLimit": 1,
            }

            logger.info(f'call apify with url {run_input["directUrls"]}')
            run = client.actor(actor_id).call(run_input=run_input)
            # Fetch and print Actor results from the run's dataset (if there are any)
            for data in client.dataset(run["defaultDatasetId"]).iterate_items():
                logger.info('call find location id')
                location_id = findLocationId(data.get("location_id"))
                for post in data.get("latestPosts"):
                    post_taken_at = post["taken_at"]
                    user_id = post["user"]["id"]
                    username = post["user"]["username"]
                    full_name = post["user"]["full_name"]
                    if post["caption"] != None :
                        caption = post["caption"]["text"]
                        post_created_at = post["caption"]["created_at"]
                    else :
                        caption = ""

                    created_at = datetime.now()
                    created_by = "System"

                    if isExistPost(user_id, post_taken_at) is None :
                        insertPostToInitialData(user_id, username, full_name, caption, post_created_at, post_taken_at, location_id, created_at, created_by)
    
    logger.info(f'sent date to analytic service date : {datetime.now().date()}')
    try :
        timezone = pytz.timezone('Asia/Bangkok')
        current_datetime = datetime.now(timezone)
        date_str = current_datetime.strftime('%Y-%m-%d')
        data = {
            "date" : date_str
        }
        json_data = json.dumps(data)

        response = requests.post(f"{ANALYTIC_SERVICE}/analytics", json=json_data)
        if response.status_code == 200 :
            logger.info('sent date to analytic is success')
        else :
            logger.error(f'Error from Analytic service: {response}')
    except Exception as e :
        logger.error(f'Error from common service: {e}')
