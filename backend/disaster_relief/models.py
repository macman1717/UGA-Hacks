from django.contrib.auth.models import User
from django.db import models
from django_mongodb_backend.fields import ArrayField


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
    comments = ArrayField(
        models.TextField(),
        blank=True,
        null=True,
    )
    likes = models.IntegerField(default=0)


