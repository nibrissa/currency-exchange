from os import environ, getenv

from celery import Celery
from django.conf import settings

environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('service')
app.config_from_object('django.conf:settings')
app.conf.broker_url = settings.CELERY_BROKER_URL
app.autodiscover_tasks()
