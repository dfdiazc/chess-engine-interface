import React from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import "./index.css";

import App from "./App";

const firebaseConfig = {
  apiKey: "AIzaSyAjRXM2owTmBeeNGupue8smX-gNi278xYE",
  authDomain: "un-real-chess.firebaseapp.com",
  databaseURL: "https://un-real-chess-default-rtdb.firebaseio.com",
  projectId: "un-real-chess",
  storageBucket: "un-real-chess.appspot.com",
  messagingSenderId: "139442822729",
  appId: "1:139442822729:web:661379dbbc15fd8d01a998",
  measurementId: "G-49J1MD0CW4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <App />
);
