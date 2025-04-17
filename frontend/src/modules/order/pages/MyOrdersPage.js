import React, { useEffect, useState } from 'react';
import '../styles.css'; // Import du fichier CSS
import {getOrders} from "../api"
const MyOrdersPage = () => {
  const [orders,setorders ]=useState([]);
  useEffect(() => {
    const fetorders = async () => {
      try {
        const response = await getOrders();
        console.log(response,"test")
        setorders(response); // update the array with fetched notifications
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };
 
    fetorders();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2>Mes Commandes</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Produit</th>
              <th>Quantité</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.product_id}</td>
                <td>{order.quantity}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
