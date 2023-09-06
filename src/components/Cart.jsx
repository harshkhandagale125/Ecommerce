import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import OrderSuccessMessage from "./OrderSuccessMessage"; // Import the OrderSuccessMessage component
  import "../components/Cart.css";


const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderMessage, setOrderMessage] = useState("");
  const [showOrderSuccess, setShowOrderSuccess] = useState(false); // State to control the visibility of the success message


  const navigate = useNavigate();

  const fetchCartData = async () => {
    try {
      
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.get("http://localhost:3000/getCart");
      const { cartData, totalPrice } = response.data;
      setCartData(cartData || []);
      setTotalPrice(totalPrice);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const handleDeleteItem = async (productId) => {
    console.log("Delete icon clicked for productId:", productId);
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.post("http://localhost:3000/deleteCartItem", {
        productId,
      });

      console.log(response.data.message);
      fetchCartData();
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.put("http://localhost:3000/updateCartItem", {
        productId,
        quantity: newQuantity,
      });

      console.log(response.data.message);
      fetchCartData();
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  const addToOrder = async (cartId) => {
    try {
      console.log("Adding to order...");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.post("http://localhost:3000/addOrder", {
        cartId,
      });
  
      console.log(response.data.message);
      setOrderStatus("success");
      setOrderMessage("Items added to your orders successfully.");
      fetchCartData();
  
      // Reload the page after adding to orders
      navigate('/OrderSuccessFull');

    } catch (error) {
      console.error("Error adding orders:", error);
      setOrderStatus("error");
      setOrderMessage("Failed to add items to orders. Please try again.");
    }
  };


  
  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <div className="mainCartContainer">
      <div className="cart-container">
        {cartData.length > 0 ? (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th></th>
                  <th className="headingTitles">Product Name</th>
                  <th className="headingTitles">Quantity</th>
                  <th className="headingTitles">Sub Total</th>
                  <th className="headingTitles">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((cartProduct, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td rowSpan="2" className="product-image-cell">
                     
                      <img
                             src={`http://localhost:3000${cartProduct.imageUrl}`}
                            alt={cartProduct.itemName}
                            style={{
                              marginBottom: "45px",
                              marginLeft: "-20px",
                              width: "100px",
                              height: "100px",
                            }}
                          className="product-image"
                        />
                      </td>
                      <td>{cartProduct.itemName}</td>
                      <td className="quantity-cell">
                        <div className="quantityButtons">
                          <button
                            className="quantity-button"
                            onClick={() =>
                              handleQuantityChange(
                                cartProduct.productId,
                                cartProduct.quantity - 1
                              )
                            }
                            disabled={cartProduct.quantity === 1}
                          >
                            -
                          </button>
                          <span className="quantity">
                            {cartProduct.quantity}
                          </span>
                          <button
                            className="quantity-button"
                            onClick={() =>
                              handleQuantityChange(
                                cartProduct.productId,
                                cartProduct.quantity + 1
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td>₹{cartProduct.itemPrice}</td>
                      <td>
                        <i
                          className="fa-solid fa-trash fa-sm"
                          onClick={() =>
                            handleDeleteItem(cartProduct.productId)
                          }
                          style={{ cursor: "pointer" }}
                        ></i>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="4"></td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            
            {orderStatus === "success" && (
              <OrderSuccessMessage message={orderMessage} />
            )}

            <div className="totalPrice">
              <p
                className="total-price"
                style={{ color: "#302F2F", fontWeight: "bolder" }}
              >
                Total Price: ₹{totalPrice}
              </p>
              <button onClick={() => addToOrder(cartData[0].cartId)} className="button-5">Proceed to Buy</button>
            </div>
          </>
        ) : (
          <div>
            <p>Your cart is empty.</p>
            <button  onClick={()=>navigate("/cart")} className="button-5">My Orders</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
