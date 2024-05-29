from django.db import models
from django.contrib.auth.models import User
from shortuuid.django_fields import ShortUUIDField
import uuid
import chess
import chess.pgn
from coolname import generate_slug


# Create your models here.
class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    anonymous_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)

    def generate_username():
        return generate_slug(2)

    username = models.CharField(max_length=30, default=generate_username)

    def to_dict(self):
        return {
            "username": self.username,
            "anonymous_id": str(self.anonymous_id),
        }


class Match(models.Model):

    # All matches must be associated to a player on whites and a player on blacks (one of them could be the engine)
    id = ShortUUIDField(length=8, max_length=40, primary_key=True, editable=False)
    variant = models.CharField(
        max_length=30,
        choices={
            "standard": "Standard",
        },
        default="standard",
    )
    whites_player = models.ForeignKey(
        Player, on_delete=models.CASCADE, related_name="whites", null=True
    )
    blacks_player = models.ForeignKey(
        Player, on_delete=models.CASCADE, related_name="blacks", null=True
    )
    owner = models.ForeignKey(
        Player, on_delete=models.CASCADE, related_name="owner", null=True
    )
    game_state = models.CharField(
        max_length=30,
        choices={
            "waiting": "Waiting",
            "playing": "Playing",
            "over": "Over",
        },
        default="waiting",
    )
    winner = models.CharField(
        max_length=10,
        choices={
            "white": "White",
            "black": "Black",
            "draw": "Draw",
        },
        null=True,
    )
    outcome = models.CharField(
        max_length=30,
        choices={
            "checkmate": "Checkmate",
            "stalemate": "Stalemate",
            "insuficcient_material": "Insuficcient Material",
            "fivefold_repetition": "Fivefold Repetition",
            "seventyfive_move_rule": "Seventyfive Move Rule",
            "variant_end_condition": "Variant End Condition",
        },
        null=True,
    )
    fen = models.CharField(
        max_length=50,
        default="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    )
    pgn = models.CharField(
        max_length=10000,
        null=True,
        default='[Event "?"]\n[Site "?"]\n[Date "????.??.??"]\n[Round "?"]\n[White "?"]\n[Black "?"]\n[Result "*"]\n\n*',
    )
    start_time = models.DateTimeField(null=True)
    end_time = models.DateTimeField(null=True)

    """
    En caso de que se quiera fijar la dificultad:

    difficulty = models.PositiveSmallIntegerField(related_name = "difficulty")
    """

    def __str__(self):

        return str(self.id)


class Moves(models.Model):

    match = models.ForeignKey("Match", on_delete=models.CASCADE, related_name="match")
    fen_code = models.CharField(max_length=100)  # FEN code for the moment in the match
    move = models.CharField(max_length=10, default="e2e4")
    time = models.DateTimeField(auto_now_add=True)
    # order = models.PositiveIntegerField() # The moment in the match in which the move was made
