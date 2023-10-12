from django.shortcuts import render
from django.http import JsonResponse

import json
import datetime

from .models import Event, EventParticipant

# Create your views here.
def get_events(request):
    response = list(Event.objects.values())
    return JsonResponse(response, safe=False)

def create_event(request):
    if request.method != "POST":
        return JsonResponse({'status': 'not ok'})
    print(request.body)
    body = json.loads(request.body)
    parsed_date = body['date'].split('-')
    date = datetime.date(int(parsed_date[0]), int(parsed_date[1]), int(parsed_date[2]))
    parsed_time = body['time'].split(":")
    time = datetime.time(int(parsed_time[0]), int(parsed_time[1]))
    title = body['title']
    description = body['description']
    email = body['email']
    event = Event(date=date, time=time, title=title, description=description, email = email)
    event.save()
    response = event.__dict__
    del response['_state']
    return JsonResponse(response, safe=False)

def subscribe_to_event(request, event):
    if request.method != "POST":
        return JsonResponse({'status': 'not ok'})
    body = json.loads(request.body)
    event = Event.objects.get(pk=event)
    name = body['name']
    email = body['email']
    participant = EventParticipant(event=event, name=name, email=email)
    participant.save()
    response = participant.__dict__
    del response['_state']
    return JsonResponse(response, safe=False)