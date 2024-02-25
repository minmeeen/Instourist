from apscheduler.schedulers.background import BackgroundScheduler
from .taskGetdataset import getDatasetFromApify

scheduler = BackgroundScheduler()

scheduler.add_job(getDatasetFromApify, 'cron', day_of_week='mon-sun', minute='1')