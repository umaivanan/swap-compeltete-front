// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import CryptoJS from 'crypto-js';
// import { motion } from 'framer-motion';

// const LoginPage = ({ onSuccess }) => {
//   const initialStateErrors = {
//     email: { required: false },
//     password: { required: false },
//     custom_error: null,
//   };

//   const [errors, setErrors] = useState(initialStateErrors);
//   const [loading, setLoading] = useState(false);
//   const [inputs, setInputs] = useState({ email: '', password: '' });
//   const navigate = useNavigate();

//   const handleInput = (event) => {
//     setInputs({ ...inputs, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     let errors = { ...initialStateErrors };
//     let hasError = false;

//     if (inputs.email === '') {
//       errors.email.required = true;
//       hasError = true;
//     }
//     if (inputs.password === '') {
//       errors.password.required = true;
//       hasError = true;
//     }

//     if (hasError) {
//       setErrors(errors);
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:8707/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(inputs),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         const secretKey = '12345';
//         const encryptedEmail = CryptoJS.AES.encrypt(inputs.email, secretKey).toString();
//         localStorage.setItem('userEmail', encryptedEmail);

//         const encryptedToken = CryptoJS.AES.encrypt(data.token, secretKey).toString();
//         localStorage.setItem('token', encryptedToken);

//         // Fetch the form submission status after login
//         const checkFormResponse = await fetch('http://localhost:8707/api/skills/check-form', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email: inputs.email }), // Pass the email to check form status
//         });

//         const formStatusData = await checkFormResponse.json();
//         const submittedStatus = formStatusData.formSubmitted;

//         // Store the submittedStatus in localStorage
//         localStorage.setItem('submittedStatus', JSON.stringify(submittedStatus));

//         // Navigate based on role (admin or user)
//         navigate(data.role === 'admin' ? '/admin-dashboard' : '/list');
//         onSuccess();
//       } else {
//         setErrors({ ...errors, custom_error: data.error || 'Something went wrong' });
//       }
//     } catch (error) {
//       setErrors({ ...errors, custom_error: 'An unexpected error occurred' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-auto w-[500px] bg-white">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="flex flex-col max-w-md w-full h-auto p-8 rounded-xl shadow-lg bg-opacity-500 backdrop-blur-md"
//       >
//         <h2 className="text-4xl text-cyan-500 mb-6 text-center font-bold">Login</h2>
//         <form className="w-full" onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-cyan-500 text-lg mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={inputs.email}
//               onChange={handleInput}
//               className={`w-full p-4 text-lg bg-gray-100 rounded-md ${errors.email.required ? 'border border-red-500' : ''}`}
//             />
//             {errors.email.required && (
//               <span className="text-red-500 text-sm">Email is required.</span>
//             )}
//           </div>
//           <div className="mb-4">
//             <label className="block text-cyan-500 text-lg mb-1">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={inputs.password}
//               onChange={handleInput}
//               className={`w-full p-4 text-lg bg-gray-100 rounded-md ${errors.password.required ? 'border border-red-500' : ''}`}
//             />
//             {errors.password.required && (
//               <span className="text-red-500 text-sm">Password is required.</span>
//             )}
//           </div>
//           {errors.custom_error && (
//             <span className="text-red-500 text-sm">{errors.custom_error}</span>
//           )}
//           {loading ? <div className="text-center text-lg text-cyan-500">Loading...</div> : null}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full mt-4 py-4 bg-cyan-500 text-lg font-semibold text-black rounded-md hover:bg-cyan-400 transition duration-300"
//           >
//             Login
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { motion } from 'framer-motion';

