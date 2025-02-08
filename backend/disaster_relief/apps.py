from django.apps import AppConfig


class DisasterReliefConfig(AppConfig):
    default_auto_field = 'django_mongodb_backend.fields.ObjectIdAutoField'
    name = 'disaster_relief'
