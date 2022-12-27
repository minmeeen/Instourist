#### Cannot Extract anything due to instagram's privacy policy ###

import requests

# Replace ACCESS_TOKEN with your actual access token
ACCESS_TOKEN = "EAAKLSeVUZA9EBAClUoZBA1nVMQws6WYZA0HomjQlwfH682i2UdEkdZAlU5AojsuZBT55Rmw9pdXCQJH4B8Xqa21KOUuAAZAZBzN0QHfQSSy0P8MatTxfQnv8r0cYDrMZCWiZBZAx0yFfyPfvUPbvOtHSwiqUZBEwWuuDmXLxzz9BYusqUozIZBSzFD8j8VZCujIqMIIHjlLvncn0ijYZCGGcUNWPsB"

# Replace LOCATION_ID with the ID of the location you want to scrape
LOCATION_ID = "121474598025096"



# Make a request to the Instagram API to get a list of recent media objects at the specified location
response = requests.get(f"https://graph.instagram.com/v7.0/{LOCATION_ID}/media", params={
    "fields": "id,caption,media_type,media_url,permalink,timestamp,username",
    "access_token": ACCESS_TOKEN,
    "limit": 50
})

# The response from the API will be in JSON format, so you can parse it using the json() method
data = response.json()

# The data will contain a list of media objects in the "data" field
media_objects = data["data"]

# You can loop through the list of media objects and access the individual fields such as the caption, media type, media URL, etc.
for media_object in media_objects:
    print(f"Caption: {media_object['caption']}")
    print(f"Media type: {media_object['media_type']}")
    print(f"Media URL: {media_object['media_url']}")
    print(f"Permalink: {media_object['permalink']}")
    print(f"Timestamp: {media_object['timestamp']}")
    print(f"Username: {media_object['username']}")

