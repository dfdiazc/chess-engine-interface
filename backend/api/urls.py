from django.urls import path
from . import views

app_name = "api"

urlpatterns = [
    path("", views.TestView.as_view()),
    path("<str:name>", views.GreetingView.as_view()),
    path("mods/<str:FEN>", views.LostView.as_view()),
]
