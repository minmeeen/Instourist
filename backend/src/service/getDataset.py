import psycopg2
import requests
from apify_client import ApifyClient
from db_connect import Database
from datetime import datetime

# Connection parameters
connection_params = {
    "host": "localhost",
    "database": "instourist",
    "user": "postgres",
    "password": "postgres",
    "port": "5432"
}

db = Database(connection_params)

# Replace with your Apify API token and actor ID
api_token = "apify_api_7Zd1icVJAjxxOE8Cg3haXN9JBzrTgk1RyTVK"
actor_id = "RB9HEZitC8hIUXAha"

# Make the API request to get the datasets of the last run
url = f"https://api.apify.com/v2/acts/apify~instagram-api-scraper/runs?token={api_token}"
headers = {"Authorization": f"Bearer {api_token}"}
response = requests.get(url)

client = ApifyClient(api_token)


# Check if the request was successful
if response.status_code == 200:
    # Parse the response to get the dataset ID
    datasets = response.json().get("data")
    if datasets: 
        for item in datasets.get("items"):
            print(item["defaultDatasetId"])
            for data in client.dataset(item["defaultDatasetId"]).iterate_items():
                print(data.get("name"))
                location_id = db.findLocationId(data.get("location_id"))
                print(location_id)
                for post in data.get("latestPosts"):
                    taken_at = post["taken_at"]
                    user_id = post["user"]["id"]
                    username = post["user"]["username"]
                    full_name = post["user"]["full_name"]

                    if post["caption"] != None :
                        caption = post["caption"]["text"]
                        create_at = post["caption"]["created_at"]

                    db.insertPostToInitialData(user_id, username, full_name, caption, create_at, taken_at, location_id)

            # delete dataset when the process is done
            # client.dataset(item["defualtDatasetId"]).delete()
            print("\n")
    else:
        print("No datasets found for the last run.")
    
    db.close()
else:
    print(f"Failed to get datasets. Status code: {response.status_code}")