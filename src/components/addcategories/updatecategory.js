import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateCategory = () => {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null); // State to store the current category image
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/getProductCategory/${id}`);
      setCategoryName(response.data.category_name);

      // Set the current image URL (if available)
      if (response.data.category_image) {
        setCurrentImage(`http://localhost:3000/${response.data.category_image}`);
      }
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
  
      // Append the existing category_image field to retain the current image URL
      if (selectedImage) {
        formData.append('category_image', selectedImage);
      } else {
        // If no new image is selected, include the current image URL in the form data
        formData.append('category_image', currentImage);
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

    const previewURL = URL.createObjectURL(file);
    setCurrentImage(previewURL); // Update the current image preview
  };

  return (
    <div>
      <h2>Update Category</h2>
      <label>Category Name:</label>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <label>Current Category Image:</label>
      {currentImage && (
        <img src={currentImage} alt="Current Category" style={{ maxWidth: '200px' }} />
      )}
      <label>Upload New Category Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
      />

      {currentImage && (
        <div className="image-preview-container">
          <img src={currentImage} alt="Category Preview" className="image-preview" />
        </div>
      )}

      <button onClick={handleUpdateCategory}>Update Category</button>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default UpdateCategory;
