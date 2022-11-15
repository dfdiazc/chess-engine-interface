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

        return Response({
            "promotion": promotion_intended,
            "player": player
        })

class GetMove(generics.GenericAPIView):

    def get(self, request, engine, difficulty, FEN):

        new_FEN = fix_fen(FEN)
        best_move = mods.get_move(engine, difficulty, new_FEN)

        return Response({"best_move": best_move})
