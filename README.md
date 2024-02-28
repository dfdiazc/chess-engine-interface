# [unrealchess.web.app](https://unrealchess.web.app/)
<p align="center">
  <img src="https://github.com/dfdiazc/chess-engine-interface/blob/main/unrealchess_logo.png?raw=true">
</p>

Un-Real Chess is an online, free platform where you can play chess against the best chess engines in the world.

It features an Elo and Skill Level selectors for engines that provide it and a simple yet clean web interface where you can focus on improving you chess skills.

## Tech Details

The web frontend was made using React, while the backend uses Django to serve a REST API.

The [react-chessboard](https://www.npmjs.com/package/react-chessboard) and [chess.js](https://www.npmjs.com/package/chess.js) were used to implement the web interaction and validation within the game. The backend uses the [python-chess](https://pypi.org/project/chess/) library to provide the corresponding move for each engine.
