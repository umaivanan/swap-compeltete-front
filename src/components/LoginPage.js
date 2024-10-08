import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';  // For encryption
import './LoginPage.css';  // Include your custom styles

const LoginPage = ({ onSuccess }) => {  // Add onSuccess prop for closing the popup
  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initialStateErrors);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let errors = { ...initialStateErrors };
    let hasError = false;

    if (inputs.email === "") {
      errors.email.required = true;
      hasError = true;
    }
    if (inputs.password === "") {
      errors.password.required = true;
      hasError = true;
    }

    if (hasError) {
      setErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8703/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      });

      const data = await response.json();

      if (response.ok) {
        const secretKey = '12345';
        const encryptedEmail = CryptoJS.AES.encrypt(inputs.email, secretKey).toString();
        localStorage.setItem('userEmail', encryptedEmail);

        const encryptedToken = CryptoJS.AES.encrypt(data.token, secretKey).toString();
        localStorage.setItem('token', encryptedToken);

        // Login successful, navigate to the next page
        navigate(data.role === 'admin' ? '/admin-dashboard' : '/list');
        
        // Call the onSuccess function to close the popup
        onSuccess();  // Close the popup after successful login
      } else {
        setErrors({ ...errors, custom_error: data.error || 'Something went wrong' });
      }
    } catch (error) {
      setErrors({ ...errors, custom_error: 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="text-center">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleInput}
          />
          {errors.email.required && (
            <span className="error-text">Email is required.</span>
          )}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleInput}
          />
          {errors.password.required && (
            <span className="error-text">Password is required.</span>
          )}
        </div>
        <div className="form-group">
          {errors.custom_error && (
            <span className="error-text">{errors.custom_error}</span>
          )}
          {loading ? <div className="loading-spinner">Loading...</div> : null}
          <button type="submit" disabled={loading}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
