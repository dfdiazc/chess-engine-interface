from stockfish import Stockfish

##################################
# Specify path to stockfish engine
import os

dirname = os.path.dirname(__file__) # present working directory (equivalent of running pwd in the terminal)
engine_location = "../engines/stockfish/stockfish_13_linux_x64/stockfish_13_linux_x64/stockfish_13_linux_x64" # relative path to the engine
engine_path = os.path.realpath(os.path.join(dirname, engine_location)) # Compute actual path to the engine

global stockfish
stockfish = Stockfish(path = engine_path)
##################################

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


def get_stockfish_move(FEN:str)->str:
    """
    Determine the next best move according to the stockfish engine.

    Uses the default elo rating
    """

    stockfish.set_fen_position(FEN) # Tell stockfish the current state of the board

    best_move = stockfish.get_best_move() # Get the best move from the current state

    return best_move

def get_stockfish_nbest_moves(FEN:str)->str:
    """
    Determine the next best n moves according to the stockfish engine
    """

    n = 3 # number of moves to be displayed

    stockfish.set_fen_position(FEN)

    raw_moves = stockfish.get_top_moves(n)

    moves = [i["Move"] for i in raw_moves]

    return moves

def get_stockfish_move_elo(ELO:int, FEN:str)->str:
    """
    Determine the next best move according to the stockfish engine, given
    a certain elo rating for the engine
    """

    stockfish.set_fen_position(FEN)

    stockfish.set_elo_rating(ELO)

    best_move_elo = stockfish.get_best_move()

    return best_move_elo
