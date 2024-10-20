import React, { useState } from 'react';
import LoginPage from './LoginPage';  // Import Login Page Component
import RegisterPage from './RegisterPage';  // Import Register Page Component
import './popup.css';  // Import your Popup styles

const Popup = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);  // State to toggle between login and register

  const handleSuccess = () => {
    // On successful login or register, close the popup
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>X</button>  {/* Close button */}
        
        {/* Conditionally render login or register form */}
        {isLogin ? (
          <LoginPage onSuccess={handleSuccess} />  // Pass handleSuccess to LoginPage
        ) : (
          <RegisterPage onSuccess={handleSuccess} />  // Pass handleSuccess to RegisterPage
        )}
        
        {/* Toggle between Login and Register */}
        <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'No account? Register' : 'Have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default Popup;