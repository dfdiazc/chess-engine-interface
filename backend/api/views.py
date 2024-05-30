from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from . import mods
from .models import Match, Player
from .serializers import MatchSerializer
from django.core.exceptions import ObjectDoesNotExist
from uuid import UUID


# Auxiliary functions

def fix_fen(url_fen):

    raw_FEN = url_fen.split(" ")
    correction = raw_FEN[0].replace("-", "/")

    new_FEN = " ".join([correction] + raw_FEN[1:])

    return new_FEN


# Views
class LostView(generics.GenericAPIView):

    def get(self, request, FEN):

        current_count = mods.missing_pieces(FEN)

        return Response(current_count)


class MatchView(APIView):
    def get(self, request, *args, **kwargs):
        match_id = request.query_params.get("id")
        match = Match.objects.get(id=match_id)
        serializer = MatchSerializer(match)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = MatchSerializer(data=request.data)
        if serializer.is_valid():
            player_id = request.COOKIES.get("player_id")
            player_color = request.data.get("player_color")
            if player_id:
                try:
                    player = Player.objects.get(anonymous_id=player_id)
                except ObjectDoesNotExist:
                    player = Player.objects.create(
                        user=request.user if request.user.is_authenticated else None
                    )
            else:
                player = Player.objects.create(
                    user=request.user if request.user.is_authenticated else None
                )
            match = serializer.save(owner=player)
            if player_color == "w":
                match.whites_player = player
            elif player_color == "b":
                match.blacks_player = player
            match.save()
            response = Response(serializer.data, status=201)
            if not player_id:
                response.set_cookie(
                    "player_id", player.anonymous_id, samesite="None", secure=True
                )
            return response
        return Response(serializer.errors, status=400)

    def patch(self, request, *args, **kwargs):
        match_id = request.data.get("match_id")
        player_id = request.COOKIES.get("player_id")
        if match_id:
            match = Match.objects.get(id=match_id)
            if player_id:
                player_id = UUID(player_id)
                try:
                    player = Player.objects.get(anonymous_id=player_id)
                except ObjectDoesNotExist:
                    player = Player.objects.create(
                        user=request.user if request.user.is_authenticated else None
                    )
                if (
                    match.whites_player
                    and match.whites_player.anonymous_id == player_id
                ) or (
                    match.blacks_player
                    and match.blacks_player.anonymous_id == player_id
                ):
                    return Response({"success": "Player already in match."}, status=200)
                else:
                    if match.whites_player and match.blacks_player is None:
                        match.blacks_player = player
                    elif match.blacks_player and match.whites_player is None:
                        match.whites_player = player
                    else:
                        return Response({"error": "Match is already full."}, status=400)
                match.save()
                return Response(MatchSerializer(match).data, status=200)
            else:
                player = Player.objects.create(
                    user=request.user if request.user.is_authenticated else None
                )
                if match.whites_player and match.blacks_player is None:
                    match.blacks_player = player
                elif match.blacks_player and match.whites_player is None:
                    match.whites_player = player
                else:
                    return Response({"error": "Match is already full."}, status=400)
                match.save()

                response = Response(MatchSerializer(match).data, status=200)
                response.set_cookie(
                    "player_id", player.anonymous_id, samesite="None", secure=True
                )
                return response

        return Response({"error": "Match ID is required"}, status=400)


class GetStockfishBestMoves(generics.GenericAPIView):

    def get(self, request, FEN):

        new_FEN = fix_fen(FEN)

        moves = mods.get_stockfish_nbest_moves(new_FEN)

        return Response(moves)


class PromotionView(generics.GenericAPIView):

    def get(self, request, move, FEN):

        new_FEN = fix_fen(FEN)
        player, promotion_intended = mods.will_promote(move, new_FEN)

        return Response({"promotion": promotion_intended, "player": player})


class GetMove(generics.GenericAPIView):

    def get(self, request, engine, difficulty, FEN):

        new_FEN = fix_fen(FEN)
        best_move = mods.get_move(engine, difficulty, new_FEN)

        return Response({"best_move": best_move})


class GetFullGame(generics.GenericAPIView):

    def get(self, request, engine):

        moves = mods.get_full_game(engine)

        return Response({"moves": moves})



    def get(self, request, match_id):

        match_moves = Moves.objects.filter(match=match_id).order_by("time")

        latest_move = match_moves[-1]
        previous_move = match_moves[-2]

        # Get lost pieces
        latest_FEN = fix_fen(latest_move.fen_code)
        previous_FEN = fix_fen(previous_move.fen_code)

        lost = mods.lost(latest_FEN, previous_FEN)

        # Get stockfish engine suggestions
        suggestions = mods.get_stockfish_nbest_moves(latest_FEN)

        # Get the engine name

        engines = ["stockfish", "komodo"]

        match = Match.objects.get(pk=match_id)
        whites_player = match.whites_player
        blacks_player = match.blacks_player

        blacks_engine = blacks_player.username in engines

        if blacks_engine:

            engine = blacks_player.username

        else:

            engine = whites_player.username

        """
        En caso de que se quiera fijar la dificultad

        difficulty = latest_move.match.difficulty

        best_move = mos.get_move(engine, difficulty, latest_FEN)
        """

        best_move = mods.get_move(engine, difficulty, latest_FEN)

        response = {
            "lost": lost,
            "suggestions": suggestions,
            "best_move": best_move,
        }

        return Response(response)
