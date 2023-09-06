import React, { useState, useEffect } from "react";

import axios from "axios";

  import { updateFormData } from "../actions/formActions";

import { useSelector, useDispatch } from "react-redux";

import "../addItem.css";

 

const AddItem = () => {

  const formData = useSelector((state) => state.form);

  const dispatch = useDispatch();

  const [itemName, setItemName] = useState("");

  const [itemPrice, setItemPrice] = useState("");

  const [itemColor, setItemColor] = useState("");

  const [itemSpecs, setItemSpecs] = useState("");

  const [selectedBrand, setSelectedBrand] = useState("");

  const [brands, setBrands] = useState([]);

  const [categories, setCategories] = useState([]);

  const [itemStock, setItemStock] = useState("");

  const [image, setImage] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [categoryBrands, setCategoryBrands] = useState([]);

 

  useEffect(() => {

    fetchBrandsByCategory();

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

 

  const handleChange = (e) => {

    const { name, value } = e.target;

    dispatch(updateFormData(name, value));

  };

 

  const fetchBrands = async () => {

    try {

      const response = await axios.get("http://localhost:3000/brands"); // Replace with your actual API endpoint

      setBrands(response.data.data); // Assuming the response contains an array of brand objects

    } catch (error) {

      console.error("Error fetching brands:", error);

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

 

  const resetForm = () => {

    setItemName("");

    setItemPrice("");

    setItemColor("");

    setItemSpecs("");

    setSelectedBrand("");

    setItemStock("");

    setImage(null);

    setImagePreview(null);

  };

 

  const handleImageChange = (event) => {

    const selectedImage = event.target.files[0];

    setImage(selectedImage);

 

    if (selectedImage) {

      const reader = new FileReader();

      reader.onload = (e) => {

        setImagePreview(e.target.result);

      };

      reader.readAsDataURL(selectedImage);

    }

  };

 

  const handleCancel = () => {

    setImage(null);

    setImagePreview(null);

  };

 

  const handleSubmit = async (event) => {

    event.preventDefault();

    console.log("Submit button clicked");

 

    const formData = new FormData();

    formData.append("itemImage", image);

    formData.append("itemName", itemName);

    formData.append("itemPrice", itemPrice);

    formData.append("itemColor", itemColor);

    formData.append("itemSpecs", itemSpecs);

    formData.append("BrandId", selectedBrand);

    formData.append("itemStock", itemStock);

 

    try {

      const response = await axios.post(

        "http://localhost:3000/addItem",

        formData

      );

      resetForm();

      window.alert("Submitted");

      window.location.reload();

    } catch (error) {

      console.error("Error adding item:", error);

    }

  };

 

  return (

    <div className="custom-add-item-container">

      <div className="custom-formContainer">

        <div className="custom-leftContainer">

          <form onSubmit={handleSubmit} className="custom-add-item-form">

            <div className="custom-input-group">

              <label>Product Name</label>

              <input

                type="text"

                placeholder="Item Name"

                onChange={(e) => setItemName(e.target.value)}

              />

            </div>

            <div className="custom-input-group">

              <label>Description</label>

              <textarea

                placeholder="Item Specs"

                onChange={(e) => setItemSpecs(e.target.value)}

              />

            </div>

            <div className="custom-input-group">

              <label>Category</label>

              {/* <select

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

              <select

                name="categoryId"

                value={selectedCategory}

                onChange={(e) => {

                  setSelectedCategory(e.target.value);

                  fetchBrandsByCategory(e.target.value);

                }}

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

            <div className="custom-input-group">

              <label>Brand</label>

              {/* <select

              value={selectedBrand}

              onChange={(e) => setSelectedBrand(e.target.value)}

            >

              <option value="">Select Brand</option>

              {brands.map((brand) => (

                <option key={brand._id} value={brand._id}>

                  {brand.Name}

                </option>

              ))}

            </select> */}

 

              <select

                value={selectedBrand}

                onChange={(e) => setSelectedBrand(e.target.value)}

              >

                <option value="">Select Brand</option>

                {categoryBrands.map((brand) => (

                  <option key={brand._id} value={brand._id}>

                    {brand.Name}

                  </option>

                ))}

              </select>

            </div>

            <div className="custom-input-group">

              <label>Color</label>

              <input

                type="text"

                placeholder="Item Color"

                onChange={(e) => setItemColor(e.target.value)}

              />

            </div>

          </form>

        </div>

 

        <div className="custom-rightContainer">

          <form onSubmit={handleSubmit}>

            <div className="custom-input-group">

              <label>Price</label>

              <input

                type="number"

                placeholder="Item Price"

                onChange={(e) => setItemPrice(e.target.value)}

              />

            </div>

            <div className="custom-input-group">

              <label>Stock</label>

              <input

                type="number"

                placeholder="Item Stock"

                onChange={(e) => setItemStock(e.target.value)}

              />

            </div>

            <div className="custom-input-group">

              <label>Image</label>

              <input

                type="file"

                accept="image/*"

                onChange={handleImageChange}

              />

            </div>

            {imagePreview && (

              <div className="custom-image-preview">

                <img src={imagePreview} alt="Item Preview" />

              </div>

            )}

            <div className="imgButtons">

              <div>

                <button type="button" onClick={handleCancel} className="custom-button">

                  Cancel

                </button>

              </div>

 

              <div>

                <button type="submit"  className="custom-button">Add Item</button>

              </div>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

};

 

export default AddItem;