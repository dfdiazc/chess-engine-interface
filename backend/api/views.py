from rest_framework.response import Response
from rest_framework import generics
from . import mods
from .models import Match
from .serializers import MatchSerializer

# Create your views here.
class LostView(generics.GenericAPIView):

    def get(self, request, FEN):

        current_count = mods.missing_pieces(FEN)

        return Response(current_count)

class CreateMatchView(generics.CreateAPIView):

    queryset = Match.objects.all()
    serializer_class = MatchSerializer
