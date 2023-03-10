import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import NavBar from "./components/NavBar";
import CollapsibleSidebar from "./components/SideBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <NavBar />
        <CollapsibleSidebar>
            <App />
        </CollapsibleSidebar>
      </Provider>
    </Router>
    <Toaster />
  </React.StrictMode>
);

import { auth } from "./auth/firebase";


