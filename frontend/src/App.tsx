import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "views/Landing";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/*" element={<main><p>Not Found</p></main>} />
      </Routes>
  </BrowserRouter>
  );
}



export default App;
