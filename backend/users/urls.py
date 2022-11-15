from django.urls import path
from . import views

from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView, TokenBlacklistView, TokenVerifyView)

app_name = "users"

urlpatterns = [
    path("create", views.CreateView.as_view(), name = "create"), # Create a user
    path("login", TokenObtainPairView.as_view(), name = "login"), # Log a user in
    path("logout", TokenBlacklistView.as_view(), name = "logout"), # Log a user out
    path("refresh", TokenRefreshView.as_view(), name = "refresh"), # refresh jwt token
    path("update", views.UserUpdateView.as_view(), name = "update"),
    path("token/verify", TokenVerifyView.as_view(), name = "verify"),
    path("info", views.UserDetailView.as_view(), name = "detail") # get information from user
]
