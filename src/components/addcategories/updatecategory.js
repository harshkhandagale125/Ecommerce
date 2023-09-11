
import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { useParams } from 'react-router-dom';

 

const UpdateCategory = () => {

  const { id } = useParams();

  const [categoryName, setCategoryName] = useState('');

  const [selectedImage, setSelectedImage] = useState(null);

  const [error, setError] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);

 

  useEffect(() => {

    fetchCategory();

  }, [id]);

 

  const fetchCategory = async () => {

    try {

      const response = await axios.get(`http://localhost:3000/getProductCategory/${id}`);

      setCategoryName(response.data.category_name);

    } catch (error) {

      console.error('API Error:', error);

    }

  };

 

  const handleUpdateCategory = async () => {

    try {

      setError(null);

      setSuccessMessage(null);

 

      const formData = new FormData();

      formData.append('category_name', categoryName);

 

      if (selectedImage) {

        formData.append('category_image', selectedImage);

      }

 

      await axios.put(`http://localhost:3000/updateProductCategory/${id}`, formData, {

        headers: {

          'Content-Type': 'multipart/form-data',

        },

      });

 

      setSuccessMessage('Category updated successfully!');

    } catch (error) {

      setError('An error occurred while updating the category. Please try again.');

      console.error('Update Category Error:', error);

    }

  };

 

  const handleImageSelect = (e) => {

    const file = e.target.files[0];

    setSelectedImage(file);

  };

 

  return (

    <div className="add-category-container">

      <h2>Update Category</h2>

      <form className="add-category-form">

        <div className="input-group">

          <label htmlFor="categoryName">Category Name:</label>

          <input

            type="text"

            id="categoryName"

            value={categoryName}

            onChange={(e) => setCategoryName(e.target.value)}

          />

        </div>

 

        <div className="input-group">

          <label htmlFor="category_image">Upload New Category Image:</label>

          <input

            type="file"

            id="category_image"

            accept="image/*"

            onChange={handleImageSelect}

          />

        </div>

 

        <button type="button" onClick={handleUpdateCategory} className="orange-button">

          Update Category

        </button>

 

        {error && <p className="error-message">{error}</p>}

        {successMessage && <p className="success-message">{successMessage}</p>}

      </form>

    </div>

  );

};

 

export default UpdateCategory;

 