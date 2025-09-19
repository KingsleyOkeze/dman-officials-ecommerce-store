import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "../../styles/pages-styles/auth-pages-styles/ResetPassword.css";
import { Helmet } from 'react-helmet-async';

function ResetPassword () {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [disableButton, setDisableButton] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/customer/reset-password', { token, newPassword });
      if (response.data.message) {
        setMessage(response.data.message);
        setDisableButton(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      // setMessage('Error resetting password. Please try again.');
      setMessage(error?.response?.data?.error);
    }
  };

  return (
    <div className="reset-password-wrapper">
      <Helmet>
        <title>Reset Password | Dman Officials Store</title>
        <meta
          name="description"
          content="Reset your password for your Dman Officials Store account to regain access."
        />
      </Helmet>
      <div className="reset-password-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={disableButton}>Reset Password</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
