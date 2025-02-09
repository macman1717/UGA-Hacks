import json
from datetime import datetime

from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render

from disaster_relief.models import ReliefRequest, Comment


# Create your views here.
def comment_endpoints(request, comment_oid):
    if request.method == 'PUT':
        body = json.loads(request.body)
        try:
            comment = Comment.objects.get(pk=comment_oid)
            comment.content = body.get('content')
            comment.save()

            return JsonResponse({'response': 'ok'}, status=200)
        except Exception as exception:
            return JsonResponse({'error': str(exception)}, status=400)

    elif request.method == "DELETE":
        try:
            Comment.objects.filter(id=comment_oid).delete()
            return JsonResponse({'response': 'success'}, status=200)
        except Comment.DoesNotExist:
            return JsonResponse({'response': 'fail'}, status=404)

def login(request):
    data = json.loads(request.body)
    username = data['username']
    password = data['password']
    try:
        user = User.objects.get(username=username)
        if user.check_password(password):
            return JsonResponse({"user_id": str(user.id)}, status=200)
        user.save()
        return JsonResponse({"user_id":user.id}, status=400)
    except User.DoesNotExist:
        return JsonResponse({"response": "Username not found"}, status=404)

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

    rr_dict = {
        "id": str(rr.id),
        "longitude": rr.longitude,
        "latitude": rr.latitude,
        "description": rr.description,
        "category": rr.category,
        "date": rr.date,  # Convert datetime to string
        "link": rr.link,
        "title": rr.title,
        "user_id": str(rr.user_id),  # Get user ID directly
    }
    return JsonResponse(rr_dict, safe=False, status=200)

def get_all_rrs(request):
    requests = list(ReliefRequest.objects.all().values())
    for rr in requests:
        format_relief_request(rr)
    return JsonResponse(requests, safe=False, status=200)
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

def post_comment(request):
    try:
        body = json.loads(request.body)
        username = User.objects.get(username=body["username"]).username
        rr_id = body["relief_request"]
        content = body["content"]
        date = datetime.now()
        comment = Comment(
            content=content,
            username=username,
            relief_request = rr_id,
            date=date,
        )

        comment.save()

        comment_dict = {
            "id": str(comment.id),
            "content": comment.content,
            "username": comment.username,
            "relief_request": str(comment.relief_request),
            "date": comment.date,
        }

        return JsonResponse(comment_dict, status=200)
    except Exception as e:
        return JsonResponse({"response": str(e)}, status=500)

def create_user(request):
    try:
        body = json.loads(request.body)
        username = body["username"]
        password = body["password"]
        email = body["email"]
        first_name = body["first_name"]
        last_name = body["last_name"]
        User.objects.create_user(username=username,
                                 password=password,
                                 email=email,
                                 first_name=first_name,
                                 last_name=last_name,
                                 date_joined=datetime.now())
        return JsonResponse({"response": "ok"}, status=200)
    except Exception as e:
        return JsonResponse({"response": str(e)}, status=500)

def format_relief_request(relief_request):
    relief_request["id"] = str(relief_request["id"])
    relief_request['user_id'] = str(relief_request['user_id'])
    relief_request['comments'] = list((Comment
                                  .objects
                                  .filter(username=User
                                          .objects
                                          .get(pk=relief_request['user_id']),
                                          relief_request=relief_request['id']
                                          )
                                  .values()))
    for comment in relief_request['comments']:
        comment['id'] = str(comment['id'])
    print(relief_request)



