import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, User } from 'lucide-react';

// Styled Components
const CardContainer = styled(motion.div)`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  cursor: pointer;
  position: relative;
  height: ${props => props.expanded ? 'auto' : '100%'};
  grid-column: ${props => props.expanded ? '1 / -1' : 'auto'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  }
`;

const ProductImageContainer = styled.div`
  width: 100%;
  height: 240px;
  overflow: hidden;
  position: relative;
`;

const ProductImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f0f7ff 0%, #e4efe9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

const ProductInfo = styled.div`
  padding: 20px;
`;

const ProductName = styled.h3`
  color: #1a202c;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  line-height: 1.4;
`;

const Price = styled.div`
  color: #38A169;
  font-weight: 700;
  font-size: 1.5rem;
  margin: 12px 0;
  line-height: 1.2;
`;

const FarmerInfo = styled.div`
  display: flex;
  align-items: center;
  color: #718096;
  font-size: 0.875rem;
  margin-top: 8px;
  gap: 8px;
`;

const LocationBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #F0FFF4;
  color: #38A169;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  gap: 4px;
`;

const ExpandedContent = styled(motion.div)`
  padding: 20px;
  background: linear-gradient(to bottom, #ffffff 0%, #f7fafc 100%);
  border-top: 1px solid #edf2f7;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);

  &:hover {
    background: white;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(56, 161, 105, 0.2);
  }
`;

const Description = styled.p`
  color: #4A5568;
  line-height: 1.6;
  margin: 16px 0;
`;

const FarmerDetails = styled.div`
  background: #F0FFF4;
  padding: 16px;
  border-radius: 12px;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);

  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #2D3748;
    margin-bottom: 8px;
  }

  p {
    font-size: 0.875rem;
    color: #38A169;
    margin: 4px 0;
  }
`;

const ProductCard = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <CardContainer
      expanded={isExpanded}
      layoutId={`card-${product.id}`}
      onClick={!isExpanded ? toggleExpand : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isExpanded && (
        <CloseButton
          onClick={(e) => {
            e.stopPropagation();
            toggleExpand();
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <X size={20} />
        </CloseButton>
      )}

      <ProductImageContainer>
        {product.image ? (
          <ProductImage
            src={product.image}
            alt={product.name}
            layoutId={`image-${product.id}`}
            whileHover={!isExpanded ? { scale: 1.05 } : {}}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <PlaceholderImage>No Image</PlaceholderImage>
        )}
      </ProductImageContainer>

      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <Price>{formatPrice(product.price)}</Price>

        <FarmerInfo>
          <User size={16} />
          {product.farmer?.name || 'N/A'}
        </FarmerInfo>

        {product.farmer?.location && (
          <LocationBadge>
            <MapPin size={14} />
            {product.farmer.location}
          </LocationBadge>
        )}
      </ProductInfo>

      <AnimatePresence>
        {isExpanded && (
          <ExpandedContent
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Description>
              {product.description || 'No description available.'}
            </Description>

            {product.farmer && (
              <FarmerDetails>
                <h4>Farmer Details</h4>
                <p><strong>Name:</strong> {product.farmer.name}</p>
                {product.farmer.location && (
                  <p><strong>Location:</strong> {product.farmer.location}</p>
                )}
              </FarmerDetails>
            )}
          </ExpandedContent>
        )}
      </AnimatePresence>
    </CardContainer>
  );
};

export default ProductCard;