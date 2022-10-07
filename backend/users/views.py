from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import RegisterSerializer

# Create your views here.
class CreateView(generics.CreateAPIView):

    queryset = User.objects.all()
    serializer_class = RegisterSerializer
