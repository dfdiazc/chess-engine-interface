from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserDetailSerializer, UserUpdateSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class CreateView(generics.CreateAPIView):

    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class UserDetailView(generics.RetrieveAPIView):

    serializer_class = UserDetailSerializer
    queryset = User.objects.all()
    lookup_field = "username"
    permission_classes = [IsAuthenticated]

class UserUpdateView(generics.UpdateAPIView):

    serializer_class = UserUpdateSerializer
    lookup_field = "username"
