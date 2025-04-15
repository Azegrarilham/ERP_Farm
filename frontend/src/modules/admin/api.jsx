import axios from "axios";
const BASE_URL = "http://localhost:8001/api"; // Laravel  service

export const getusers = () => axios.get(`${BASE_URL}/users`); 