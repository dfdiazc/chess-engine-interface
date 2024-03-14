import chess
import chess.engine
import os

global engines

engines = {
    "stockfish": "../engines/stockfish/stockfish_13_linux_x64_ssse/stockfish_13_linux_x64_ssse",
    "komodo": "../engines/komodo-13_201fd6/Linux/komodo-13.02-linux",
    "slowchess": "../engines/slowchess/SlowChess-Linux-2.9/slow64_linux_sse",
    "koivisto": "../engines/koivisto/Koivisto_8.0-x64-linux-sse2",
}


def load_engine(engine_name):

    dirname = os.path.dirname(
        __file__
    )  # present working directory (equivalent of running pwd in the terminal)
    engine_location = engines[engine_name]  # relative path to the engine
    engine_path = os.path.realpath(
        os.path.join(dirname, engine_location)
    )  # Compute actual path to the engine
    engine = chess.engine.SimpleEngine.popen_uci(engine_path)

    return engine


def get_player_turn(FEN: str) -> str:

    return FEN.split(" ")[1]


def is_move_from_pawn(move: str, FEN: str) -> bool:

    board = chess.Board(FEN)
    square = chess.parse_square(move[:2])
    piece = board.piece_at(square)

    return str(piece)


def missing_pieces(FEN: str) -> dict:
    """
    Determine the number of missing pieces at a given time of the match based on the
    current FEN code (FEN)

    Returns a dictionary containing the number of missing pieces for each type of piece
    """

    complete_count = {
        "r": 2,
        "n": 2,
        "b": 2,
        "q": 1,
        "k": 1,
        "p": 8,
        "P": 8,
        "R": 2,
        "N": 2,
        "B": 2,
        "Q": 1,
        "K": 1,
    }

    current_pieces = FEN.split(" ")[0]

    current_count = {}

    for piece in complete_count:

        current_count[piece] = complete_count[piece] - current_pieces.count(piece)

    return current_count


def get_stockfish_nbest_moves(FEN: str) -> str:
    """
    Determine the next best n moves according to the stockfish engine
    """

    n = 3  # number of moves to be displayed
    elo = [2100, 1800, 1350]

    engine = load_engine("stockfish")
    board = chess.Board(FEN)
    moves = {}

    for i in range(n):

        engine.configure({"UCI_Elo": elo[i], "UCI_LimitStrength": "true"})
        result = engine.play(board, chess.engine.Limit(time=0.1))
        moves[str(i + 1)] = str(result.move)

    engine.quit()

    return moves


def will_promote(move: str, FEN: str) -> bool:
    """
    Determine whether the result of a given move is a pawn promotion
    """

    end_row = move[3]
    player = get_player_turn(FEN)
    piece_moved = is_move_from_pawn(move, FEN)

    white_condition = (piece_moved == "P") and (end_row == "8")
    black_condition = (piece_moved == "p") and (end_row == "1")

    if not (white_condition or black_condition):

        return player, False

    if player == "w":

        piece_obtained = "Q"

    else:

        piece_obtained = "q"

    move = f"{move}q"
    board = chess.Board(FEN)  # set the board to current position

    pieces = FEN.split(" ")[0]
    current_queens = pieces.count(piece_obtained)

    board.push_uci(move)  # make the intended move on the current board
    new_FEN = str(board.fen())  # update the board to have the new move

    new_pieces = new_FEN.split(" ")[0]
    new_queens = new_pieces.count(piece_obtained)

    promotion_intended = current_queens < new_queens

    return player, promotion_intended


def get_move(engine: str, difficulty: str, FEN: str):

    if engine == "stockfish":

        engine_settings = {"UCI_Elo": difficulty, "UCI_LimitStrength": "true"}

    elif engine == "komodo":

        engine_settings = {"Skill": difficulty}

    else:

        engine_settings = {}

    engine = load_engine(engine)
    engine.configure(engine_settings)

    board = chess.Board(FEN)
    result = engine.play(board, chess.engine.Limit(time=0.1))

    engine.quit()

    return str(result.move)


def get_full_game(engine: str):

    if engine == "stockfish":

        engine_settings = {"UCI_Elo": 1600, "UCI_LimitStrength": "true"}

    elif engine == "komodo":

        engine_settings = {"Skill": 10}

    else:

        engine_settings = {}

    engine = load_engine(engine)
    engine.configure(engine_settings)

    board = chess.Board()
    moves = []
    while not board.is_game_over() and len(moves) < 150:
        result = engine.play(board, chess.engine.Limit(time=0.001))
        moves.append(result.move.uci())
        board.push(result.move)

    engine.quit()

    return moves


def lost(current_FEN: str, previous_FEN: str) -> dict:
    """
    Computes lost pieces from previous and current FEN codes
    """
    pieces = ["r", "n", "b", "q", "k", "p", "P", "R", "N", "B", "Q", "K"]

    current_board = current_FEN.split(" ")[0]
    previous_board = previous_FEN.split(" ")[0]

    count = {i: previous_board.count(i) - current_board.count(i) for i in pieces}

    return count
