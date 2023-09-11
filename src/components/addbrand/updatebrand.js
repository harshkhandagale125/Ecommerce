
import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { updateFormData } from "../../actions/brand_formActions";

import axios from "axios";

import { useParams } from "react-router-dom";

import "./BrandForm.css";

 

const UpdateBrandForm = () => {

  const { brandId } = useParams();

  const formData = useSelector((state) => state.brand);

  const dispatch = useDispatch();

 

  const [categories, setCategories] = useState([]);

  const [imagePreview, setImagePreview] = useState(formData.imageUrl || null);

  const [error, setError] = useState("");

 

  useEffect(() => {

    console.log('formData.brandName:', formData.brandName);

    console.log('brandId:', brandId);

 

    fetchCategories();

    if (brandId) {

      fetchBrandData();

    }

  }, [brandId]);

 

  const fetchCategories = async () => {

    try {

      const response = await axios.get("http://localhost:3000/getProductCategory");

      setCategories(response.data);

    } catch (error) {

      console.error(error);

    }

  };

 

  const fetchBrandData = async () => {

    try {

      const response = await axios.get(`http://localhost:3000/getBrand/${brandId}`);

      const brandData = response.data.data;

 

      dispatch(updateFormData("brandName", brandData.Name));

      dispatch(updateFormData("categoryid", brandData.categoryid));

 

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

  dispatch(updateFormData("brandName", brandName)); // Ensure action.type is 'UPDATE_BRAND_FORM_DATA'

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

 

  const validateForm = () => {

    const { brandName, categoryid, imageUrl } = formData;

 

    if (!brandName || !categoryid || !imageUrl) {

      setError("All fields are required.");

      return false;

    }

 

    setError("");

    return true;

  };

 

  const handleSubmit = async (e) => {

    e.preventDefault();

    console.log("Submit button clicked");

 

    try {

      if (!validateForm()) {

        return;

      }

 

      const formDataToUpdate = new FormData();

      formDataToUpdate.append("Name", formData.brandName); // Use formData.brandName from Redux

      formDataToUpdate.append("categoryid", formData.categoryid); // Use formData.categoryid from Redux

      formDataToUpdate.append("imageUrl", formData.imageUrl); // Use formData.imageUrl from Redux

 

      if (!brandId) {

        console.error("brandId is not defined.");

        return;

      }

 

      const brandResponse = await axios.put(

        `http://localhost:3000/updatebrands/${brandId}`,

        formDataToUpdate

      );

 

      if (brandResponse.data.message === "Brand updated successfully") {

        console.log("Brand updated successfully");

 

        // Redirect to the desired route after update

        window.location.href = "/brands"; // Change to the route you want to redirect to

      }

    } catch (error) {

      console.error(error);

    }

  };

 

  return (

    <div className="brand-form-container">

      <div className="brand-form">

        <div className="brand-form-header">

          <h2>Update Product Brand</h2>

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

              {categories &&

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

              Update Brand

            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

 

export default UpdateBrandForm;

 