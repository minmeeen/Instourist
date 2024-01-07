import psycopg2
import requests
from apify_client import ApifyClient
from database.connect import Database
from datetime import datetime

# Connection parameters
connection_params = {
    "host": "localhost",
    "database": "instourist",
    "user": "postgres",
    "password": "postgres",
    "port": "5432"
}

# db = Database(connection_params)

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
    # datasets = response.json().get("data")
    # if datasets:
    #     for item in datasets.get("items"):
    #         print(item["defaultDatasetId"])
    #         for data in client.dataset(item["defaultDatasetId"]).iterate_items():
    #             print(data.get("name"))
    #             location_name = data["name"]
    #             for post in data.get("latestPosts"):
    #                 print(post.get("user").get("username"))
    #                 taken_at = datetime.utcfromtimestamp(post["taken_at"])
    #                 user_id = post["user"]["id"]
    #                 username = post["user"]["username"]
    #                 full_name = post["user"]["full_name"]

    #                 if post["caption"] != None :
    #                     caption = post["caption"]["text"]
    #                     created_at = datetime.utcfromtimestamp(post["caption"]["created_at"])

    #                 # db.insertPostToTable(taken_at, user_id, username, full_name, caption, created_at, location_name)

    #         # delete dataset when the process is done
    #         # client.dataset(item["defualtDatasetId"]).delete()
    #         print("\n")
    print(response.status_code)
                
    # else:
    #     print("No datasets found for the last run.")
else:
    print(f"Failed to get datasets. Status code: {response.status_code}")