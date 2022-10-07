from django.urls import path
from . import views

app_name = "users"

urlpatterns = [
    path("create", views.CreateView.as_view()), # Create a user
]
