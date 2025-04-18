import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../api';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProductCard from '../pages/ProductCard';
import DeleteConfirmation from '../pages/DeleteConfirmation';
import { Search, Plus, Leaf } from 'lucide-react';

// Updated Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f6f9fc 0%, #ecf5ee 100%);
  padding: 20px;
`;

const ListContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Title = styled.h1`
  color: #1a202c;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
`;

const Logo = styled.div`
  color: #38A169;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 400px;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 40px;
  border: 2px solid transparent;
  border-radius: 12px;
  background-color: white;
  font-size: 1rem;
  color: #2D3748;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #38A169;
    box-shadow: 0 0 0 3px rgba(56, 161, 105, 0.2);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #718096;
`;

const AddProductButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #38A169;
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(56, 161, 105, 0.2);

  &:hover {
    transform: translateY(-2px);
    background-color: #2F855A;
    box-shadow: 0 6px 12px rgba(56, 161, 105, 0.3);
  }
`;

const ProductGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px 0;
`;

const NoResults = styled(motion.div)`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const LoadingSpinner = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px;

  &:after {
    content: '';
    width: 48px;
    height: 48px;
    border: 4px solid #E2E8F0;
    border-top: 4px solid #38A169;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        // Convert USD to MAD (1 USD = 10 MAD)
        const convertedData = data.map((product) => ({
          ...product,
          price: product.price * 10, // Convert to MAD
        }));
        setProducts(convertedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const productName = product.name?.toLowerCase() || '';
    const farmerName = product.farmer?.name?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    return productName.includes(search) || farmerName.includes(search);
  });

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
      setDeleteConfirmation(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  return (
    <PageContainer>
      <ListContainer>
        <PageHeader>
          <TitleSection>
            <Logo>
              <Leaf size={32} />
            </Logo>
            <Title>Produits Agricoles</Title>
          </TitleSection>

          <div className="flex items-center gap-4">
            <SearchContainer>
              <SearchIcon>
                <Search size={20} />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search products or farmers..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </SearchContainer>

            <AddProductButton to="/product/add">
              <Plus size={20} />
                Ajouter un produit
            </AddProductButton>
          </div>
        </PageHeader>

        {loading ? (
          <LoadingSpinner
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        ) : filteredProducts.length === 0 ? (
          <NoResults
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or add a new product</p>
          </NoResults>
        ) : (
          <ProductGrid
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </ProductGrid>
        )}

        {deleteConfirmation && (
          <DeleteConfirmation
            product={deleteConfirmation}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setDeleteConfirmation(null)}
          />
        )}
      </ListContainer>
    </PageContainer>
  );
};

export default ProductListPage;