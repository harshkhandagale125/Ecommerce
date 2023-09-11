
import React, { useState, useEffect } from "react";

import axios from "axios";

import { useNavigate, Link } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";

import EditIcon from "@mui/icons-material/Edit";

import Button from "@mui/material/Button";

 

const CategoryTable = () => {

  const [categories, setCategories] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const categoriesPerPage = 4;

  const navigate = useNavigate();

 

  useEffect(() => {

    fetchCategories();

  }, [currentPage]);

 

  const fetchCategories = async () => {

    try {

      const response = await axios.get("http://localhost:3000/getProductCategory");

      setCategories(response.data);

    } catch (error) {

      console.error("API Error:", error);

    }

  };

 

  const handleDelete = async (categoryId) => {

    try {

      await axios.delete(`http://localhost:3000/deleteProductCategory/${categoryId}`);

      fetchCategories();

    } catch (error) {

      console.error("Delete Error:", error);

    }

  };

 

  const lastIndex = currentPage * categoriesPerPage;

  const firstIndex = lastIndex - categoriesPerPage;

  const currentCategories = categories.slice(firstIndex, lastIndex);

 

  const goToPreviousPage = () => {

    if (currentPage > 1) {

      setCurrentPage(currentPage - 1);

    }

  };

 

  const goToNextPage = () => {

    if (currentPage < Math.ceil(categories.length / categoriesPerPage)) {

      setCurrentPage(currentPage + 1);

    }

  };

 

  return (

    <div>

      <h2 align="center">

        <b>CATEGORY TABLE</b>

      </h2>

      <div  style={{

          display: "flex",

          justifyContent: "flex-end",

          marginBottom: "10px",

        }}>

        <Button variant="contained" style={{ backgroundColor: "#FF4F04", color: "white" }} component={Link} to="/addcategory">

          Add New Category

        </Button>

      </div>

      <div className="table">

        <table>

          <thead>

            <tr>

              {/* <th>Category Image</th> */}

              <th>Category Name</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {currentCategories.map((category) => (

              <tr key={category._id}>

                {/* <td>

                  {category.category_image && (

                    <img src={`path_to_your_image_directory/${category.category_image}`} alt="Category Image" width="100" height="100" />

                  )}

                </td> */}

                <td>{category.category_name}</td>

                <td>

                  <Button onClick={() => handleDelete(category._id)}>

                    <DeleteIcon color="action" />

                  </Button>

                  <Button component={Link} to={`/updatecategory/${category._id}`}>

                    <EditIcon color="action" />

                  </Button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>

        <Button onClick={goToPreviousPage} disabled={currentPage === 1} style={{ color: "black", border: "1px solid #FF4F04" }}>

          Previous

        </Button>

        {Array.from({ length: Math.ceil(categories.length / categoriesPerPage) }).map((_, index) => (

          <div key={index}>

            <Button

              onClick={() => setCurrentPage(index + 1)}

              style={{

                backgroundColor: currentPage === index + 1 ? "#FF4F04" : "transparent",

                color: currentPage === index + 1 ? "white" : "black",

              }}

              disabled={index + 1 === currentPage}

            >

              {index + 1}

            </Button>

          </div>

        ))}

        <Button onClick={goToNextPage} disabled={currentPage === Math.ceil(categories.length / categoriesPerPage)} style={{ color: "black", border: "1px solid #FF4F04" }}>

          Next

        </Button>

      </div>

    </div>

  );

};

 

export default CategoryTable;

 