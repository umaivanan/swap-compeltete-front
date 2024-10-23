import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { motion } from 'framer-motion';

const RegisterPage = ({ onSuccess }) => {
  const initialStateErrors = {
    email: { required: false },
    name: { required: false },
    password: { required: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initialStateErrors);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let errors = { ...initialStateErrors };
    let hasError = false;

    // Basic validation
    if (inputs.name === '') {
      errors.name.required = true;
      hasError = true;
    }
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
      const response = await fetch('http://localhost:8707/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      });

      const data = await response.json();

      if (response.ok) {
        const secretKey = '12345'; // Secure your secret key in production
        const encryptedEmail = CryptoJS.AES.encrypt(inputs.email, secretKey).toString();
        localStorage.setItem('userEmail', encryptedEmail);

        const encryptedToken = CryptoJS.AES.encrypt(data.token, secretKey).toString();
        localStorage.setItem('token', encryptedToken);

        onSuccess(); // Close modal
        navigate('/list');
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
    // <motion.div
    //   className="flex justify-center items-center h-auto bg-white" // Changed h-screen to h-auto
    //   initial={{ opacity: 0, scale: 0.9 }}
    //   animate={{ opacity: 1, scale: 1 }}
    //   exit={{ opacity: 0, scale: 0.9 }}
    //   transition={{ duration: 0.5 }}
    // >
    //   <div className="max-w-lg w-full h-auto  p-6 rounded-xl shadow-lg">
    //     <h2 className="text-10xl text-cyan-500 mb-6 text-center">Register</h2>
    //     <form className="w-full" onSubmit={handleSubmit}>
    //       <div className="mb-4">
    //         <label className="block text-cyan-500">Name</label>
    //         <input
    //           type="text"
    //           name="name"
    //           value={inputs.name}
    //           onChange={handleInput}
    //           className="form-control w-full p-3 border rounded border-gray-300"
    //         />
    //         {errors.name.required && <span className="text-red-500">Name is required.</span>}
    //       </div>
    //       <div className="mb-4">
    //         <label className="block text-cyan-500">Email</label>
    //         <input
    //           type="email"
    //           name="email"
    //           value={inputs.email}
    //           onChange={handleInput}
    //           className="form-control w-full p-3 border rounded border-gray-300"
    //         />
    //         {errors.email.required && <span className="text-red-500">Email is required.</span>}
    //       </div>
    //       <div className="mb-4">
    //         <label className="block text-cyan-500">Password</label>
    //         <input
    //           type="password"
    //           name="password"
    //           value={inputs.password}
    //           onChange={handleInput}
    //           className="form-control w-full p-3 border rounded border-gray-300"
    //         />
    //         {errors.password.required && <span className="text-red-500">Password is required.</span>}
    //       </div>
    //       {errors.custom_error && <span className="text-red-500">{errors.custom_error}</span>}
    //       {loading ? <div className="text-center">Loading...</div> : null}
    //       <button
    //         type="submit"
    //         disabled={loading}
    //         className="w-full bg-cyan-500 text-white py-2 mt-4 rounded-lg hover:bg-cyan-600 transition duration-300"
    //       >
    //         Register
    //       </button>
    //     </form>
    //   </div>
    // </motion.div> 
    <motion.div
  className="flex justify-center items-center h-auto bg-white"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.9 }}
  transition={{ duration: 0.5 }}
>
  <div className="max-w-md w-full h-auto p-6 rounded-xl shadow-lg">
    <h2 className="text-4xl text-purple-600 mb-6 text-center font-bold">Register</h2>
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-purple-600 text-lg mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={inputs.name}
          onChange={handleInput}
          className="w-full h-12 p-4 border border-gray-300 rounded-md"
        />
        {errors.name.required && <span className="text-red-500 text-sm">Name is required.</span>}
      </div>
      <div className="mb-6">
        <label className="block text-purple-600 text-lg mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={inputs.email}
          onChange={handleInput}
          className="w-full h-12 p-4 border border-gray-300 rounded-md"
        />
        {errors.email.required && <span className="text-red-500 text-sm">Email is required.</span>}
      </div>
      <div className="mb-6">
        <label className="block text-purple-600 text-lg mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={inputs.password}
          onChange={handleInput}
          className="w-full h-12 p-4 border border-gray-300 rounded-md"
        />
        {errors.password.required && <span className="text-red-500 text-sm">Password is required.</span>}
      </div>
      {errors.custom_error && <span className="text-red-500 text-sm">{errors.custom_error}</span>}
      {loading ? <div className="text-center text-purple-600">Loading...</div> : null}
      {/* <button
        type="submit"
        disabled={loading}
        className="w-full h-12 bg-white text-purple-600 border border-purple-600 py-2 mt-6 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300"
      >
        Register
      </button> */}
      <button
  type="submit"
  disabled={loading}
  className="w-full h-12 bg-purple-600 text-white border border-purple-600 py-2 mt-6 rounded-lg hover:bg-white hover:text-purple-600 transition duration-300"
>
  Register
</button>

    </form>
  </div>
</motion.div>

  );
};

export default RegisterPage;
