import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { motion } from 'framer-motion';

const LoginPage = ({ onSuccess }) => {
  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initialStateErrors);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let errors = { ...initialStateErrors };
    let hasError = false;

    if (inputs.email === '') {
      errors.email.required = true;
      hasError = true;
    }
    if (inputs.password === '') {
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

        navigate(data.role === 'admin' ? '/admin-dashboard' : '/list');
        onSuccess();
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
    <div className="flex justify-center items-center h-auto w-[500px] bg-white"> {/* Changed h-screen to h-auto */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
className="flex flex-col max-w-md w-full h-auto p-8 rounded-xl shadow-lg bg-opacity-500 backdrop-blur-md">
        <h2 className="text-4xl text-cyan-500 mb-6 text-center font-bold">Login</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-cyan-500 text-lg mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleInput}
              className={`w-full p-4 text-lg bg-gray-100 rounded-md ${errors.email.required ? 'border border-red-500' : ''}`}
            />
            {errors.email.required && (
              <span className="text-red-500 text-sm">Email is required.</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-cyan-500 text-lg mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleInput}
              className={`w-full p-4 text-lg bg-gray-100 rounded-md ${errors.password.required ? 'border border-red-500' : ''}`}
            />
            {errors.password.required && (
              <span className="text-red-500 text-sm">Password is required.</span>
            )}
          </div>
          {errors.custom_error && (
            <span className="text-red-500 text-sm">{errors.custom_error}</span>
          )}
          {loading ? <div className="text-center text-lg text-cyan-500">Loading...</div> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-4 bg-cyan-500 text-lg font-semibold text-black rounded-md hover:bg-cyan-400 transition duration-300"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
