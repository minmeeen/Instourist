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