# [unrealchess.live](https://unrealchess.live/)

[![Un-Real Chess Logo](https://github.com/dfdiazc/chess-engine-interface/blob/main/unrealchess-logo.png?raw=true)](https://unrealchess.live/)

Un-Real Chess is an online, free platform where you can play chess against the best chess engines in the world, or with your friends!

## Engines

It features engines like Stockfish, Leela, and Komodo, among many others, giving you the freedom to fine tune your skills against each one.

## Play with your friends!

Create a game and share the link with your friends to challenge them to a game of chess.

## Stack Details

The web frontend is built on top of Next.js, using TailwindCSS for styling. The [react-chessboard](https://www.npmjs.com/package/react-chessboard) and [chess.js](https://www.npmjs.com/package/chess.js) libraries are used for interaction and validation within the game.

The backend is built on top of Django to serve a REST API, which uses the [python-chess](https://pypi.org/project/chess/) library to provide the corresponding move for each engine. Django-channels is used for multiplayer games.
