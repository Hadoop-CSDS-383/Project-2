from django.http import JsonResponse
import json
import re
from datetime import date, time
from .models import Event, EventParticipant

def get_events(request):
    response = list(Event.objects.values())
    return JsonResponse(response, safe=False)

def create_event(request):
    if request.method != "POST":
        return JsonResponse({'status': 'not ok'})

    body = json.loads(request.body)

    if 'date' not in body or 'time' not in body:
        return JsonResponse({'status': 'missing date or time'})

    date_str = body['date']
    time_str = body['time']

    # Validate date format (YYYY-MM-DD)
    date_match = re.match(r'^(\d{4})-(\d{2})-(\d{2})$', date_str)
    if not date_match:
        return JsonResponse({'status': 'invalid date format'})

    year, month, day = map(int, date_match.groups())
    date_obj = date(year, month, day)

    # Parse and validate time format (HH:MM AM/PM)
    parsed_time = parse_time(time_str)
    if parsed_time is None:
        return JsonResponse({'status': 'invalid time format'})

    title = body.get('title', '')
    description = body.get('description', '')
    email = body.get('email', '')

    event = Event(date=date_obj, time=parsed_time, title=title, description=description, email=email)
    event.save()

    response = event.__dict__
    del response['_state']

    return JsonResponse(response, safe=False)

def parse_time(time_str):
    time_pattern = r'(\d{2}):(\d{2}) (AM|PM)'
    match = re.match(time_pattern, time_str)

    if match:
        hours, minutes, period = match.groups()
        hours = int(hours)
        minutes = int(minutes)

        if period == 'PM' and hours < 12:
            hours += 12

        return time(hours, minutes)

    return None  # Return None for an invalid time format

def subscribe_to_event(request, event):
    if request.method != "POST":
        return JsonResponse({'status': 'not ok'})

    body = json.loads(request.body)
    event_obj = Event.objects.get(pk=event)
    name = body['name']
    email = body['email']

    participant = EventParticipant(event=event_obj, name=name, email=email)
    participant.save()

    response = participant.__dict__
    del response['_state']

    return JsonResponse(response, safe=False)
