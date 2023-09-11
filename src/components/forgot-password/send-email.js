
import React, { useState } from 'react';
import axios from 'axios';
import './send-email.css'

const SendEmailVerification = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [otp, setOtp] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const sendEmail = async () => {
    try {
      const response = await axios.post('http://localhost:3000/send-email-otp', { email });

      if (response.status === 200) {
        setShowPopup(true);
      } else {
        setMessage(response.data.msg);
      }
    } catch (error) {
      console.error(error);
      setMessage('Internal server error');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/verify-otp', { email, otp });

      if (response.status === 200) {
        setMessage('OTP verification successful');
        localStorage.setItem('verificationEmail', email);
        window.location.href = '/reset-password';
      } else {
        setMessage(response.data.msg);
      }
    } catch (error) {
      console.error(error);
      setMessage('Internal server error');
    }
  };

  return (
    <div className="send-email-container">
      <section className="send-email-section">
        <div className="send-email-content">
          <div className="send-email-card">
            <div className="send-email-card-body">
              <h4 className="send-email-title">Send Email for Verification</h4>
              <div className="send-email-form">
                <label htmlFor="email" className="send-email-label">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your Email"
                  className="send-email-input"
                />
                <button className="send-email-button" onClick={sendEmail}>
                  Send
                </button>
                <p className="send-email-message">{message}</p>
              </div>

              {showPopup && (
                <div className="send-email-otp-popup">
                  <h4 className="send-email-title">Enter OTP</h4>
                  <div className="send-email-form">
                    <label htmlFor="otp" className="send-email-label">
                      OTP
                    </label>
                    <input
                      type="text"
                      name="otp"
                      id="otp"
                      value={otp}
                      onChange={handleOtpChange}
                      placeholder="Enter OTP"
                      className="send-email-input"
                    />
                    <button className="send-email-button" onClick={verifyOtp}>
                      Verify OTP
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SendEmailVerification;

