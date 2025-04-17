// src/modules/inventory/api.jsx
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const getInventory = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/inventory`);
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory:", error);
    throw error;  // re-throw the error so the component can handle it
  }
};

export const getInventoryByProduct = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/inventory/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching inventory for product ${productId}:`, error);
    throw error;  // re-throw the error
  }
};

export const createInventory = async (inventoryData) => {
  try {
    const response = await axios.post(`${BASE_URL}/inventory`, inventoryData);
    return response.data;
  } catch (error) {
    console.error("Error creating inventory:", error);
    throw error;  // re-throw the error
  }
};

export const updateInventory = async (id, inventoryData) => {
  try {
    const response = await axios.put(`${BASE_URL}/inventory/${id}`, inventoryData);
    return response.data;
  } catch (error) {
    console.error(`Error updating inventory ${id}:`, error);
    throw error;  // re-throw the error
  }
};

export default { getInventory, getInventoryByProduct, createInventory, updateInventory };
