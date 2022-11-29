import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPlayerColor } from "features/chess/chessSlice";
import { setPromoPiece } from "features/chess/chessSlice";

const PromotionPieceSelector = () => {
  const dispatch = useDispatch();
  const playerColor = useSelector(selectCurrentPlayerColor);
  const pieces = ["N", "B", "R", "Q"];
  return (
    <div className="w-full absolute flex justify-center top-0 left-0 right-0 mx-auto p-5 z-10">
      <div className="flex gap-3 w-fit bg-[#3D4547] rounded-lg px-20 py-5">
      {pieces.map((piece, i) => (
        <button
          className="bg-center bg-no-repeat hover:bg-flamingo-100 rounded-lg"
          key={i}
          onClick={() => {dispatch(setPromoPiece(piece.toLowerCase()))}}
          style={{
            width: "5rem",
            height: "5rem",
            backgroundImage: `url(http://146.190.33.159/static/chess/pieces/staunty/${
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
