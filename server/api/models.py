from django.db import models
import uuid

# Create your models here.
class Event(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        unique=True,
    )
    date = models.DateField()
    time = models.TimeField()
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=600)
    email = models.EmailField(max_length=255)

class EventParticipant(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        unique=True
    )
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    name = models.CharField(max_length=600)
    email = models.EmailField(max_length=255)
