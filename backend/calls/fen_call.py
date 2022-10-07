import requests

base = "http://127.0.0.1:8000/api/mods/"
FEN = "rnbqkbnr/ppp2ppp/8/3p4/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4".replace("/", "-")

endpoint = base + FEN

print(requests.get(endpoint).json())
