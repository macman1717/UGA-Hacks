import json
from datetime import datetime

from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render

from disaster_relief.models import ReliefRequest

# Create your views here.

def login(request):
    data = json.loads(request.body)
    password = data['password']
    username = data['username']
    try:
        user = User.objects.get(username=username)
        if user.check_password(password):
            return JsonResponse({"response": "ok"}, status=200)
        user.save()
        return JsonResponse({"error": "Incorrect password"}, status=400)
    except User.DoesNotExist:
        return JsonResponse({"error": "Username not found"}, status=404)

def get_relief_requests_by_user(request, username):
    requests = list(ReliefRequest.objects.filter(user__username=username).values())
    for rr in requests:
        format_relief_request(rr)
    return JsonResponse(requests, safe=False, status=200)

def add_rr(request):
    body = json.loads(request.body)
    rr = ReliefRequest.objects.create(
        longitude=body["longitude"],
        latitude=body["latitude"],
        description=body["description"],
        category=body["category"],
        date=datetime.now(),
        link=body["link"],
        title=body["title"],
        user_id=body["user_id"],
    )
    rr.save()
    return JsonResponse(body)

def request_rr(request, id):
    if request.method == "GET":
        try:
            rr = ReliefRequest.objects.filter(id=id).values().first()
            if rr is not None:
                format_relief_request(rr)
                return JsonResponse(rr, safe=False, status=200)
            else :
                return JsonResponse({"error": "not found"},  status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    elif request.method == "DELETE":
        try:
            ReliefRequest.objects.filter(id=id).delete()
        except ReliefRequest.DoesNotExist:
            return JsonResponse({"error": "Request does not exist"}, status=404)
        return JsonResponse({"response":"ok"}, status=200)

    elif request.method == "PUT":
        body = json.loads(request.body)
        rr = ReliefRequest.objects.get(id=id) # implement update logit

def get_rr_by_long_lat(request):
    body = json.loads(request.body)

    upper_bound_lat = body["upper_bound_lat"]
    lower_bound_lat = body["lower_bound_lat"]
    upper_bound_lng = body["upper_bound_lng"]
    lower_bound_lng = body["lower_bound_lng"]
    requests = list(ReliefRequest.objects.filter(
        latitude__lt=upper_bound_lat,
        latitude__gt=lower_bound_lat,
        longitude__lt=upper_bound_lng,
        longitude__gt=lower_bound_lng,
    ).values())
    for rr in requests:
        format_relief_request(rr)
    return JsonResponse(requests, safe=False, status=200)

def format_relief_request(relief_request):
    relief_request["id"] = str(relief_request["id"])
    relief_request['user_id'] = str(relief_request['user_id'])


