from django.urls import path
from . import views

app_name = "api"

urlpatterns = [
    path("mods/<str:FEN>", views.LostView.as_view()),
]
