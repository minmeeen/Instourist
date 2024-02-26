import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

DB_USER = os.getenv('DB_USER')
DB_PASSWORD=os.getenv('DB_PASSWORD')
DB_HOST=os.getenv('DB_HOST')
DB_PORT=os.getenv('DB_PORT')
DB_NAME=os.getenv('DB_NAME')

HOSTNAME=os.getenv('HOSTNAME')
APP_PORT=os.getenv('APP_PORT')

ANALYTIC_SERVICE=os.getenv('ANALYTIC_SERVICE')
FRONTEND_SERVICE = os.getenv('FRONTEND_SERVICE')
INSTOURIST_URL = os.getenv('INSTOURIST_URL')

APIFY_API_TOKEN=os.getenv('APIFY_API_TOKEN')
APIFY_ACTOR_ID=os.getenv('APIFY_ACTOR_ID')