import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FirebaseContext } from "../context/FirebaseContext.js";
import { app, auth, db } from "../services/firebaseconfig.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FirebaseContext.Provider value={{ app, auth, db }}>
      <App />
    </FirebaseContext.Provider>
  </StrictMode>
);
 