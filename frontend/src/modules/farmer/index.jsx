// index.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import FarmerList from "./FarmerList";
import FarmerForm from "./FarmerForm";

const FarmerRoutes = () => (
  <Routes>
    <Route path="/farmer" element={<FarmerList />} />
    <Route path="/farmer/create" element={<FarmerForm />} />
  </Routes>
);

export default FarmerRoutes;
