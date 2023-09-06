import React, { useState, useEffect } from "react";
import axios from "axios";
import './Sidebar.css'

const BrandFilter = ({ onSelectBrands }) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get("http://localhost:3000/brands");

      setBrands(response.data.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const handleBrandSelection = (event) => {
    const brandId = event.target.value;

    const isChecked = event.target.checked;

    onSelectBrands(brandId, isChecked);
  };

  return (
    <div className="brand-filter">
      <h2>Brand Filter</h2>

      {brands.map((brand) => (
  <div key={brand._id} className="brand-item">
    <label>
      <input
        type="checkbox"
        value={brand._id}
        onChange={handleBrandSelection}
      />
      <div className="brandFilterNames">{brand.Name}</div>
    </label>
  </div>
))}

    </div>
  );
};

export default BrandFilter;
