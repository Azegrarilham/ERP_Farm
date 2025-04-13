// FarmerForm.jsx
import React, { useState } from "react";
import { createFarmer } from "./api";
import { useNavigate } from "react-router-dom";

const FarmerForm = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFarmer({ name, location });
      navigate("/farmer"); // Go back to list
    } catch (err) {
      console.error("Error creating farmer:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>➕ Add Farmer</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br /><br />
        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        /><br /><br />
        <button type="submit">✅ Save</button>
      </form>
    </div>
  );
};

export default FarmerForm;
