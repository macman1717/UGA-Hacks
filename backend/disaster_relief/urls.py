from django.urls import path

from disaster_relief import views


urlpatterns = [
    path('login/<str:username>/<str:password>/', views.login, name='index'),
    path("<str:username>/requests/", views.get_relief_requests_by_user, name='requests'),
    path("requests/<str:id>/", views.request_rr, name='requests'),
    path("request", views.add_rr, name='add_rr'),
]