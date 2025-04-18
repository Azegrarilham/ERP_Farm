import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ImageUploader from './ImageUploader';
import { Leaf, User, MapPin, Tag, FileText } from 'lucide-react';

// Styled Components
const FormContainer = styled(motion.form)`
  max-width: 800px;
  margin: 40px auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  backdrop-filter: blur(10px);
`;

const FormHeader = styled.div`
  background: linear-gradient(135deg, #38A169 0%, #2F855A 100%);
  padding: 30px;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg');
    background-size: cover;
    background-position: center;
    opacity: 0.1;
    z-index: 0;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 10px;
  font-weight: 600;
  position: relative;
  z-index: 1;
`;

const HeaderSubtitle = styled.p`
  opacity: 0.9;
  font-size: 1rem;
  position: relative;
  z-index: 1;
`;

const FormContent = styled.div`
  padding: 40px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const FormSection = styled(motion.div)`
  margin-bottom: 40px;
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #2D3748;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #E2E8F0;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #4A5568;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #E2E8F0;
  border-radius: 12px;
  font-size: 1rem;
  color: #2D3748;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #38A169;
    box-shadow: 0 0 0 3px rgba(56, 161, 105, 0.2);
  }

  &::placeholder {
    color: #A0AEC0;
    opacity: 1;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 12px 16px;
  border: 2px solid #E2E8F0;
  border-radius: 12px;
  font-size: 1rem;
  color: #2D3748;
  resize: vertical;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #38A169;
    box-shadow: 0 0 0 3px rgba(56, 161, 105, 0.2);
  }

  &::placeholder {
    color: #A0AEC0;
    opacity: 1;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 40px;
`;

const Button = styled(motion.button)`
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const SubmitButton = styled(Button)`
  background-color: #38A169;
  color: white;

  &:hover {
    background-color: #2F855A;
  }
`;

const CancelButton = styled(Button)`
  background-color: #EDF2F7;
  color: #4A5568;

  &:hover {
    background-color: #E2E8F0;
  }
`;

const ErrorText = styled.p`
  color: #E53E3E;
  font-size: 0.875rem;
  margin-top: 4px;
`;

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const ProductForm = ({ product, onChange, onSubmit, onCancel, isEditMode }) => {
  const handleImageChange = (imageValue) => {
    onChange({ target: { name: 'image', value: imageValue } });
  };

  return (
    <FormContainer
      initial="hidden"
      animate="visible"
      variants={formVariants}
      onSubmit={onSubmit}
    >
      <FormHeader>
        <HeaderTitle>
          {isEditMode ? 'Modifier le Produit' : 'Ajouter un Nouveau Produit'}
        </HeaderTitle>
        <HeaderSubtitle>
          {isEditMode
            ? 'Modifiez les informations du produit ci-dessous'
            : 'Remplissez les informations pour ajouter un nouveau produit'}
        </HeaderSubtitle>
      </FormHeader>

      <FormContent>
        <FormSection variants={sectionVariants}>
          <SectionTitle>
            <Tag size={20} />
            Informations de Base
          </SectionTitle>

          <FormGroup>
            <Label htmlFor="name">Nom du Produit</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={product.name || ''}
              onChange={onChange}
              required
              placeholder={isEditMode ? 'Modifier le nom du produit' : 'Entrez le nom du produit'}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="price">Prix (en MAD)</Label>
            <Input
              type="number"
              id="price"
              name="price"
              min="0"
              step="0.01"
              value={product.price || ''}
              onChange={onChange}
              required
              placeholder={isEditMode ? 'Modifier le prix' : '0.00'}
            />
            {!product.price && <ErrorText>Le champ de prix est requis.</ErrorText>}
          </FormGroup>
        </FormSection>

        <FormSection variants={sectionVariants}>
          <SectionTitle>
            <Leaf size={20} />
            Image du Produit
          </SectionTitle>
          <ImageUploader
            value={product.image || ''}
            onChange={handleImageChange}
          />
        </FormSection>

        <FormSection variants={sectionVariants}>
          <SectionTitle>
            <User size={20} />
            Information de l'Agriculteur
          </SectionTitle>

          <FormGroup>
            <Label htmlFor="farmer_id">ID de l'Agriculteur</Label>
            <Input
              type="number"
              id="farmer_id"
              name="farmer_id"
              value={product.farmer_id || ''}
              onChange={onChange}
              placeholder={isEditMode ? 'Modifier l\'ID de l\'agriculteur' : 'Entrez l\'ID de l\'agriculteur'}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="farmer_location">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                Localisation
              </div>
            </Label>
            <Input
              type="text"
              id="farmer_location"
              name="farmer_location"
              value={product.farmer_location || ''}
              onChange={onChange}
              placeholder={isEditMode ? 'Modifier la localisation' : 'Entrez la localisation de l\'agriculteur'}
            />
          </FormGroup>
        </FormSection>

        <FormSection variants={sectionVariants}>
          <SectionTitle>
            <FileText size={20} />
            Détails du Produit
          </SectionTitle>

          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              name="description"
              value={product.description || ''}
              onChange={onChange}
              placeholder={isEditMode ? 'Modifier la description' : 'Fournissez une description détaillée du produit...'}
            />
          </FormGroup>
        </FormSection>

        <ButtonGroup>
          {onCancel && (
            <CancelButton
              type="button"
              onClick={onCancel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Annuler"
            >
              Annuler
            </CancelButton>
          )}
          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={isEditMode ? 'Mettre à jour le produit' : 'Créer le produit'}
          >
            {isEditMode ? 'Mettre à jour' : 'Créer le Produit'}
          </SubmitButton>
        </ButtonGroup>
      </FormContent>
    </FormContainer>
  );
};

export default ProductForm;