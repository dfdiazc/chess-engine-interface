import React from "react";
import { Header } from "components";
import { Chessboard } from "react-chessboard";

const Play = () => {
  return (
    <div className="h-full">
      <Header />
      <div className="flex gap-5 px-24 py-12">
        <Chessboard position={"start"} />
      </div>
    </div>
  );
};

export default Play;
