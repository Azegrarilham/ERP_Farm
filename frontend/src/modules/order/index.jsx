// src/modules/order/index.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MyOrdersPage from './pages/MyOrdersPage';
import PlaceOrderPage from './pages/PlaceOrderPage';

const OrderRoutes = () => {
  return (
    <Routes>
      <Route path="my-orders" element={<MyOrdersPage />} />
      <Route path="place" element={<PlaceOrderPage />} />
    </Routes>
  );
};

export default OrderRoutes;