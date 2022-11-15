import chess
import chess.engine
import os

def load_stockfish():

    dirname = os.path.dirname(__file__) # present working directory (equivalent of running pwd in the terminal)
    engine_location = "../engines/stockfish/stockfish_13_linux_x64/stockfish_13_linux_x64/stockfish_13_linux_x64" # relative path to the engine
    engine_path = os.path.realpath(os.path.join(dirname, engine_location)) # Compute actual path to the engine
    stockfish = chess.engine.SimpleEngine.popen_uci(engine_path)

    return stockfish

def load_komodo():

    dirname = os.path.dirname(__file__)
    engine_location = "../engines/komodo-13_201fd6/Linux/komodo-13.02-linux"
    engine_path = os.path.realpath(os.path.join(dirname, engine_location))
    komodo = chess.engine.SimpleEngine.popen_uci(engine_path)

    return komodo

def load_leela():

    dirname = os.path.dirname(__file__)
    engine_location = "../engines/lc0/build/release/lc0"
    engine_path = os.path.realpath(os.path.join(dirname, engine_location))
    leela = chess.engine.SimpleEngine.popen_uci(engine_path)

    return leela


def get_player_turn(FEN:str)->str:

    return FEN.split(" ")[1]

def is_move_from_pawn(move:str, FEN:str)->bool:

    board = chess.Board(FEN)
    square = chess.parse_square(move[:2])
    piece = board.piece_at(square)

    return str(piece)

def missing_pieces(FEN:str)->dict:
    """
    Determine the number of missing pieces at a given time of the match based on the
    current FEN code (FEN)

    Returns a dictionary containing the number of missing pieces for each type of piece
    """

    complete_count = {

        'r': 2,
        'n': 2,
        'b': 2,
        'q': 1,
        'k': 1,
        'p': 8,
        'P': 8,
        'R': 2,
        'N': 2,
        'B': 2,
        'Q': 1,
        'K': 1

    }

    current_pieces = FEN.split(" ")[0]

    current_count = {}

    for piece in complete_count:

        current_count[piece] = complete_count[piece] - current_pieces.count(piece)

    return current_count

def get_stockfish_nbest_moves(FEN:str)->str:
    """
    Determine the next best n moves according to the stockfish engine
    """

    n = 3 # number of moves to be displayed
    elo = [1350, 1800, 2100]
    moves = {}

    for i in range(n):

        stockfish = load_stockfish()
        board = chess.Board(FEN)
        stockfish.configure({"UCI_Elo": ELO, "UCI_LimitStrength": "true"})
        result = stockfish.play(board, chess.engine.Limit(time = 0.1))
        moves[str(i + 1)] = str(result.move)

    return moves

def get_stockfish_move_elo(ELO:int, FEN:str)->str:
    """
    Determine the next best move according to the stockfish engine, given
    a certain elo rating for the engine
    """

    stockfish = load_stockfish()
    board = chess.Board(FEN)
    stockfish.configure({"UCI_Elo": ELO, "UCI_LimitStrength": "true"})
    result = stockfish.play(board, chess.engine.Limit(time = 0.1))
    stockfish.quit()

    return str(result.move)

def will_promote(move:str, FEN:str)->bool:
    """
    Determine whether the result of a given move is a pawn promotion
    """

    end_row = move[3]
    player = get_player_turn(FEN)
    piece_moved = is_move_from_pawn(move, FEN)

    white_condition = ((piece_moved == "P")and(end_row == "8"))
    black_condition = ((piece_moved == "p")and(end_row == "1"))

    if( not (white_condition or black_condition)):

        return player, False

    if(player == "w"):

        piece_obtained = "Q"

    else:

        piece_obtained = "q"

    move = f"{move}q"
    board = chess.Board(FEN) # set the board to current position

    pieces = FEN.split(" ")[0]
    current_queens = pieces.count(piece_obtained)

    board.push_uci(move) # make the intended move on the current board
    new_FEN = str(board.fen()) # update the board to have the new move

    new_pieces = new_FEN.split(" ")[0]
    new_queens = new_pieces.count(piece_obtained)

    promotion_intended = (current_queens < new_queens)

    return player, promotion_intended

def get_komodo_move(skill:int, FEN:str)->str:

    komodo = load_komodo()
    board = chess.Board(FEN)
    komodo.configure({"Skill": skill})
    result = komodo.play(board, chess.engine.Limit(time = 0.1))
    komodo.quit()

    return str(result.move)

def get_leela_move(FEN:str)->str:

    leela = load_leela()
    board = chess.Board(FEN)
    result = leela.play(board, chess.engine.Limit(time = 0.1))
    leela.quit()

    return str(result.move)

