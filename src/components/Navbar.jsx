import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import '../components/Navbar.css';
import '../components/Homepage.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState('');
  const token = localStorage.getItem('token'); // Get the token from localStorage

  useEffect(() => {
    if (token) {
      // If token is available, set it in axios headers and decode the role
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const decodedToken = jwt_decode(token);
      const role = decodedToken.role;
      console.log('Role: ' + role);
      setUserRole(role);
    }
  }, [token]); // Watch for changes in the token

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];

    navigate('/login');
  };

  const login = () => {
    navigate('/login');
  }

  // Define navigation titles based on user role and token presence
  const navigationTitles = token
    ? userRole === 'admin'
      ? [
          { title: 'Home', path: '/Homepage' },
          { title: 'Brands', path: '/products' },
          { title: 'Smartphones', path: '/AllSmartphoneComponent' },
          { title: 'Laptop', path: '/AllLaptopComponent' },
          { title: 'User Management', path: '/admin-dashboard' },
          { title: 'Add Category', path: '/addcategory' },
          { title: 'Add Brands', path: '/addbrand' },
          { title: 'Add Product', path: '/newItem' },
        ]
      : [
          { title: 'Home', path: '/Homepage' },
          { title: 'Brands', path: '/products' },
          { title: 'Smartphones', path: '/AllSmartphoneComponent' },
          { title: 'Laptop', path: '/AllLaptopComponent' },
        ]
    : [
          { title: 'Home', path: '/Homepage' },
          { title: 'Brands', path: '/products' },
          { title: 'Smartphones', path: '/AllSmartphoneComponent' },
          { title: 'Laptop', path: '/AllLaptopComponent' },
        ];

  return (
    <div>
      <div className="mainNavbar">
        <div className="navbarItems" onClick={() => navigate('/Homepage')} style={{ cursor: 'pointer' }}>
          ECommerce Application
        </div>
        <div className="icon-container">
          {token && userRole && ( // Render the cart icon only if both token and userRole are available
            <div className="icon">
              <div onClick={() => navigate('/cart')}>
                <i className="fa-solid fa-cart-shopping fa-xs"></i>
              </div>
            </div>
          )}
          <div className="icon" onClick={toggleDropdown}>
            <i className="fa-regular fa-user  fa-xs">&nbsp;</i>
            <i className="fa-solid fa-caret-down fa-2xs"></i>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {token && ( // Render the "Logout" option only if token is available
                  <div onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket fa-xs"></i>&nbsp;Logout
                  </div>
                )}
                {!token && userRole !== ' ' && ( // Render the "Login" option only if there is no token
                  <div onClick={login}>
                    <i className="fa-solid fa-lock fa-xs"></i>&nbsp;Login
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="navigateTitles">
        {navigationTitles.map(({ title, path }) => (
          <div className="titleNames" key={title}>
            <Link to={path} className="custom-link" activeClassName="activelink">{title}</Link> {/* Use Link component for navigation */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
