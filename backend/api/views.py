from rest_framework.response import Response
from rest_framework import generics
from . import mods
from .models import Match
from .serializers import MatchSerializer

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


class GetStockfishMove(generics.GenericAPIView):

    def get(self, request, FEN):

        new_FEN = fix_fen(FEN)

        best_move = mods.get_stockfish_move(new_FEN)

        return Response({"best_move": best_move})

class GetStockfishBestMoves(generics.GenericAPIView):

    def get(self, request, FEN):

        new_FEN = fix_fen(FEN)

        moves = mods.get_stockfish_nbest_moves(new_FEN)

        dic = {}

        for i in range(len(moves)):

            dic[str(i+1)] = str(moves[i])

        return Response(dic)

class GetStockfishMoveELO(generics.GenericAPIView):

    def get(self, request, skill_level, FEN):

        new_FEN = fix_fen(FEN)

        best_move_elo = mods.get_stockfish_move_elo(skill_level, new_FEN)

        return Response({"best_move": best_move_elo})
