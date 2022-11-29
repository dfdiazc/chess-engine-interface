import React from "react";
import RequireAuth from "features/auth/RequireAuth";
import { AnimatePresence } from "framer-motion";
import { useLocation, Routes, Route } from "react-router-dom";
import Landing from "views/Landing";
import Login from "views/Login";
import Play from "views/Play";
import Profile from "views/Profile";
import Register from "views/Register";
import ProfileHome from "views/ProfileHome";
import ProfileStats from "views/ProfileStats";
import ProfileAccount from "views/ProfileAccount";
import Terms from "views/Terms";
import Privacy from "views/Privacy";

const CustomRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/play" element={<Play />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<Profile />}>
            <Route path="" element={<ProfileHome />} />
            <Route path="stats" element={<ProfileStats />} />
            <Route path="account" element={<ProfileAccount />} />
          </Route>
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
    </AnimatePresence>
  );
};

export default CustomRoutes;
