import React from "react";
import BrandFilter from "./BrandFilter";
import "./Sidebar.css"; // Import your sidebar styles

const Sidebar = ({ onSelectBrands }) => {
  return (
    <div className="sidebar">
      <BrandFilter onSelectBrands={onSelectBrands} />
    </div>
  );
};

export default Sidebar;
