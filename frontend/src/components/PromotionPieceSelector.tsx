import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPieceStyle, selectCurrentPlayerColor } from "features/chess/chessSlice";
import { setPromoPiece } from "features/chess/chessSlice";

const PromotionPieceSelector = () => {
  const dispatch = useDispatch();
  const playerColor = useSelector(selectCurrentPlayerColor);
  const pieceStyle = useSelector(selectCurrentPieceStyle);
  const pieces = ["N", "B", "R", "Q"];
  return (
    <div className="w-full absolute flex justify-center top-0 left-0 right-0 mx-auto p-5 z-10">
      <div className="flex gap-3 w-fit bg-[#3D4547] rounded-lg px-8 md:px-28 py-5">
        {pieces.map((piece, i) => (
          <button
            className="bg-center bg-no-repeat hover:bg-flamingo-100 rounded-lg w-12 h-12 md:w-24 md:h-24"
            key={i}
            onClick={() => {
              dispatch(setPromoPiece(piece.toLowerCase()));
            }}
            style={{
              backgroundImage: `url(https://unrealchess.live/static/chess/pieces/${pieceStyle}/${
                playerColor + piece
              }.svg)`,
              backgroundSize: "100%",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionPieceSelector;
