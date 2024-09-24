import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // User is logged in if token is found
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false); // Update state to reflect logout
    navigate('/'); // Redirect to home page
  };

  const handleCreateProfile = () => {
    navigate('/paypal-button'); // Navigate to the profile creation page
  };

  return (
    <nav className="main">
      <ul>
        {!isLoggedIn ? (
          <li>
            <Link to="/register">
              <button className="btn">Setup Skill Share</button>
            </Link>
          </li>
        ) : (
          <>
            <li>
              <button className="btn" onClick={handleCreateProfile}>
                Create Profile
              </button>
            </li>
            <li>
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
