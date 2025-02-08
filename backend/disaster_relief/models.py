from django.contrib.auth.models import User
from django.db import models
from django_mongodb_backend.fields import ArrayField, EmbeddedModelField
from django_mongodb_backend.models import EmbeddedModel

# Create your models here.
class ReliefRequest(models.Model):
    longitude = models.FloatField()
    latitude = models.FloatField()
    description = models.TextField()
    date = models.DateTimeField()
    category = models.TextField()
    link = models.TextField()
    title = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    watchlist = ArrayField(
        models.TextField(),
        blank=True,
        null=True,
    )
    likes = models.IntegerField(default=0)

class Comment(models.Model):
    username = models.TextField()
    relief_request = models.TextField(default="")
    content = models.TextField()
    date = models.DateTimeField()
