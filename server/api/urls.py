from django.urls import path

from . import views

urlpatterns = [
    path("events/", views.get_events, name="events"),
    path("events/create", views.create_event, name="create"),
    path("events/subscribe", views.subscribe_to_event, name="subscribe"),
    path("participants/", views.get_participants, name="participants"),
    path("participants/event", views.get_participants_for_event, name="participants_for_event")
]