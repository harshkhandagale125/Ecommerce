import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../components/BrandsComponent.css'

const BrandsComponent = () => {
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    axios.get('http://localhost:3000/brands')
      .then(response => {
        console.log(response.data.data);
        setBrands(response.data.data);
      })
      .catch(error => console.error('Error fetching brands:', error));
  }, []);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedBrands = brands.slice(startIndex, endIndex);

  return (
    <div className="category-container">
      <div className='CategoryTag' style={{ marginLeft: '40px' }}>
        <h3 style={{ fontSize: '26px', fontWeight: 'bold' }}>Brand</h3>
      </div>

      <div className='cardRowBrands'>
        {displayedBrands.map(brand => (
          <Link key={brand._id} to={`/brand/${brand._id}`} className="category-link">
            <div className="category-card">
              <img
                src={`http://localhost:3000${brand.imageUrl}`}
                alt={brand.Name}
                height={'100px'}
                width={'150px'}
                style={{ marginBottom: '20px'}}
                className="category-image"
              />
              <p className="category-name">{brand.Name}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="arrow-container">
        <div className='prevArrowBrands'>
          <div className={`arrow ${currentPage === 0 ? 'disabled' : ''}`} onClick={prevPage}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className='prevNextBrands'>
          <div style={{ transform: 'rotate(-90deg)' }} className={`arrow ${endIndex >= brands.length ? 'disabled' : ''}`} onClick={nextPage}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsComponent;
