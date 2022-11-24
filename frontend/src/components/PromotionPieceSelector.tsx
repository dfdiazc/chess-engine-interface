import React from "react";

const PromotionPieceSelector = () => {
  const pieces = [
    "wP",
    "wN",
    "wB",
    "wR",
    "wQ",
    "wK",
    "bP",
    "bN",
    "bB",
    "bR",
    "bQ",
    "bK",
  ];
  return (
    <div className="w-fit absolute top-10 left-0 right-0 mx-auto block bg-[#3D4547] p-5 z-10 rounded-lg">
      <>
        {pieces.map((p) => {
          <div
            className="bg-center bg-no-repeat"
            style={{
              width: "10rem",
              height: "10rem",
              backgroundImage: `url(http://146.190.33.159/static/chess/pieces/pirouetti/${p}.svg)`,
              backgroundSize: "100%",
            }}
          />;
        })}
      </>
    </div>
  );
};

export default PromotionPieceSelector;
