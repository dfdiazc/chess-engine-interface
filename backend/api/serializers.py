from rest_framework import serializers
from .models import Match, Moves, Player


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ["anonymous_id"]


class MatchSerializer(serializers.ModelSerializer):
    owner = PlayerSerializer(read_only=True)
    whites_player = PlayerSerializer(read_only=True)
    blacks_player = PlayerSerializer(read_only=True)

    class Meta:

        model = Match

        fields = [
            "whites_player",
            "blacks_player",
            "id",
            "fen",
            "pgn",
            "owner",
            "game_state",
            "start_time",
            "end_time",
        ]


class MoveSerializer(serializers.ModelSerializer):

    class Meta:

        model = Moves

        fields = ["match", "fen_code", "move", "order"]
