import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getProduct, createProduct, updateProduct } from '../api';
import ProductForm from '../pages/ProductForm';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f6f9fc 0%, #ecf5ee 100%);
  background-image: url('https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg');
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  padding: 20px;
`;

const FormPageContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  backdrop-filter: blur(10px);
`;

const Title = styled.h2`
  color: #2D3748;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #4A5568;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  background: white;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateX(-4px);
    background: #EDF2F7;
  }
`;

const ProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    farmer_id: '',
    description: '',
    image: '',
    farmer_location: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      setIsLoading(true);
      const fetchProduct = async () => {
        try {
          const data = await getProduct(id);
          setProduct({
            ...data,
            farmer_location: data.farmer?.location || ''
          });
        } catch (error) {
          console.error('Erreur lors de la récupération du produit:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      const productData = {
        ...product,
        price: parseFloat(product.price),
        farmer_id: parseInt(product.farmer_id, 10)
      };

      if (isEditMode) {
        await updateProduct(id, productData);
      } else {
        await createProduct(productData);
      }
      navigate('/product/list');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde du produit. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/product/list');
  };

  if (isLoading && isEditMode) {
    return (
      <PageContainer>
        <FormPageContainer>
          <PageHeader>
            <Title>Chargement des données...</Title>
            <BackLink to="/product/list">
              <ArrowLeft size={18} />
              Retour à la liste
            </BackLink>
          </PageHeader>
        </FormPageContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <FormPageContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <PageHeader>
          <Title>
            {isEditMode ? 'Modifier le Produit' : 'Ajouter un Nouveau Produit'}
          </Title>
          <BackLink to="/product/list">
            <ArrowLeft size={18} />
            Retour à la liste
          </BackLink>
        </PageHeader>
        
        <ProductForm 
          product={product} 
          onChange={handleChange} 
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isEditMode={isEditMode}
        />
      </FormPageContainer>
    </PageContainer>
  );
};

export default ProductFormPage;