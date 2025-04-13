// FarmerList.jsx
import React, { useEffect, useState } from "react";
import { getFarmers } from "./api";
import { Link } from "react-router-dom";

const FarmerList = () => {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    getFarmers()
      .then((res) => setFarmers(res.data))
      .catch((err) => console.error("Error loading farmers:", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>👩‍🌾 Farmers</h2>
      <ul>
        {farmers.map((farmer) => (
          <li key={farmer.id}>
            {farmer.name} - {farmer.location}
          </li>
        ))}
      </ul>
      <Link to="/farmer/create">➕ Add New Farmer</Link>
    </div>
  );
};

export default FarmerList;
