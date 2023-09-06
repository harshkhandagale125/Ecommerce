import React, { useEffect, useState } from 'react';

import axios from 'axios';

import '../components/OrderComponent.css';



const OrderComponent = () => {

  const generateRandomDate = (createdAt) => {

    const createdDate = new Date(createdAt);

    const randomDays = Math.floor(Math.random() * 4) + 2; // Random number between 2 to 5

    const deliveredDate = new Date(createdDate);

    deliveredDate.setDate(createdDate.getDate() + randomDays);

    return deliveredDate;

  };



  const formatDate = (dateString) => {

    const date = new Date(dateString);

    const day = date.getDate();

    const month = date.getMonth() + 1; // Months are zero-based, so add 1

    const year = date.getFullYear();

    return `${day}/${month}/${year}`;

  };



  const getStatus = (deliveredDate) => {

    const currentDate = new Date();

    return deliveredDate < currentDate ? 'Order Reached' : 'Order in Transit';

  };



  const [orders, setOrders] = useState([]);

  const [error, setError] = useState(null);



  const fetchOrders = async () => {

    try {

      const token = localStorage.getItem('token');

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;



      const response = await axios.get('http://localhost:3000/getOrder', {

        // headers: {

        // },

      });



      setOrders(

        response.data.orders.map((order) => ({

          ...order,

          deliveredBy: generateRandomDate(order.createdAt), // Delivery date

          status: getStatus(generateRandomDate(order.createdAt)), // Status

        }))

      );

    } catch (err) {

      setError(err.response?.data?.message || 'An error occurred');

    }

  };



  useEffect(() => {

    fetchOrders();

  }, []);



  const handleDeleteOrder = async (orderId) => {

    try {

      const token = localStorage.getItem('token');

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;



      // Send a DELETE request to your API to delete the order by its ID

      await axios.delete(`http://localhost:3000/deleteOrder/${orderId}`);
      window.location.reload();


      // Refresh the order list after deletion (you can also update the UI without a full refresh)

      fetchOrders();

    } catch (err) {

      setError(err.response?.data?.message || 'An error occurred');

    }

  };



  return (
    <div className="mainOrderContainer">
      {error && <p className="error-message">Error: {error}</p>}
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Item Name</th>
            <th>Item Price</th>
            <th>Quantity</th>
            <th>Order Date</th>
            <th>Delivered By</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            // Map over all products in the order
            order.products.map((product, index) => (
              <tr key={order._id + index}>
                {index === 0 ? ( // Render order details only for the first row
                  <>
                    <td rowSpan={order.products.length}>#{order._id}</td>
                    <td>{product.productId.itemName}</td>
                    <td>${product.productId.itemPrice.toFixed(2)}</td>
                    <td>{product.quantity}</td>
                    <td rowSpan={order.products.length}>{formatDate(order.createdAt)}</td>
                    <td rowSpan={order.products.length}>{formatDate(order.deliveredBy)}</td>
                    <td rowSpan={order.products.length} className={`status ${order.status === 'Order Reached' ? 'reached' : 'transit'}`}>
                      {order.status}
                    </td>
                    <td rowSpan={order.products.length}>
                      <button onClick={() => handleDeleteOrder(order._id)}>Delete</button>
                    </td>
                  </>
                ) : (
                  // For subsequent rows, leave the cells empty
                  <>
                    <td>{product.productId.itemName}</td>
                    <td>${product.productId.itemPrice.toFixed(2)}</td>
                    <td>{product.quantity}</td>
                  </>
                )}
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderComponent;