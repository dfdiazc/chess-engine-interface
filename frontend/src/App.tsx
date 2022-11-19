import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "app/store";
import Landing from "views/Landing";
import Login from "views/Login";
import Play from "views/Play";
import Register from "views/Register";
import Profile from "views/Profile";
import RequireAuth from "features/auth/RequireAuth";
import { AuthUI } from "components";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/play" element={<Play />} />
          <Route element={<AuthUI />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
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
