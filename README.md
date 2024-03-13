# [unrealchess.vercel.app](https://unrealchess.vercel.app/)

[![Un-Real Chess Logo](https://github.com/dfdiazc/chess-engine-interface/blob/dev/unrealchess-logo.png?raw=true)](https://unrealchess.vercel.app/)

Un-Real Chess is an online, free platform where you can play chess against the best chess engines in the world.

It features engines like Stockfish, Leela, and Komodo, among many others, giving freedom to the player to fine tune their skills against each one.

The app, aside from providing standard chess functionalities, also includes many other features such as move recommendations and a customizable UI as to provide each player with the tools to make each game their own.

## Stack Details

The web frontend is built on top of Next.js, using TailwindCSS for styling. The [react-chessboard](https://www.npmjs.com/package/react-chessboard) and [chess.js](https://www.npmjs.com/package/chess.js) libraries are used to implement the interaction and validation within the game.

The backend is built on top of Django to serve a REST API, which uses the [python-chess](https://pypi.org/project/chess/) library to provide the corresponding move for each engine.
