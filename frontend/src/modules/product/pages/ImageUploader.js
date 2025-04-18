import React, { useState } from 'react';
import styled from 'styled-components';
import { Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

const UploaderContainer = styled.div`
  margin-bottom: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: ${props => props.active ? '#38A169' : '#f1f1f1'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  border-radius: 8px 8px 0 0;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: ${props => props.active ? '#2F855A' : '#e0e0e0'};
  }

  &:first-child {
    margin-right: 5px;
  }
`;

const InputContainer = styled.div`
  margin-top: 15px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const UrlInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #E2E8F0;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  
  &:focus {
    border-color: #38A169;
    outline: none;
    box-shadow: 0 0 0 3px rgba(56, 161, 105, 0.2);
  }
`;

const FileInputLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 30px;
  background-color: #F7FAFC;
  border: 2px dashed #CBD5E0;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #38A169;
    background-color: #F0FFF4;
  }
`;

const UploadIcon = styled.div`
  color: #38A169;
  margin-bottom: 12px;
`;

const FileInput = styled.input`
  display: none;
`;

const ImagePreview = styled.div`
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    display: block;
  }
`;

const ErrorMessage = styled.p`
  color: #E53E3E;
  font-size: 14px;
  margin-top: 8px;
  padding: 8px 12px;
  background-color: #FFF5F5;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ImageUploader = ({ value, onChange }) => {
  const [activeTab, setActiveTab] = useState('url');
  const [imageUrl, setImageUrl] = useState(value || '');
  const [error, setError] = useState('');
  
  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    onChange(url);
    setError('');
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (!file.type.match('image.*')) {
        setError('Veuillez sélectionner une image (JPEG, PNG, etc.)');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError("La taille de l'image doit être inférieure à 5 Mo");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
        onChange(e.target.result);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <UploaderContainer>
      <TabContainer>
        <Tab 
          active={activeTab === 'url'} 
          onClick={() => setActiveTab('url')}
        >
          <LinkIcon size={16} />
          URL de l'image
        </Tab>
        <Tab 
          active={activeTab === 'file'} 
          onClick={() => setActiveTab('file')}
        >
          <Upload size={16} />
          Télécharger
        </Tab>
      </TabContainer>
      
      <InputContainer>
        {activeTab === 'url' ? (
          <UrlInput
            type="text"
            placeholder="Entrez l'URL de l'image"
            value={imageUrl}
            onChange={handleUrlChange}
          />
        ) : (
          <FileInputLabel>
            <UploadIcon>
              <ImageIcon size={40} />
            </UploadIcon>
            <p>Cliquez ou glissez pour télécharger une image</p>
            <span style={{ fontSize: '12px', color: '#718096', marginTop: '8px' }}>
              PNG, JPG jusqu'à 5MB
            </span>
            <FileInput
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </FileInputLabel>
        )}
        
        {error && (
          <ErrorMessage>
            <span>⚠️</span>
            {error}
          </ErrorMessage>
        )}
        
        {imageUrl && (
          <ImagePreview>
            <img src={imageUrl} alt="Aperçu" />
          </ImagePreview>
        )}
      </InputContainer>
    </UploaderContainer>
  );
};

export default ImageUploader;