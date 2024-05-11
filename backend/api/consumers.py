import datetime
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
        # Check if both players have connected
        if game.blacks_player is not None and game.whites_player is not None:
            # Both players have connected, start the game
            game.game_state = "playing"
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
        move = text_data_json.get("move")

        if move:
            match = Match.objects.get(id=self.match_id)

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

            if board.is_checkmate() or board.is_stalemate():
                match.state = "over"

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

    def move(self, event):
        self.send(text_data=json.dumps({"command": "move", "move": event["move"]}))

    def start_game(self, event):
        game = self.get_game()
        self.send(
            text_data=json.dumps(
                {
                    "command": "start_game",
                    "status": game.game_state,
                    "blacks_player": str(game.blacks_player.anonymous_id),
                    "whites_player": str(game.whites_player.anonymous_id),
                    "fen": game.fen,
                    "pgn": game.pgn,
                }
            )
        )
