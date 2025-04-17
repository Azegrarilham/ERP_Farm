import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import FarmerRoutes from "./modules/farmer";
import InventoryRoutes from "./modules/inventory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/inventory/*" element={<InventoryRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
