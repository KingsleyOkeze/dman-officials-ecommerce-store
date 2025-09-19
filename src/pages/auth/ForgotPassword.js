import React, { useState } from 'react';
import axios from 'axios';
import "../../styles/pages-styles/auth-pages-styles/ForgotPassword.css";
import { useNavigate } from 'react-router-dom';
import logo from '../../images/dman-logo.png';
import { Helmet } from 'react-helmet-async';


function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/customer/forget-password', { email });
      setMessage(response.data.message);
      setIsResendDisabled(true);
      setTimeout(() => setIsResendDisabled(false), 60000); // Resend enabled after 1 minute
    } catch (error) {
      console.log("Error forgot password", error)
      // setMessage('Error sending reset link. Please try again.');
      setMessage(error?.response?.data?.error);
    } 
  };

  return (
    <div className="forgot-password-wrapper">
      <Helmet>
        <title>Forgot Password | Dman Officials Store</title>
        <meta
          name="description"
          content="Request a password reset link for your Dman Officials Store account to regain access."
        />
      </Helmet>
      <div className="forgot-password-container">
      <img src={logo} alt="Logo" className="forget-password-logo" />
        <div className="forget-password-form-container">
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="forget-password-input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={isResendDisabled}>
              {isResendDisabled ? 'Resend in 1 min' : 'Send Reset Link'}
            </button>
          </form>
          {message && <p className="forget-password-message">{message}</p>}
          <p className="forget-password-instructions">
            We will send you an email with instructions to reset your password.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

