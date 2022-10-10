import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "views/Landing";
import Login from "views/Login";
import Play from "views/Play";
import Register from "views/Register";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/play" element={<Play />} />
        <Route path="/*" element={<main><p>Not Found</p></main>} />
      </Routes>
  </BrowserRouter>
  );
}



export default App;
