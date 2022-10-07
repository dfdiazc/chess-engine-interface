from rest_framework.response import Response
from rest_framework import generics
from . import mods

# Create your views here.
class LostView(generics.GenericAPIView):

    def get(self, request, FEN):

        current_count = mods.missing_pieces(FEN)

        return Response(current_count)
