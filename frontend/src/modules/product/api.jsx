// src/modules/product/api.jsx
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api'; // Replace with your Laravel Product Service port

export const getProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
};

export const getProduct = async (id) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(`${BASE_URL}/products`, productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${BASE_URL}/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${BASE_URL}/products/${id}`);
};
