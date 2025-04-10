from django.urls import path

from disaster_relief import views


urlpatterns = [
    path('login/', views.login, name='login'),
    path("<str:username>/requests/", views.get_relief_requests_by_user, name='requests'),
    path("requests/<str:id>/", views.request_rr, name='requests'),
    path("request/", views.add_rr, name='add_rr'),
    path('requests/range', views.get_rr_by_long_lat, name='range'),
    path('comment/', views.post_comment, name='comments'),
    path('comment/<str:comment_oid>', views.comment_endpoints, name='comment'),
    path("signup/", views.create_user, name='create_user'),
    path('requests/', views.get_all_rrs, name='all_rrs'),
]