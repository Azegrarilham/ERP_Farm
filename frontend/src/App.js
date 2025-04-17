// src/App.jsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FarmerRoutes from "./modules/farmer"; // for testing Dev 1
import AuthRoutes from "./modules/auth";
import AdminRoutes from "./modules/admin";
import OrderRoutes from "./modules/order"; // 👉 nouveau module

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes imbriquées par module */}
        <Route path="/farmer/*" element={<FarmerRoutes />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/order/*" element={<OrderRoutes />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
