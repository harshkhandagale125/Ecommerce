import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { updateFormData, resetFormData } from "../../actions/brand_formActions";

import axios from "axios";

import "./BrandForm.css"; // Make sure to include your updated CSS file

const UpdateBrand = () => {
  const formData = useSelector((state) => state.brand);

  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);

  const [imagePreview, setImagePreview] = useState(formData.imageUrl || null);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();

    fetchBrandData();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/getProductCategory"
      );

      setCategories(response.data); // Adjust the response structure based on your API
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBrandData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/getBrand/${formData.brandId}`
      );

      const brandData = response.data.data; // Adjust the response structure based on your API

      // Update form data with fetched brand data

      dispatch(updateFormData("brandName", brandData.Name));

      dispatch(updateFormData("categoryid", brandData.categoryid));

      // Set imagePreview if an image exists

      setImagePreview(brandData.imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryChange = (e) => {
    const categoryid = e.target.value;

    dispatch(updateFormData("categoryid", categoryid));
  };

  const handleBrandNameChange = (e) => {
    const brandName = e.target.value;

    dispatch(updateFormData("brandName", brandName));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    dispatch(updateFormData("imageUrl", imageFile));

    // Display image preview

    if (imageFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };

      reader.readAsDataURL(imageFile);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!validateForm()) {
        return;
      }

      const formDataToUpdate = new FormData();

      formDataToUpdate.append("Name", formData.brandName);

      formDataToUpdate.append("categoryid", formData.categoryid);

      formDataToUpdate.append("imageFile", formData.imageUrl);

      const brandResponse = await axios.put(
        `http://localhost:3000/updatebrand/${formData.brandId}`,

        formDataToUpdate
      );

      if (brandResponse.data.message === "Brand updated successfully") {
        console.log("Brand updated successfully");

        dispatch(resetFormData());

        setIsSubmitted(true);

        setImagePreview(null);

        setTimeout(() => {
          setIsSubmitted(false);

          // Redirect or handle update completion as needed
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const validateForm = () => {
    const { brandName, categoryid, imageUrl } = formData;

    if (!brandName || !categoryid || !imageUrl) {
      setError("All fields are required.");

      return false;
    }

    setError("");

    return true;
  };

  return (
    <div className="brand-form-container">
      <div className="brand-form">
        <div className="brand-form-header">
          <h2>Update Product Brand</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="left-container">
            <div className="brand-form-group">
              <label className="brand-label">Brand Name:</label>

              <input
                type="text"
                name="brandName"
                value={formData.brandName || ""}
                onChange={handleBrandNameChange}
                className="brand-input"
              />
            </div>

            <div className="brand-form-group">
              <label className="brand-label">Category:</label>

              <select
                name="categoryid"
                value={formData.categoryid}
                onChange={handleCategoryChange}
                className="brand-select"
              >
                <option value="">Select Category</option>

                {categories &&
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.category_name}
                    </option>
                  ))}
              </select>
            </div>

            {error && <p className="brand-error">{error}</p>}
          </div>

          <div className="right-container">
            <div className="brand-form-group">
              <label className="brand-label">Product Image:</label>

              <div className="brand-image-preview">
                {imagePreview && <img src={imagePreview} alt="Image Preview" />}
              </div>

              <div className="brand-choose-file">
                <label htmlFor="brand-imageFile">Choose File:</label>

                <input
                  type="file"
                  name="brand-imageFile"
                  id="brand-imageFile"
                  onChange={handleImageChange}
                  className="brand-input"
                />
              </div>
            </div>
          </div>

          <div className="brand-form-group">
            <button
              type="submit"
              onClick={handleSubmit}
              className="brand-button"
            >
              Update Brand
            </button>
          </div>

          {isSubmitted && <p>Brand has been updated!</p>}
        </form>
      </div>
    </div>
  );
};

export default UpdateBrand;
