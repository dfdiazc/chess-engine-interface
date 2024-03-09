from rest_framework.response import Response
from rest_framework import generics
from . import mods
from .models import Match, Moves
from .serializers import MatchSerializer, MoveSerializer

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


class CreateMatchView(generics.CreateAPIView):

    queryset = Match.objects.all()
    serializer_class = MatchSerializer


class CreateMoveView(generics.CreateAPIView):

    queryset = Moves.objects.all()
    serializer_class = MoveSerializer


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


class MatchInfo(generics.GenericAPIView):

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
