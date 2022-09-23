from django.http import JsonResponse, HttpResponse
from django.views import View
from django.contrib.auth.models import User
from django.contrib.auth import login, logout

# Create your views here.

class CreateView(View):

    def post(self, request):

        username = request.POST.get("email") # The username is set as the user's email
        email = request.POST.get("email")
        password = request.POST.get("password")

        user = User.objects.create_user(username, email, password)

        return JsonResponse({"status": "user created successfully"})

class LoginView(View):

    def post(self, request):

        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)

        if(user is not None):

            login(request, user)

            return JsonResponse({"status": "logged in"})

        else:

            return JsonResponse({"status": "invalid credentials"})

class LogoutView(View):

    def get(self, request):

        logout(request)

        return JsonResponse({"status": "logged out"})

def test(request):

    return HttpResponse("Test")
