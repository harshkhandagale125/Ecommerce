import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/AllSmartphoneComponent.css';

const AllLaptopComponent = () => {
  const [laptops, setLaptops] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [addedToCart, setAddedToCart] = useState({}); // Track added products
  const itemsPerPage = 3;

  useEffect(() => {
    // Fetch laptops using Axios
    axios
      .get('http://localhost:3000/getItemLaptop')
      .then(response => setLaptops(response.data.data.Laptop))
      .catch(error => console.error('Error fetching laptops:', error));
  }, []);

  const addToCart = (productId) => {
    // Send a POST request to add the product to the cart
    axios
      .post('http://localhost:3000/addToCart', {
        productId: productId,
        quantity: 1, // You can change the quantity as needed
      })
      .then(response => {
        // Handle the response, e.g., show a success message
        console.log('Product added to cart:', response.data);
        // Mark the product as added in cart
        setAddedToCart(prevState => ({
          ...prevState,
          [productId]: true,
        }));
      })
      .catch(error => {
        // Handle errors, e.g., show an error message
        console.error('Error adding product to cart:', error);
      });
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedLaptops = laptops.slice(startIndex, endIndex);

  return (
    <div className="AllsmartphoneContainer">
      <div className="CategoryTag" style={{ marginLeft: '94px' }}>
        {' '}
        <h3 style={{ fontSize: '26px', fontWeight: 'bold', paddingBottom: '20px' }}>Laptops</h3>
      </div>

      <div className="smartphoneList">
        {displayedLaptops.map(laptop => (
          <div key={laptop._id} className="smartphoneCard">
            <div>
              <img
                src={`http://localhost:3000${laptop.imageUrl}`}
                alt={laptop.Name}
                height={'140px'}
                width={'200px'}
                style={{ marginBottom: '20px'}}
                className="category-image"
              />
            </div>
            <div className='SmartphoneDetails'>
              <div className='itemdetails'>
                <h3 style={{ color: '#868282', fontSize: '20px' }}>{laptop.itemName}</h3>
                <p>Price: ₹{laptop.itemPrice}</p>
              </div>
            </div>

            <div className="button-container">
              <div style={{ marginTop: '20px', marginLeft: '30px' }}>
                {addedToCart[laptop._id] ? (
                  <button className="added-in-cart-button">Added in Cart</button>
                ) : (
                  <button className="buy-now-button" onClick={() => addToCart(laptop._id)}>Add to Cart</button>
                )}
              </div>
              <p style={{ marginTop: '21px', fontSize: '13px', marginLeft: '12px', color: '#777171' }}>More Info</p>
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
          </div>
        </div>

        <div className='prevNext'>
          <div style={{ transform: 'rotate(-90deg)' }} className={`arrow ${endIndex >= laptops.length ? 'disabled' : ''}`} onClick={nextPage}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllLaptopComponent;
