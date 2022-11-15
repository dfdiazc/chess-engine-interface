from rest_framework import serializers
from .models import Match, Moves

class MatchSerializer(serializers.ModelSerializer):

   class Meta:

       model = Match

       fields = ["whites_player", "blacks_player", "pk"]

class MoveSerializer(serializers.ModelSerializer):

   class Meta:

      model = Moves

      fields = ["match", "fen_code", "move", "order"]
