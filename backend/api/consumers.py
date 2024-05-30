import datetime
from django.utils import timezone
import json
import uuid
from urllib.parse import parse_qs
import io
from channels.db import database_sync_to_async

from channels.generic.websocket import WebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Match, Player
import chess


class MatchConsumer(WebsocketConsumer):

    def connect(self):
        self.match_id = self.scope["url_route"]["kwargs"]["match_id"]
        self.room_group_name = "match_%s" % self.match_id

        game = self.get_game()
        query_string = parse_qs(self.scope["query_string"].decode())
        self.player_id = query_string.get("player_id", [None])[0]

        player = async_to_sync(self.get_player)(self.player_id)

        # Check if the player is already in the game
        if game.blacks_player == player or game.whites_player == player:
            # The player is already in the game, let them reconnect
            pass
        else:
            # The game is full, close the connection
            self.close(code=4001)
            return

        game.save()

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()
        # Check if both players have connected and game isn't over
        if (
            game.blacks_player is not None
            and game.whites_player is not None
            and game.game_state == "waiting"
        ):
            # Both players have connected, start the game
            game.game_state = "playing"
            if game.start_time is None:
                game.start_time = timezone.now()
            game.save()
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    "type": "start_game",
                },
            )

    @database_sync_to_async
    def get_player(self, player_id):
        if player_id is None:
            return Player.objects.create()
        try:
            return Player.objects.get(anonymous_id=player_id)
        except Player.DoesNotExist:
            return Player.objects.create(anonymous_id=player_id)

    def get_game(self):
        return Match.objects.get(id=self.match_id)

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        command = text_data_json.get("command")

        if command == "move":
            move = text_data_json.get("move")
            match = self.get_game()

            pgn = io.StringIO(match.pgn)
            game = chess.pgn.read_game(pgn)
            board = game.end().board()

            if move.get("promotion") is not None:
                parse_move = move["from"] + move["to"] + move["promotion"]
            else:
                parse_move = move["from"] + move["to"]

            chess_move = chess.Move.from_uci(parse_move)
            board.push(chess_move)

            game.end().add_main_variation(chess_move)

            outcome = board.outcome()
            match.pgn = str(game)
            match.fen = board.fen()
            match.save()
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    "type": "move",
                    "move": move,
                },
            )
            if outcome:
                match.game_state = "over"
                if outcome.winner == chess.WHITE:
                    match.winner = "white"
                elif outcome.winner == chess.BLACK:
                    match.winner = "black"
                else:
                    match.winner = "draw"
                if outcome.termination == chess.Termination.CHECKMATE:
                    match.outcome = "checkmate"
                elif outcome.termination == chess.Termination.STALEMATE:
                    match.outcome = "stalemate"
                elif outcome.termination == chess.Termination.INSUFFICIENT_MATERIAL:
                    match.outcome = "insufficient_material"
                elif outcome.termination == chess.Termination.FIVEFOLD_REPETITION:
                    match.outcome = "fivefold_repetition"
                elif outcome.termination == chess.Termination.SEVENTYFIVE_MOVE_RULE:
                    match.outcome = "seventyfive_move_rule"
                else:
                    match.outcome = "variant_end_condition"
                if match.end_time is None:
                    match.end_time = timezone.now()
                match.save()
                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name,
                    {
                        "type": "game_over",
                    },
                )
        elif command == "resign":
            match = self.get_game()
            match.game_state = "over"
            match.outcome = "resignation"
            self.player_id = text_data_json.get("player_id")
            player = async_to_sync(self.get_player)(self.player_id)
            if player == match.blacks_player:
                match.winner = "white"
            elif player == match.whites_player:
                match.winner = "black"
            if match.end_time is None:
                match.end_time = timezone.now()
            match.save()
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    "type": "game_over",
                },
            )

    def move(self, event):
        self.send(text_data=json.dumps({"command": "move", "move": event["move"]}))

    def start_game(self, event):
        game = self.get_game()
        self.send(
            text_data=json.dumps(
                {
                    "command": "start_game",
                    "status": game.game_state,
                    "blacks_player": game.blacks_player.to_dict(),
                    "whites_player": game.whites_player.to_dict(),
                    "fen": game.fen,
                    "pgn": game.pgn,
                }
            )
        )

    def game_over(self, event):
        game = self.get_game()
        self.send(
            text_data=json.dumps(
                {
                    "command": "game_over",
                    "status": game.game_state,
                    "winner": game.winner,
                    "outcome": game.outcome,
                }
            )
        )
