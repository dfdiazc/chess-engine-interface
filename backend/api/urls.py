from django.urls import path
from . import views

app_name = "api"

urlpatterns = [
    path("mods/<str:FEN>", views.LostView.as_view()),
    path("mods/<str:move>/<str:FEN>", views.PromotionView.as_view()),
    path("match", views.MatchView.as_view()),
    path("play/stockfish/suggest/<str:FEN>", views.GetStockfishBestMoves.as_view()),
    path("play/<str:engine>/<int:difficulty>/<str:FEN>", views.GetMove.as_view()),
    path("playfullgame/<str:engine>", views.GetFullGame.as_view()),
]
