from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserDetailSerializer, UserUpdateSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .permissions import IsOwner
from django.shortcuts import get_object_or_404
from api.models import Match, Moves

# Auxiliary functions

def get_match_result(match):
    """
    Get the player who made the last move in the match
    """

    moves = Moves.objects.filter(match=match.pk).order_by("time")
    last_move = move[-1]

    player_last_move = last_move.fen_code.split(" ")[1]

    return player_last_move


# Views

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
    permission_classes = [IsAuthenticated, IsOwner]
    queryset = User.objects.all()

    def get_object(self):

        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, username = self.request.user.username)

        return obj

class UserMatchesView(generics.GenericAPIView):

    def get(self, request):

        matches_as_whites = Match.objects.filter(whites_player=request.user.pk).order_by("start_time")
        matches_as_blacks = Match.objects.filter(blacks_player=request.user.pk).order_by("start_time")

        whites_info = {}

        for i in range(len(matches_as_whites)):

            whites_info[str(i)] = {

                "against": matches_as_whites[i].blacks_player.username,
                "date": matches_as_whites[i].start_time,
                "won": "w" == get_match_result(matches_as_whites[i])

            }

        blacks_info = {}

        for i in range(len(matches_as_blacks)):

            blacks_info[str(i)] = {

                "against": matches_as_blacks[i].whites_player.username,
                "date": matches_as_blacks[i].start_time,
                "won": "b" == get_match_result(matches_as_blacks[i])

            }

        response = {"whites": whites_info, "blacks": blacks_info}

        return Response(response)
