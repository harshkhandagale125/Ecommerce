import React, { useState } from 'react';
import axios from 'axios';
import './category.css'; // Import the CSS

const CategoryForm = () => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State to store image preview URL

  const handleAddCategory = async () => {
    try {
      
      setError(null); // Clear any previous errors
      setSuccessMessage(null); // Clear any previous success messages

      const formData = new FormData();
      formData.append('category_name', newCategoryName);
      formData.append('category_image', selectedImage);

      const response = await axios.post('http://localhost:3000/addProductCategory', formData);

      setNewCategoryName('');
      setSelectedImage(null);
      setImagePreview(null); // Clear the image preview
      setSuccessMessage('Category added successfully!');
    } catch (error) {
      setError('An error occurred while adding the category. Please try again.');
      console.error('Add Category Error:', error);
    }
  };

  // Function to handle image selection and display preview
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    // Create a URL for the image preview
    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);
  };

  return (
    <div className="add-category-container">
      <h2>Add Category</h2>

      <form className="add-category-form">
        <div className="input-group">
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="category_image">Category Image:</label>
          <input
            type="file"
            id="category_image"
            accept="image/*"
            onChange={handleImageSelect} // Call handleImageSelect when an image is selected
          />
        </div>

        {imagePreview && (
          <div className="image-preview-container">
            <img src={imagePreview} alt="Category Preview" className="image-preview" />
          </div>
        )}

        <button type="button" onClick={handleAddCategory} className="orange-button">
          Add Category
        </button>

        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default CategoryForm;