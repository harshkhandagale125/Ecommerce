// components/Homepage.js
import React from 'react';
import { useSelector } from 'react-redux';
import '../components/Homepage.css';
import Carousel from '../components/Carousel';
import CategoryComponent from '../components/CategoryComponent';
import BrandsComponent from '../components/BrandsComponent';
import AllSmartphoneComponent from '../components/AllSmartphoneComponent';
import AllLaptopComponent from '../components/AllLaptopComponent';
import Cart from "../components/Cart";


const Homepage = () => {
  // const userRole = useSelector(state => state.user.userRole);

  // const navigationTitles = userRole === 'user'
  //   ? ['Home', 'Brands', 'Smartphones', 'Laptop']
  //   : ['User Management', 'Category', 'Brands', 'Add Product'];

  return (
    <div>
      {/* <div className="navigateTitles">
        {navigationTitles.map(title => (
          <div className="titleNames" key={title}>
            {title}
          </div>
        ))}
      </div> */}

      <Carousel />
      <CategoryComponent />
      <BrandsComponent />
      <AllSmartphoneComponent />
      <AllLaptopComponent />
    </div>
  );
};

export default Homepage;
