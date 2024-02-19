import psycopg2
import requests
from datetime import datetime
from apify_client import ApifyClient
from .db_connect import Database

# Connection parameters
connection_params = {
}
db = Database(connection_params)

# Replace with your Apify API token and actor ID
api_token = "apify_api_r06uhUkKIWHwCc0PS0dYIupG4dqBIv2s9D1P" #new token
actor_id = "RB9HEZitC8hIUXAha"

client = ApifyClient(api_token)

def getDatasetFromApify():
    listOfLocationFromIG = db.getIGLocation()
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

            run = client.actor(actor_id).call(run_input=run_input)
            # Fetch and print Actor results from the run's dataset (if there are any)
            for data in client.dataset(run["defaultDatasetId"]).iterate_items():
                print(data.get("name"))
                location_id = db.findLocationId(data.get("location_id"))
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

                    if db.findExistPost(user_id, post_taken_at) is None :
                        db.insertPostToInitialData(user_id, username, full_name, caption, post_created_at, post_taken_at, location_id, created_at, created_by)
    
    response = requests.post("http://0.0.0.0:8001/analytics", json={"date" : datetime.now().date()})
    print(f"Run with schedule is Successfully {datetime.now()}")
    return response
