// App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import FarmerRoutes from "./modules/farmer"; // for testing Dev 1

function App() {
  return (
    <BrowserRouter>
      <FarmerRoutes />
    </BrowserRouter>
  );
}

export default App;
