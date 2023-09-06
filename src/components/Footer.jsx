import React from 'react';
import '../components/Footer.css'; // Import your CSS file

const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer-content">
      <div className="footer-links">
        <div className="footer-link">
          <h4>Contact Us</h4>
          <p>Address : Pune </p>
          <p>Call us  : 1234567890 </p>
          <p>Email : contact@harbinger.com </p>
        </div>
        <div className="footer-link">
          <h4>Our Shops</h4>
          <ul>
            <li>Product support</li>
            <li>PC Setup</li>
            <li>Services</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className="footer-link">
          <h4>Help</h4>
          <ul>
            <li>Payments</li>
            <li>Shipping</li>
            <li>Cancellations </li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="footer-link">
          <h4>Brands</h4>
          <ul>
            <li>Apple</li>
            <li>Samsung</li>
            <li>Asus </li>
            <li>Mi</li>
          </ul>
        </div>
        
       
      </div>
      <div className="social-icons">
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-linkedin-in"></i></a>
      </div>
    </div>
    <div className="footer-bottom">
      <p  style={{marginBottom:'0%', paddingBottom:'2px'}}>&copy; Ecommerce 2023,rights.</p>
    </div>
  </footer>
  );
}

export default Footer;
