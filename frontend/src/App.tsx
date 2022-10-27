import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "redux/store";
import Landing from "views/Landing";
import Login from "views/Login";
import Play from "views/Play";
import Register from "views/Register";
import Profile from "views/Profile";
import RequireAuth from "features/auth/RequireAuth";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/play" element={<Play />} />
          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          {/* not found */}
          <Route
            path="/*"
            element={
              <main>
                <p>Not Found</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
