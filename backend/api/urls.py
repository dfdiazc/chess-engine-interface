from django.urls import path
from . import views

app_name = "api"

urlpatterns = [
    path("mods/<str:FEN>", views.LostView.as_view()),
    path("match/create", views.CreateMatchView.as_view()),
    path("play/stockfish/<str:FEN>", views.GetStockfishMove.as_view()),
    path("play/stockfish/suggest/<str:FEN>", views.GetStockfishBestMoves.as_view()),
    path("play/stockfish/<int:ELO>/<str:FEN>", views.GetStockfishMoveELO.as_view()),
]
