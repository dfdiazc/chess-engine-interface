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
