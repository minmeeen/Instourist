from apscheduler.schedulers.background import BackgroundScheduler
from .taskGetdataset import getDatasetFromApify

scheduler = BackgroundScheduler({'apscheduler.timezone': 'Asia/Bangkok'})

scheduler.add_job(getDatasetFromApify, 'cron', day_of_week='*', hour='0', minute='1')