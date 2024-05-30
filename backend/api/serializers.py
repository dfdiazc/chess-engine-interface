from rest_framework import serializers
from .models import Match, Player


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ["anonymous_id", "username"]


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
            "variant",
            "fen",
            "pgn",
            "owner",
            "game_state",
            "winner",
            "outcome",
            "start_time",
            "end_time",
        ]
