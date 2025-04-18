import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductListPage from './modules/product/pages/ProductListPage';
import ProductFormPage from './modules/product/pages/ProductFormPage';
import ProductDetailsPage from './modules/product/pages/ProductDetailsPage';
import styled from 'styled-components';

const AppContainer = styled.div`
  font-family: 'Arial, sans-serif';
  background-color: #FAFAFA;
  min-height: 100vh;
`;

const App = () => {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/product/list" element={<ProductListPage />} />
          <Route path="/product/add" element={<ProductFormPage />} />
          <Route path="/product/edit/:id" element={<ProductFormPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/" element={<ProductListPage />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;