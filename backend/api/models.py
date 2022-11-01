from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Match(models.Model):

    # All matches must be associated to a player on whites and a player on blacks (one of them could be the engine)
    whites_player = models.ForeignKey(User, on_delete=models.CASCADE, related_name = "whites")
    blacks_player = models.ForeignKey(User, on_delete=models.CASCADE, related_name = "blacks")

    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null = True)

    def __str__(self):

       return f"{self.whites_player} at {self.start_time}"

class Moves(models.Model):

    match = models.ForeignKey("Match", on_delete=models.CASCADE, related_name = "match")
    fen_code = models.CharField(max_length=100) # FEN code for the moment in the match
    move = models.CharField(max_length=10)
    order = models.PositiveIntegerField() # The moment in the match in which the move was made
