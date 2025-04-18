// src/modules/product/index.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import ProductFormPage from './pages/ProductFormPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

const ProductRoutes = () => (
  <Routes>
    <Route path="/list" element={<ProductListPage />} />
    <Route path="/add" element={<ProductFormPage />} />
    <Route path="/edit/:id" element={<ProductFormPage />} />
    <Route path="/details/:id" element={<ProductDetailsPage />} />
  </Routes>
);

export default ProductRoutes;
