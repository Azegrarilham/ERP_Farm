// src/modules/inventory/index.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import InventoryListPage from "./pages/InventoryListPage";
import InventoryFormPage from "./pages/InventoryFormPage";

const InventoryRoutes = () => (
  <Routes>
    {/* Default route for /inventory */}
    <Route path="/" element={<InventoryListPage />} />

    {/* Other inventory routes */}
    <Route path="/list" element={<InventoryListPage />} />
    <Route path="/add" element={<InventoryFormPage />} />
    <Route path="/edit/:id" element={<InventoryFormPage />} />
  </Routes>
);

export default InventoryRoutes;
