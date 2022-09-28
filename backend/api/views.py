from django.shortcuts import render
from django.views import View
from django.http import HttpResponse, JsonResponse
from . import mods

# Create your views here.
class TestView(View):

    def get(self, request):

        return HttpResponse("Test View")

class GreetingView(View):

    def get(self, request, name):

        return HttpResponse("Hello, " + name)

class LostView(View):

    def get(self, request, FEN):

        current_count = mods.missing_pieces(FEN)

        return JsonResponse(current_count)
