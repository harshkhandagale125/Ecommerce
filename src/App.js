import React from "react";
import { Provider } from "react-redux";
import store from "./store"; // Update the path to your store
import ProductForm from "./components/productForm"; // Correct the casing
import ProductTable from "./components/ProductTable";
import Layout from "./components/Layout";
import AddItem from "./components/addItem";
import ItemList from "./components/ViewItem";
import OrderSuccessMessage from "./components/OrderSuccessMessage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// SANKET
import Login from "./components/login/login";
import Register from "./components/register/register";
import AdminDashBoard from "./components/admin-dashboard/admin-dashboard";
import SendEmailVerification from "./components/forgot-password/send-email";
import ForgotPassword from "./components/forgot-password/forgot-password";




// SARTHAK

import Homepage from "./components/Homepage";
import Cart from "./components/Cart";
import OrdersComponent from "./components/OrderComponent";
import AllSmartphoneComponent from "./components/AllSmartphoneComponent";
import AllLaptopComponent from "./components/AllLaptopComponent";




//Parth
import BrandList from './components/addbrand/BrandList';
import BrandForm from './components/addbrand/BrandForm';
import CategoryForm from './components/addcategories/CategoryForm';
import CategoryTable from './components/addcategories/CategoryList';
import ViewProducts from './components/ProductPage/ProductPage';
import UpdateCategory from './components/addcategories/updatecategory';
import UpdateBrand from './components/addbrand/updatebrand';



// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
        <Provider store={store}>

        <div className="App">
          <Routes>
            {/* HARSH */}
            <Route path="/add/:id" element={<Layout><ProductForm /></Layout>} />
            <Route path="/newItem" element={<Layout><AddItem /></Layout>} />
            <Route path="/productTable" element={<Layout><ProductTable /></Layout>} />
            <Route path="/viewItem/:itemId" element={<Layout><ItemList /></Layout>} />

            {/* SANKET */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-dashboard" element={<Layout><AdminDashBoard /></Layout>} />
            <Route path="/send-mail" element={<SendEmailVerification />} />
            <Route path="/reset-password" element={<ForgotPassword />} />
            

            {/* SARTHAK */}
            <Route path="/" element={<Login/>} />
            <Route path="/Homepage" element={<Layout><Homepage /></Layout>} />
            <Route path="/cart" element={<Layout><Cart /></Layout>} />
            <Route path="/OrderSuccessFull" element={<Layout><OrderSuccessMessage /></Layout>} />
            <Route path="/Orders" element={<Layout><OrdersComponent /></Layout>} />
            <Route path="/AllSmartphoneComponent" element={<Layout><AllSmartphoneComponent /></Layout>} />
            <Route path="/AllLaptopComponent" element={<Layout><AllLaptopComponent /></Layout>} />



                    {/* Parth */}
            <Route path='/addbrand' element={<Layout><BrandForm /></Layout>}>    </Route> 
            <Route path='/brandlist' element={<Layout><BrandList /></Layout>}></Route> 
            <Route path='/addcategory' element={<Layout><CategoryForm /></Layout>}></Route> 
            <Route path='/categorylist' element={<Layout><CategoryTable /></Layout>}></Route> 
            <Route path='/products' element={<Layout><ViewProducts /></Layout>}></Route> 
            <Route path='/updatecategory/:id' element={<Layout><UpdateCategory /></Layout>}></Route> 
            <Route path='/updatebrand/:id' element={<Layout><UpdateBrand /></Layout>}></Route> 
            


          </Routes>

        </div>

      </Provider>
    </Router>
  );
}

export default App;
