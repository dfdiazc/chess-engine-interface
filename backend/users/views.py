from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserDetailSerializer, UserUpdateSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .permissions import IsOwner
from django.shortcuts import get_object_or_404

# Create your views here.
class CreateView(generics.CreateAPIView):

    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class UserDetailView(generics.GenericAPIView):

    permission_classes = [IsAuthenticated, IsOwner]

    def get(self, request):

        user = request.user

        username = user.username
        first_name = user.first_name
        last_name = user.last_name
        email = user.email

        response = {

            "username": username,
            "first_name": first_name,
            "last_name": last_name,
            "email": email

        }

        return Response(response)

class UserUpdateView(generics.UpdateAPIView):

    serializer_class = UserUpdateSerializer
    #lookup_field = "username"
    permission_classes = [IsAuthenticated, IsOwner]
    queryset = User.objects.all()

    def get_object(self):

        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, username = self.request.user.username)

        return obj
