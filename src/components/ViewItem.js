import React, { useState, useEffect } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import "../components/ViewItem.css";

 

const ItemList = () => {

  const { itemId } = useParams(); // Get the itemId from the URL parameter

  const [item, setItem] = useState(null);

 

  useEffect(() => {

    fetchItemById(itemId); // Pass the itemId to fetchItemById

  }, [itemId]);

 

  const fetchItemById = async (itemId) => {

    try {

      const token = localStorage.getItem("token");

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

 

      const response = await axios.get(

        `http://localhost:3000/getItemById/${itemId}`

      );

 

      console.log("API Response:", response.data);

      setItem(response.data); // Assuming the response contains the item details

    } catch (error) {

      console.error("Error fetching item:", error);

    }

  };

 

  const handleAddToCart = async () => {

    try {

      const productId = item._id; // Assuming you have a productId property in your item data

      const quantity = 1; // You can modify this to the desired quantity

 

      // Send a POST request to your API to add the product to the cart

      const response = await axios.post(

        "http://localhost:3000/addToCart",

        { productId, quantity }

      );

 

      console.log("Add to Cart Response:", response.data);

      if (response.data === "success") {

        window.alert("Product added to cart successfully!");

      } else {

        window.alert("Failed to add the product to the cart.");

      }

 

      // Handle the response or update your UI as needed

    } catch (error) {

      console.error("Error adding to cart:", error);

    }

  };

 

  console.log("Item:", item);

 

  if (!item) {

    return <div>Loading...</div>;

  }

 

  return (

    <div className="custom-item-container">

      <div className="custom-item-details">

        <img

          src={`http://localhost:3000${item.imageUrl}`} // Ensure the correct path

          alt={item.itemName}

          className="custom-item-image"

        />
          <div className="ItemDesc"> 
        <div className="custom-item-text">

          <p className="custom-item-name">{item.itemName}</p>

          <p className="custom-item-price">${item.itemPrice}</p>

          <p className="custom-item-specs">Specs: {item.itemSpecs}</p>

          <div className="custom-buttons">

            <button
                  
              className="custom-add-to-cart"

              onClick={handleAddToCart}

            >

              Add to Cart

            </button>

            {/* <button className="custom-buy-now">Buy Now</button> */}

          </div>
          </div>
        </div>

      </div>

    </div>

  );

};

 

export default ItemList;