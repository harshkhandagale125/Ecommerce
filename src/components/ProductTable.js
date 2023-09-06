// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import EditIcon from '@mui/icons-material/Edit';
// import '../ProductTable.css'
// const ProductTable = () => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/getItemWithCategory');
//       console.log(response.data.data)
//       setProducts(response.data.data); // Assuming the products array is in response.data.data
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // delete and update functionality
//     const handleDelete = async (productId) => {
//       try {
//         console.log('Deleting product with ID:', productId);
//         // Send DELETE request to delete product with productId
//         await axios.delete(`http://localhost:3000/deleteItem/${productId}`);
//         console.log('Product deleted:', productId);

//         // Fetch updated list of products
//         fetchProducts();
//       } catch (error) {
//         console.error(error);
//       }
//     };

//   const handleUpdate = (product) => {
//     // Navigate to ProductForm with pre-filled data
//     navigate('/add', { state: { productToUpdate: product } });
//   };

//   return (
//     <div >
//       <h2>Products List</h2>
//       <div className='table'>
//       <table>
//         <thead>
//           <tr>
//             <th>Item Name</th>
//             <th>Category</th>
//             <th>Brand</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody className='tableBody'>
//           {products.map((product) => (
//             <tr key={product._id}>
//               <td>{product.itemName}</td>
//               <td>{product.BrandId?.categoryid.category_name}</td>
//               <td>{product.BrandId?.Name}</td>
//               <td>
//                 {/* <Stack > */}
//                 <Button onClick={() => handleUpdate(product)}><EditIcon color='action'/></Button>
//                 <Button onClick={() => handleDelete(product._id)}><DeleteIcon color='action'/></Button>
                
                
//                 {/* </Stack> */}
//               </td>
//             </tr>
//           ))} 
//         </tbody>
//       </table>
//       </div>
//     </div>
//   );
// };

// export default ProductTable;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import '../ProductTable.css';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getItemWithCategory');
      console.log(response.data.data);
      setProducts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      console.log('Deleting product with ID:', productId);
      await axios.delete(`http://localhost:3000/deleteItem/${productId}`);
      console.log('Product deleted:', productId);

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (product) => {
    navigate(`/add/${product._id}`, { state: { productToUpdate: product } });
  };

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = products.slice(firstIndex, lastIndex);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <h2>Products List</h2>
      <div className='table'>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='tableBody'>
            {currentProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.itemName}</td>
                <td>{product.BrandId?.categoryid.category_name}</td>
                <td>{product.BrandId?.Name}</td>
                <td>
                  <Button onClick={() => handleUpdate(product)}>
                    <EditIcon color='action' />
                  </Button>
                  <Button onClick={() => handleDelete(product._id)}>
                    <DeleteIcon color='action' />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button onClick={goToPreviousPage} disabled={currentPage === 1}
        style={{ color: 'black',border: '1px solid #FF4F04' }}>
          Previous
        </Button>
        {Array.from({ length: Math.ceil(products.length / productsPerPage)}).map((_, index) => (
  <div key={index}>
    <Button
      onClick={() => setCurrentPage(index + 1)}
      style={{ backgroundColor: currentPage === index + 1 ? '#FF4F04' : 'transparent',
      color: currentPage === index + 1 ? 'white' : 'black'}}     
      disabled={index + 1 === currentPage}>
      {index + 1}
    </Button>
  </div>
))}
        <Button
          onClick={goToNextPage}
          disabled={currentPage === Math.ceil(products.length / productsPerPage)}
          style={{ color: 'black',border: '1px solid #FF4F04'}}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductTable;
