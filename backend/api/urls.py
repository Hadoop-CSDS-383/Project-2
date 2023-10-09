from django.urls import path

from . import views

urlpatterns = [
    path("events/", views.get_events, name="events"),
    path("events/create", views.create_event, name="create"),
    path("events/<uuid:event>/subscribe", views.subscribe_to_event, name="subscribe")
]