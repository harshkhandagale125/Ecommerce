import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/AllSmartphoneComponent.css';

const AllLaptopComponent = () => {
  const [smartphones, setSmartphones] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    // Fetch smartphones using Axios
    axios
      .get('http://localhost:3000/getItemsByCategory/1') 
      .then(response => setSmartphones(response.data.data))
      .catch(error => console.error('Error fetching smartphones:', error));
  }, []);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedSmartphones = smartphones.slice(startIndex, endIndex);

  return (
    <div className="AllsmartphoneContainer">
      <div className="CategoryTag" style={{ marginLeft: '94px' }}>
        {' '}
        <h3 style={{ fontSize: '26px', fontWeight: 'bold', paddingBottom: '20px' }}>Laptops</h3>
      </div>

      <div className="smartphoneList">
        {displayedSmartphones.map(smartphone => (
          <div key={smartphone._id} className="smartphoneCard">
            <div>
              <img
                          src={`http://localhost:3000/uploads/${smartphone.imageUrl}`}
                          alt={smartphone.Name}
                          height={'140px'}
                          width={'200px'}
                          style={{ marginBottom: '20px'}}
                className="category-image"
              />
            </div>
            <div  className='SmartphoneDetails'>
                <div className='itemdetails' >
              <h3 style={{color:'#868282', fontSize:'20px' }}>{smartphone.itemName}</h3>
              <p>Price: ₹{smartphone.itemPrice}</p> </div>
            </div>

            <div className="button-container">
             
             <div style={{marginTop:'20px', marginLeft:'30px'}}> <button className="buy-now-button">Buy Now</button></div>
              <p style={{ marginTop:'21px', fontSize:'13px', marginLeft:'12px', color:'#777171' }} >More Info</p>
            </div>
          </div>
        ))}
      </div>


      <div className="arrow-container">
        <div className='prevArrow'>
        <div className={`arrow ${currentPage === 0 ? 'disabled' : ''}`} onClick={prevPage}>
          <span></span>
          <span></span>
          <span></span>
        </div></div>

        <div  className='prevNext'>
        <div  style={{transform:'rotate(-90deg)'}} className={`arrow ${endIndex >= smartphones.length ? 'disabled' : ''}`} onClick={nextPage}>
          <span></span>
          <span></span>
          <span></span>
        </div></div>
      </div>
    </div>
  );
};

export default AllLaptopComponent;
