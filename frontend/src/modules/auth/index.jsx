// index.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
// import login from "./login";

const AuthRoutes = () => (
  <Routes>
    <Route path="/Home" element={<Home />} />
    <Route path="/login" element={<login/>} /> 
   
    </Routes>
);

export default AuthRoutes;