const secretKey = '12345'; // Encryption key

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

  const encrypt = (data) => {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  };

  const decrypt = (data) => {
    const bytes = CryptoJS.AES.decrypt(data, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
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
      const response = await fetch('http://localhost:8707/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      });

      const data = await response.json();

      if (response.ok) {
        const encryptedEmail = encrypt(inputs.email);
        localStorage.setItem('userEmail', encryptedEmail);

        const encryptedToken = encrypt(data.token);
        localStorage.setItem('token', encryptedToken);

        // Fetch the form submission status after login
        const checkFormResponse = await fetch('http://localhost:8707/api/skills/check-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: inputs.email }),
        });

        const formStatusData = await checkFormResponse.json();
        const submittedStatus = formStatusData.formSubmitted;

        // Store the submittedStatus in localStorage
        localStorage.setItem('submittedStatus', JSON.stringify(submittedStatus));

        // Save Skill ID to localStorage if the form was submitted
        if (submittedStatus) {
          const skillIdResponse = await fetch('http://localhost:8707/api/skills', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: inputs.email }),
          });

          const skillIdData = await skillIdResponse.json();
          const skillId = skillIdData._id; // Get the Skill ID
          const encryptedSkillId = encrypt(skillId); // Encrypt Skill ID
          localStorage.setItem(`skillId_${inputs.email}`, encryptedSkillId); // Save encrypted Skill ID
        }

        // Navigate based on role (admin or user)
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
    // <div className="flex justify-center items-center h-auto w-[500px] bg-white">
    //   <motion.div
    //     initial={{ opacity: 0, y: -20 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.5 }}
    //     className="flex flex-col max-w-md w-full h-auto p-8 rounded-xl shadow-lg bg-opacity-500 backdrop-blur-md"
    //   >
    //     <h2 className="text-4xl text-cyan-500 mb-6 text-center font-bold">Login</h2>
    //     <form className="w-full" onSubmit={handleSubmit}>
    //       <div className="mb-4">
    //         <label className="block text-cyan-500 text-lg mb-1">Email</label>
    //         <input
    //           type="email"
    //           name="email"
    //           value={inputs.email}
    //           onChange={handleInput}
    //           className={`w-full p-4 text-lg bg-gray-100 rounded-md ${errors.email.required ? 'border border-red-500' : ''}`}
    //         />
    //         {errors.email.required && (
    //           <span className="text-red-500 text-sm">Email is required.</span>
    //         )}
    //       </div>
    //       <div className="mb-4">
    //         <label className="block text-cyan-500 text-lg mb-1">Password</label>
    //         <input
    //           type="password"
    //           name="password"
    //           value={inputs.password}
    //           onChange={handleInput}
    //           className={`w-full p-4 text-lg bg-gray-100 rounded-md ${errors.password.required ? 'border border-red-500' : ''}`}
    //         />
    //         {errors.password.required && (
    //           <span className="text-red-500 text-sm">Password is required.</span>
    //         )}
    //       </div>
    //       {errors.custom_error && (
    //         <span className="text-red-500 text-sm">{errors.custom_error}</span>
    //       )}
    //       {loading ? <div className="text-center text-lg text-cyan-500">Loading...</div> : null}
    //       <button
    //         type="submit"
    //         disabled={loading}
    //         className="w-full mt-4 py-4 bg-cyan-500 text-lg font-semibold text-black rounded-md hover:bg-cyan-400 transition duration-300"
    //       >
    //         Login
    //       </button>
    //     </form>
    //   </motion.div>
    // </div>
    <div className="flex justify-center items-center h-auto w-[500px] bg-transparent">
  <div className="flex flex-col max-w-md w-full h-auto p-8 rounded-xl shadow-lg bg-white bg-opacity-70 backdrop-blur-md">
    <h2 className="text-4xl text-purple-600 mb-6 text-center font-bold">Login</h2>
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-purple-600 text-lg mb-1">Email</label>
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
        <label className="block text-purple-600 text-lg mb-1">Password</label>
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
      {loading ? <div className="text-center text-lg text-purple-600">Loading...</div> : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full mt-4 py-4 bg-purple-600 text-white text-lg font-semibold rounded-md hover:bg-purple-500 transition duration-300"
      >
        Login
      </button>
    </form>
  </div>
</div>

  );
};

export default LoginPage;
