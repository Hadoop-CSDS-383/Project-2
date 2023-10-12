from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

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
    provided_id = body.get('id')
    if provided_id:
        try:
            existing_event = Event.objects.get(id=provided_id)
        except Event.DoesNotExist:
            existing_event = None

        if existing_event:
            return HttpResponse("An event with the provided ID already exists.", status=400)
        # else:
            # Check if the provided 'id' is a valid UUID
            # Theres no need to check because django will throw an http status 500 error if the UUID is invalid
    else:
        provided_id = None # Django will generate a UUID for us
    
    parsed_date = body['date'].split('-')
    date = datetime.date(int(parsed_date[0]), int(parsed_date[1]), int(parsed_date[2]))
    parsed_time = body['time'].split(":")
    time = datetime.time(int(parsed_time[0]), int(parsed_time[1]))
    title = body['title']
    description = body['description']
    email = body['email']
    event = Event(id=provided_id, date=date, time=time, title=title, description=description, email = email)
    event.save()
    response = event.__dict__
    del response['_state']
    return JsonResponse(response, safe=False)

def subscribe_to_event(request):
    if request.method != "POST":
        return JsonResponse({'status': 'not ok'})
    body = json.loads(request.body)

    provided_id = body.get('id')
    if provided_id:
        try:
            existing_participant = EventParticipant.objects.get(id=provided_id)
        except EventParticipant.DoesNotExist:
            existing_participant = None

        if existing_participant:
            return HttpResponse("A particpant with the provided ID already exists.", status=400)
        # else:
            # Check if the provided 'id' is a valid UUID
            # Theres no need to check because django will throw an http status 500 error if the UUID is invalid
    else:
        provided_id = None # Django will generate a UUID for us

    eventId = body['event']
    eventObject = Event.objects.get(pk=eventId)
    name = body['name']
    email = body['email']
    participant = EventParticipant(id=provided_id, event=eventObject, name=name, email=email)
    participant.save()
    response = participant.__dict__
    del response['_state']
    return JsonResponse(response, safe=False)

def get_participants(request):
    response = list(EventParticipant.objects.values())
    # EventParticipant.objects.all().delete()
    return JsonResponse(response, safe=False)

def get_participants_for_event(request):
    eventId = request.GET.get('event', None)

    if eventId is not None:
        try:
            participants = EventParticipant.objects.filter(event=eventId)
            participants_data = list(participants.values())
            return JsonResponse(participants_data, safe=False)
        except EventParticipant.DoesNotExist:
            return JsonResponse({'status': 'No participants found for the event'}, status=404)
    else:
        return JsonResponse({'status': 'Missing event parameter in the request'}, status=400)