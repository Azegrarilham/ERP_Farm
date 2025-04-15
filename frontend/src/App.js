// App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import FarmerRoutes from "./modules/farmer"; // for testing Dev 1
import AuthRoutes from "./modules/auth";
// import here you Routes 
import AdminRoutes from "./modules/admin";
function App() {
  return (
    <BrowserRouter>
      <FarmerRoutes /> {/* for testing Dev 1  */}
      {/* put it here the routes that u import */}
    </BrowserRouter>
  );
}

export default App;
