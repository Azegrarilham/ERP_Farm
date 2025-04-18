import React from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 25px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transform: translateY(0);
  animation: slideIn 0.2s ease-out;
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  margin-bottom: 15px;
`;

const ModalTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 20px;
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
  color: #555;
`;

const ProductName = styled.span`
  font-weight: bold;
  color: #333;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const CancelButton = styled(Button)`
  background-color: #f5f5f5;
  color: #333;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #EF5350;
  color: white;
  
  &:hover {
    background-color: #D32F2F;
  }
`;

const DeleteConfirmation = ({ product, onConfirm, onCancel }) => {
  return (
    <ModalBackdrop onClick={onCancel}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Confirm Deletion</ModalTitle>
        </ModalHeader>
        <ModalBody>
          Are you sure you want to delete <ProductName>{product.name}</ProductName>? 
          This action cannot be undone.
        </ModalBody>
        <ModalFooter>
          <CancelButton onClick={onCancel}>
            Cancel
          </CancelButton>
          <DeleteButton onClick={() => onConfirm(product.id)}>
            Delete
          </DeleteButton>
        </ModalFooter>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default DeleteConfirmation;