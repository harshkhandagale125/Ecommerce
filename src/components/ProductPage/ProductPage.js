import React, { useState, useEffect } from "react";

import axios from "axios";

import ProductCard from "./ProductCard";

import Sidebar from "./Sidebar";

import "./ProductPage.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getAllItems");

      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSelectBrands = (brandId, isChecked) => {
    if (isChecked) {
      setSelectedBrands((prevSelectedBrands) => [
        ...prevSelectedBrands,

        brandId,
      ]);
    } else {
      setSelectedBrands((prevSelectedBrands) =>
        prevSelectedBrands.filter((id) => id !== brandId)
      );
    }
  };

  const applyBrandFilters = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/getFilteredItems",
        {
          selectedBrands,
        }
      );

      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  useEffect(() => {
    applyBrandFilters();
  }, [selectedBrands]);

  return (
    <div className="product-page">
      <Sidebar onSelectBrands={handleSelectBrands} />

      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
