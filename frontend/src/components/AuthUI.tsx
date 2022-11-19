import React from "react";
import { Outlet } from "react-router-dom";

const AuthUI = () => {
  return (
    <div className="flex flex-col h-screen w-full overflow-auto gradient">
      <div className="wave" />
      <div className="wave" />
      <div className="wave" />
      <div className="flex justify-center grow py-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthUI;
