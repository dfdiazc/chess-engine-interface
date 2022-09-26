from django.urls import path
from . import views

app_name = "users"

urlpatterns = [
    path("create", views.CreateView.as_view()), # Create a user
    path("login", views.LoginView.as_view()), # Log a user in
    path("logout", views.LogoutView.as_view()), # Log a user out
]
