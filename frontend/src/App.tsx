import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<main><p>Homepage</p></main>} />
        <Route path="/*" element={<main><p>Not Found</p></main>} />
      </Routes>
  </BrowserRouter>
  );
}



export default App;
