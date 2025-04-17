import React, { useState } from 'react';

import '../styles.css';

import { createOrder } from '../api';
 
const PlaceOrderPage = () => {

  const [product, setProduct] = useState('');

  const [quantity, setQuantity] = useState('');
 
  const handleSubmit = async (e) => {

    e.preventDefault();
 
    try {

      const orderData = {

        user_id: 1, // Replace with actual logged-in user ID

        product_id: parseInt(product),

        quantity: parseInt(quantity),

        status: 'pending',

      };
 
      await createOrder(orderData);
 
      alert('Commande passée avec succès !');

      // Optionally reset form

      setProduct('');

      setQuantity('');

    } catch (error) {

      console.error('Erreur lors de la commande :', error);

      alert('Une erreur est survenue lors de la commande.');

    }

  };
 
  return (
<div className="container">
<div className="order-form">
<h2>Passer une Commande</h2>
<form onSubmit={handleSubmit}>
<label htmlFor="product">Produit</label>
<select

            id="product"

            value={product}

            onChange={(e) => setProduct(e.target.value)}

            required
>
<option value="">-- Sélectionnez un produit --</option>
<option value="1">Pommes</option>
<option value="2">Carottes</option>
<option value="3">Lait</option>
</select>
 
          <label htmlFor="quantity">Quantité</label>
<input

            type="number"

            id="quantity"

            value={quantity}

            onChange={(e) => setQuantity(e.target.value)}

            min="1"

            required

          />
 
          <button type="submit">Passer la commande</button>
</form>
</div>
</div>

  );

};
 
export default PlaceOrderPage;

 