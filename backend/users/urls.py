from django.urls import path
from . import views

from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView, TokenBlacklistView)

app_name = "users"

urlpatterns = [
    path("create", views.CreateView.as_view()), # Create a user
    path("login", TokenObtainPairView.as_view()), # Log a user in
    path("logout", TokenBlacklistView.as_view()), # Log a user out
    path("refresh", TokenRefreshView.as_view()), # refresh jwt token
    path("<str:username>", views.UserDetailView.as_view()) # retrieve a user's information
]
