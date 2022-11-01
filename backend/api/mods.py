import chess
import chess.engine
import os

def load_engine():

    dirname = os.path.dirname(__file__) # present working directory (equivalent of running pwd in the terminal)
    engine_location = "../engines/stockfish/stockfish_13_linux_x64/stockfish_13_linux_x64/stockfish_13_linux_x64" # relative path to the engine
    engine_path = os.path.realpath(os.path.join(dirname, engine_location)) # Compute actual path to the engine
    stockfish = chess.engine.SimpleEngine.popen_uci(engine_path)

    return stockfish

def get_player_turn(FEN:str)->str:

    return FEN.split(" ")[1]

def get_first_and_last_rows(FEN:str)->tuple:

    board = FEN.split(" ")[0]
    rows = board.split("/")

    return rows[0], rows[-1]

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

        stockfish = load_engine()
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

    stockfish = load_engine()
    board = chess.Board(FEN)
    stockfish.configure({"UCI_Elo": ELO, "UCI_LimitStrength": "true"})
    result = stockfish.play(board, chess.engine.Limit(time = 0.1))
    stockfish.quit()

    return str(result.move)

def will_promote(move:str, FEN:str)->bool:
    """
    Determine whether the result of a given move is a pawn promotion
    """

    player = get_player_turn(FEN) # determine who is making the intended move

    board = chess.Board(FEN) # set the board to current position
    board.push_uci(move) # make the intended move on the current board
    new_FEN = board.fen() # update the board to have the new move

    f1, fl = get_first_and_last_rows(new_FEN) # get information of new first and last rows

    # Determine whether the first or the last row should be checked

    promotion_intended = False

    if(player == "w"):

        interest_row = f1

        if("P" in interest_row):

            promotion_intended = True

    else:

        interest_row = fl

        if("p" in fl):

            promotion_intended = True

    return player, promotion_intended

FEN = "rnbqkbnr/ppP3pp/4pp2/3p4/2P5/8/P2PPPPP/RNBQKBNR w KQkq - 0 1"
