import React from "react";

import { Link } from "react-router-dom";

import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const productUrl = `/viewItem/${product._id}`; // Corrected the usage of product._id

  return (
    <div className="product-card">

      <img
        src={`http://localhost:3000${product.imageUrl}`}
        alt={product.itemName}
      />
      <div className="ProductText">
      <h3 style={{ marginBottom:'0', height:'4vh'}}>{product.itemName}</h3>
      <p >${product.itemPrice}</p>
      </div>

      <div className="ViewProductLinkText ">
      <Link
        to={productUrl}
        style={{ textDecoration: "none", }}
      >
        View Product
      </Link></div>
    </div>
  );
};

export default ProductCard;
