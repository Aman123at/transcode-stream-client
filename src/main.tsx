import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContextProvider.tsx";
import { VideoContextProvider } from "./context/VideoContextProvider.tsx";
import { CommonContextProvider } from "./context/CommonContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CommonContextProvider>
    <AuthContextProvider>
      <VideoContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </VideoContextProvider>
    </AuthContextProvider>
  </CommonContextProvider>
);
