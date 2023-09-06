import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../productForm.css";
import {
  updateFormData,
  resetFormData,
  updateItem,
} from "../actions/formActions";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ProductForm = () => {
  const formData = useSelector((state) => state.form);
  const dispatch = useDispatch();
  // const [categories, setCategories] = useState([]);
  // const [brands, setBrands] = useState([]);
  // const [itemSpecs, setItemSpecs] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryBrands, setCategoryBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const location = useLocation();
  // const { productToUpdate } = location.state || {};
  const productToUpdate = location.state.productToUpdate;
  const [previewImage, setPreviewImage] = useState(null);

  // useEffect(() => {
  //   fetchCategories();
  //   fetchBrands();
  // }, []);
  useEffect(() => {
    fetchBrandsByCategory();
    fetchCategories();
    // Set initial form data if productToUpdate exists
    if (productToUpdate) {
      const { itemName, itemPrice, itemColor, itemSpecs, itemStock, imageUrl } =
        productToUpdate;
      dispatch(updateFormData("itemName", itemName));
      dispatch(
        updateFormData("itemPrice", itemPrice ? itemPrice.toString() : "")
      );
      dispatch(updateFormData("itemColor", itemColor));
      dispatch(updateFormData("itemSpecs", itemSpecs));

      // dispatch(updateFormData('BrandId', BrandId));

      dispatch(
        updateFormData("itemStock", itemStock ? itemStock.toString() : "")
      );
      dispatch(updateFormData("imageUrl", imageUrl));
    }
  }, [dispatch, productToUpdate]);

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

  const fetchBrandsByCategory = async (categoryId) => {
    try {
      console.log("Fetching brands for category:", categoryId);
      const response = await axios.get(
        `http://localhost:3000/getBrandById/${categoryId}`
      );
      // console.log("Response from API:", response.data);
      setCategoryBrands(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };
  // const fetchBrands = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3000/brands');
  //     setBrands(response.data.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;

      if (productToUpdate) {
        // If productToUpdate exists, it's an update operation
        response = await axios.put("http://localhost:3000/updateItem", {
          id: productToUpdate._id,
          // ...formData,
          itemName: formData.itemName,
          itemPrice: formData.itemPrice,
          itemColor: formData.itemColor,
          // BrandId: formData.BrandId,
          // categoryId: formData.categoryId,
          itemStock: formData.itemStock,
          itemImage: formData.imageFile,
          itemSpecs: formData.itemSpecs,
        });

        console.log("res",response)
      } else {
        // If productToUpdate doesn't exist, it's an add operation
        response = await axios.post("http://localhost:3000/addItem", formData);
      }

      console.log("form",formData);
      dispatch(resetFormData()); // Reset the form after successful submission
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData(name, value));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    dispatch(updateFormData("itemImage", imageFile));
    // Display preview of the selected image
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div className="add-item-container">
      <div className="formContainer">
        {/* <h2>Update Product Item</h2> */}
        <div className="leftContainer">
          <form onSubmit={handleSubmit} className="add-item-form">
            <div className="input-group">
              <label>Item Name:</label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Item Price:</label>
              <input
                type="number"
                name="itemPrice"
                value={formData.itemPrice}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Item Color:</label>
              <input
                type="text"
                name="itemColor"
                value={formData.itemColor}
                onChange={handleChange}
              />
            </div>

            {/* <label>Category:</label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category_name}
              </option>
          ))}
        </select> */}

            {/* <label>Brand:</label>
        <select name="BrandId" value={formData.BrandId} onChange={handleChange}>
        <option value="">Select Brand</option>
          {brands.length > 0 &&
            brands.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.Name}
              </option>
          ))}
        </select> */}
            <div className="input-group">
              <label>Description</label>
              <textarea
                placeholder="Item Specs"
                value={formData.itemSpecs}
                name="itemSpecs"
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Item Stock:</label>
              <input
                type="number"
                name="itemStock"
                value={formData.itemStock}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>

        <div className="rightContainer">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Image:</label>
              <input
                type="file"
                name="imageFile"
                onChange={handleImageChange}
              />
            </div>
            <div className="rightcontainer">
              {previewImage && (
                <div>
                  <h3>Image Preview</h3>
                  <img
                    src={previewImage}
                    alt="Image Preview"
                    style={{ maxWidth: "300px" }}
                  />
                </div>
              )}
            </div>
            <button type="submit">Add Item</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
