import psycopg2
# import requests
import pandas as pd
from apify_client import ApifyClient
from db_connect import Database

# Connection parameters
connection_params = {
    "host": "local",
    "database": "instourist",
    "user": "postgres",
    "password": "postgres",
    "port": "5432"
}

db = Database(connection_params)

# ตัวอย่างเมื่อดึงมาจาก database
# listOfIGLocations = [[["632463043626278","1028305381"]],[["236812658","352088355491037"]],[["291752084203684","1527799243987966"]],[["112222267011408","349345216","248305621"]],[["904134436338401","419245734893599"]],[["223846157","1030948912","487995489"]],[["305046242995484","893971733980858","113055166899502"]],[["662626057506904","100502908417645"]],[["100492914914971"]],[["213590035"]],[["1764651450309580"]],[["195304697182096"]]]

# Replace with your Apify API token and actor ID
api_token = "apify_api_r06uhUkKIWHwCc0PS0dYIupG4dqBIv2s9D1P" #new token
actor_id = "RB9HEZitC8hIUXAha"

# Make the API request to get the datasets of the last run
# url = f"https://api.apify.com/v2/acts/apify~instagram-api-scraper/runs?token={api_token}"
# headers = {"Authorization": f"Bearer {api_token}"}
# response = requests.get(url)

client = ApifyClient(api_token)

# Prepare the Actor input
run_input = {
    "directUrls": ["https://www.instagram.com/explore/locations/632463043626278"],
    "resultsType": "details",
    "resultsLimit": 200,
    "addParentData": False,
    "searchType": "hashtag",
    "searchLimit": 1,
}

run = client.actor(actor_id).call(run_input=run_input)

df = pd.DataFrame(columns = ["user_id", "username", "full_name", "caption", "post_created_at", "post_taken_at", "location_id", "created_at", "created_by"])

# Fetch and print Actor results from the run's dataset (if there are any)
for data in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(data.get("name"))
    location_id = db.findLocationId(data.get("location_id"))
    print(location_id)
    for post in data.get("latestPosts"):
        post_taken_at = post["taken_at"]
        user_id = post["user"]["id"]
        username = post["user"]["username"]
        full_name = post["user"]["full_name"]
        
        if db.findExistPost(user_id, post_taken_at) is None: #wrong condition to check exit post
            if post["caption"] != None :
                caption = post["caption"]["text"]
                post_created_at = post["caption"]["created_at"]
            else :
                caption = ""

            created_at = pd.Timestamp.now()
            created_by = "System"
            df.loc[len(df)] = (user_id, username, full_name, caption, post_created_at, post_taken_at, location_id, created_at, created_by)
            db.insertPostToInitialData(user_id, username, full_name, caption, post_created_at, post_taken_at, location_id, created_at, created_by)


print(df)

# Check if the request was successful
# if response.status_code == 200:
#     # Parse the response to get the dataset ID
#     datasets = response.json().get("data")
#     if datasets: 
#         for item in datasets.get("items"):
#             print(item["defaultDatasetId"])
#             df = pd.DataFrame(columns = ["user_id", "username", "full_name", "caption", "created_at", "taken_at", "location_id"])
#             for data in client.dataset(item["defaultDatasetId"]).iterate_items():
#                 print(data.get("name"))
#                 location_id = db.findLocationId(data.get("location_id"))
#                 print(location_id)
#                 for post in data.get("latestPosts"):
#                     taken_at = post["taken_at"]
#                     user_id = post["user"]["id"]
#                     username = post["user"]["username"]
#                     full_name = post["user"]["full_name"]

#                     if post["caption"] != None :
#                         caption = post["caption"]["text"]
#                         create_at = post["caption"]["created_at"]

#                     df.loc[len(df)] = (user_id, username, full_name, caption, create_at, taken_at, location_id)
#                     db.insertPostToInitialData(user_id, username, full_name, caption, create_at, taken_at, location_id)

#             # delete dataset when the process is done
#             # client.dataset(item["defualtDatasetId"]).delete()
#             print("\n")
#     else:
#         print("No datasets found for the last run.")
    
#     db.close()
# else:
#     print(f"Failed to get datasets. Status code: {response.status_code}")