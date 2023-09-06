import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../components/CategoryComponent.css'

const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories using Axios
    axios.get('http://localhost:3000/getProductCategory')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);


  return (
    <div className="category-container">

      <div className='CategoryTag' style={{ marginLeft: '40px' }}> <h3 style={{ fontSize: '26px', fontWeight: 'bold', paddingBottom:'20px'}}>Featured Categories</h3></div>
  
      <div className='cardRow'>
        {categories.map(category => (
          <Link key={category._id} to={`/category/${category._id}`} className="category-link">
            <div className="category-card">
            <img
                src={`http://localhost:3000${category.category_image}`} // Image URL from the server
                alt={category.category_name}
                // height={'200px'}
                // width={'150px'}
                // style={{ marginBottom: '20px'}}
                className="category-image"
              />
              <p className="category-name">{category.category_name}</p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default CategoryComponent;
