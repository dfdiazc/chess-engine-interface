import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "app/store";
import CustomRoutes from "CustomRoutes";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CustomRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
