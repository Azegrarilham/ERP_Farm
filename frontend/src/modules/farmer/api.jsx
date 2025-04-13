// api.js
import axios from "axios";

const BASE_URL = "http://localhost:8001/api"; // Laravel Farmer service

export const getFarmers = () => axios.get(`${BASE_URL}/farmers`);

export const createFarmer = (data) => axios.post(`${BASE_URL}/farmers`, data);

// Add more functions like updateFarmer, deleteFarmer if needed
