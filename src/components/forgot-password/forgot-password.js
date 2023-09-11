import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './forgot-password.css'

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Retrieve the email from localStorage
    const storedEmail = localStorage.getItem('verificationEmail');
    console.log(storedEmail);
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      // Make an API request to reset the password using Axios
      const response = await axios.post('http://localhost:3000/reset-password', { email, newPassword, confirmPassword });
      console.log(response);

      if (response.status === 200) {
        // Password reset successful, display a success message
        setMessage('Password reset successful. You can now log in with your new password.');
        window.location.href = '/login';
      } else {
        const data = response.data;
        setMessage(data.msg);
        window.location.href = '/login';
      }
    } catch (error) {
      console.error(error);
      setMessage('Internal server error');
    }
  };

  return (
    <div className="page-container"> {/* Container for the entire page */}
      <div className="reset-password-container">
        <h2>Reset Password</h2>

        <input type="password" placeholder="New Password" value={newPassword} onChange={handleNewPasswordChange} />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        <button onClick={resetPassword}>Reset</button>
        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default ResetPassword;
