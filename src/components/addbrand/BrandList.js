
import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';

import EditIcon from '@mui/icons-material/Edit';

import Button from '@mui/material/Button';

import './BrandTable.css';

 

const BrandTable = () => {

  const [brands, setBrands] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const brandsPerPage = 4;

  const navigate = useNavigate();

 

  useEffect(() => {

    fetchBrands();

  }, [currentPage]);

 

  const fetchBrands = async () => {

    try {

      const response = await axios.get('http://localhost:3000/brands');

      setBrands(response.data.data);

    } catch (error) {

      console.error(error);

    }

  };

 

  const handleDelete = async (brandId) => {

    try {

      await axios.delete(`http://localhost:3000/deletebrand/${brandId}`);

      fetchBrands();

    } catch (error) {

      console.error(error);

    }

  };

 

  const handleUpdate = (brandId) => {

    navigate(`/updatebrand/${brandId}`);

  };

 

  const lastIndex = currentPage * brandsPerPage;

  const firstIndex = lastIndex - brandsPerPage;

  const currentBrands = brands.slice(firstIndex, lastIndex);

 

  const goToPreviousPage = () => {

    if (currentPage > 1) {

      setCurrentPage(currentPage - 1);

    }

  };

 

  const goToNextPage = () => {

    if (currentPage < Math.ceil(brands.length / brandsPerPage)) {

      setCurrentPage(currentPage + 1);

    }

  };

 

  return (

    <div>

      <h2 align="center"><b>Brands List</b></h2>

      <div

      style={{

          display: "flex",

          justifyContent: "flex-end",

          marginBottom: "10px",

        }}

        >

        <Button

          variant="contained"

          style={{ backgroundColor: "#FF4F04", color: "white" }}

          onClick={() => navigate('/addbrand')}

        >

          Add New Brand

        </Button>

      </div>

      <div className='table'>

        <table>

          <thead>

            <tr>

              <th>Brand Name</th>

              {/* <th>Category</th> */}

              <th>Actions</th>

            </tr>

          </thead>

          <tbody className='tableBody'>

            {currentBrands.map((brand) => (

              <tr key={brand._id}>

                <td>{brand.Name}</td>

                {/* <td>{brand.categoryid?.category_name}</td> */}

                <td>

                  <Button onClick={() => handleUpdate(brand._id)}>

                    <EditIcon color='action' />

                  </Button>

                  <Button onClick={() => handleDelete(brand._id)}>

                    <DeleteIcon color='action' />

                  </Button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>

        <Button onClick={goToPreviousPage} disabled={currentPage === 1} style={{ color: 'black', border: '1px solid #FF4F04' }}>

          Previous

        </Button>

        {Array.from({ length: Math.ceil(brands.length / brandsPerPage) }).map((_, index) => (

          <div key={index}>

            <Button

              onClick={() => setCurrentPage(index + 1)}

              style={{ backgroundColor: currentPage === index + 1 ? '#FF4F04' : 'transparent', color: currentPage === index + 1 ? 'white' : 'black' }}

              disabled={index + 1 === currentPage}>

              {index + 1}

            </Button>

          </div>

        ))}

        <Button onClick={goToNextPage} disabled={currentPage === Math.ceil(brands.length / brandsPerPage)} style={{ color: 'black', border: '1px solid #FF4F04' }}>

          Next

        </Button>

      </div>

    </div>

  );

};

 

export default BrandTable;

 