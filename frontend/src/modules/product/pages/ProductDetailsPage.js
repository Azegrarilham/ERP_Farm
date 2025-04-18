import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../api';
import styled from 'styled-components';
import { ArrowLeft, Edit } from 'lucide-react';

// Styled Components
const DetailsContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #FAFAFA;
  color: #333333;
  max-width: 1000px;
  margin: auto;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 8px 15px;
  background-color: #f5f5f5;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 14px;

  &:hover {
    background-color: #e0e0e0;
  }

  svg {
    margin-right: 8px;
  }
`;

const EditButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 8px 15px;
  background-color: #2196F3;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 14px;

  &:hover {
    background-color: #1976D2;
    transform: translateY(-2px);
  }

  svg {
    margin-right: 8px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageSection = styled.div`
  flex: 1;

  @media (min-width: 768px) {
    max-width: 50%;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 16px;
  border-radius: 8px;
`;

const DetailsSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h1`
  color: #333333;
  margin-bottom: 20px;
  border-bottom: 2px solid #4CAF50;
  padding-bottom: 10px;
  font-size: 28px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const PriceTag = styled.div`
  display: inline-block;
  margin-bottom: 20px;
  padding: 8px 15px;
  background-color: #4CAF50;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border-radius: 4px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const InfoSection = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  color: #555;
  margin-bottom: 10px;
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const FarmerInfo = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f0f7f0;
  border-radius: 6px;
  border-left: 4px solid #4CAF50;

  p {
    margin: 5px 0;
  }
`;

const Description = styled.div`
  line-height: 1.6;
  margin-bottom: 20px;

  p {
    margin-bottom: 10px;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;

  &:after {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #4CAF50;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  margin-top: 40px;
  color: #d32f2f;

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
  }
`;

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 2,
    }).format(price * 10); // Convert USD to MAD (1 USD = 10 MAD)
  };

  if (loading) {
    return (
      <DetailsContainer>
        <LoadingSpinner />
      </DetailsContainer>
    );
  }

  if (error || !product) {
    return (
      <DetailsContainer>
        <Header>
          <BackButton to="/product/list" aria-label="Back to Product List">
            <ArrowLeft size={18} /> Back to List
          </BackButton>
        </Header>
        <ErrorContainer>
          <h2>Error Loading Product</h2>
          <p>{error || 'Product not found. Please try again later.'}</p>
        </ErrorContainer>
      </DetailsContainer>
    );
  }

  return (
    <DetailsContainer>
      <Header>
        <BackButton to="/product/list" aria-label="Back to Product List">
          <ArrowLeft size={18} /> Back to List
        </BackButton>
        <EditButton to={`/product/edit/${product.id}`} aria-label="Edit Product">
          <Edit size={18} /> Edit Product
        </EditButton>
      </Header>

      <ContentWrapper>
        <ImageSection>
          {product.image ? (
            <ProductImage src={product.image} alt={product.name} />
          ) : (
            <PlaceholderImage>No image available</PlaceholderImage>
          )}
        </ImageSection>

        <DetailsSection>
          <ProductName>{product.name}</ProductName>
          <PriceTag>{formatPrice(product.price)}</PriceTag>

          {product.farmer && (
            <InfoSection>
              <SectionTitle>Farmer Information</SectionTitle>
              <FarmerInfo>
                <p><strong>Farmer:</strong> {product.farmer.name}</p>
                {product.farmer.location && (
                  <p><strong>Location:</strong> {product.farmer.location}</p>
                )}
              </FarmerInfo>
            </InfoSection>
          )}

          <InfoSection>
            <SectionTitle>Description</SectionTitle>
            <Description>
              {product.description ? (
                <p>{product.description}</p>
              ) : (
                <p>No description available for this product.</p>
              )}
            </Description>
          </InfoSection>
        </DetailsSection>
      </ContentWrapper>
    </DetailsContainer>
  );
};

export default ProductDetailsPage;