import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AdminRouter } from "./router";
import { AuthProvider } from "./contexts";
import { TFGProvider } from "./contexts/TFGContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* <WebRouter /> */}
        <TFGProvider>
          <AdminRouter />
        </TFGProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}
