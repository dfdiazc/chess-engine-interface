from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path(r"api/ws/match/<str:match_id>", consumers.MatchConsumer.as_asgi()),
]