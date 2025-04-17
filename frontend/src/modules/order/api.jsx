// src/modules/order/api.jsx

import axios from 'axios';

// URL de base de ton microservice "order"
const BASE_URL = 'http://127.0.0.1:8000/api';

// ✅ Récupérer toutes les commandes
export const getOrders = async () => {
  const response = await axios.get(`${BASE_URL}/orders`);
  return response.data;
};

// ✅ Récupérer les commandes d'un utilisateur
export const getUserOrders = async (userId) => {
  const response = await axios.get(`${BASE_URL}/orders/user/${userId}`);
  return response.data;
};

// ✅ Créer une nouvelle commande
export const createOrder = async (orderData) => {
  const response = await axios.post(`${BASE_URL}/orders`, orderData);
  return response.data;
};

// ✅ Mettre à jour une commande
export const updateOrder = async (id, orderData) => {
  const response = await axios.put(`${BASE_URL}/orders/${id}`, orderData);
  return response.data;
};

// ✅ Supprimer une commande
export const deleteOrder = async (id) => {
  await axios.delete(`${BASE_URL}/orders/${id}`);
};
