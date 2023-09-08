import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { updateFormData, resetFormData } from "../../actions/brand_formActions";

import axios from "axios";

import "./BrandForm.css";

const BrandForm = () => {
  const formData = useSelector((state) => state.brand);

  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);

  const [imagePreview, setImagePreview] = useState(null);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      
      const response = await axios.get(
        "http://localhost:3000/getProductCategory"
      );

      setCategories(response.data);
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

      const brandData = new FormData();

      brandData.append("Name", formData.brandName);

      brandData.append("categoryid", formData.categoryid);

      brandData.append("imageUrl", formData.imageUrl);

      const brandResponse = await axios.post(
        "http://localhost:3000/addbrand",
        brandData,
        window.alert("Brand added successfully"),
        window.location.reload()
      );

      if (brandResponse.data.msg === "Brand created successfully") {
        console.log("Brand created successfully");

        dispatch(resetFormData());

        setIsSubmitted(true);

        setImagePreview(null);

        setTimeout(() => {
          setIsSubmitted(false);

          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const validateForm = () => {
    const { brandName, categoryid, imageUrl } = formData;

    if (!brandName) {
      setError("Brand name is required.");

      return false;
    }

    if (!categoryid) {
      setError("Category is required.");

      return false;
    }

    if (!imageUrl) {
      setError("Image is required.");

      return false;
    }

    setError("");

    return true;
  };

  return (
    <div className="brand-form-container">
      <div className="brand-form">
        <div className="brand-form-header">
          <h2>Add Product Brand</h2>
        </div>

        <form onSubmit={handleSubmit}>
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

              {categories.length > 0 &&
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.category_name}
                  </option>
                ))}
            </select>
          </div>

          {error && <p className="brand-error">{error}</p>}

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

          <div className="brand-form-group">
            <button
              type="submit"
              onClick={handleSubmit}
              className="brand-button"
            >
              Add Brand
            </button>
          </div>

          {isSubmitted && <p>Brand has been submitted!</p>}
        </form>
      </div>
    </div>
  );
};

export default BrandForm;
