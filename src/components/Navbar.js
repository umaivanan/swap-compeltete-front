import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios'; // For making API requests
import logo from '/home/ukijaffna/Documents/october5/swapSmartFrontend/src/assets/pexels-photo-3183197 (1).jpeg';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial state for login status
  const [formSubmitted, setFormSubmitted] = useState(false); // Track if the form is already submitted
  const navigate = useNavigate();

  // Check login status when the component mounts
  useEffect(() => {
    // Check for the token in localStorage
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail'); // Assuming email is stored in localStorage

    if (token && userEmail) {
      setIsLoggedIn(true); // If token is found, user is logged in

      // Check if the form is already submitted
      const checkFormSubmissionStatus = async () => {
        try {
          const response = await axios.post('http://localhost:8703/api/skills/check-form', { email: userEmail });
          if (response.data.formSubmitted) {
            setFormSubmitted(true); // If form is already submitted, set formSubmitted to true
          }
        } catch (error) {
          console.error('Error checking form submission status:', error);
        }
      };
      checkFormSubmissionStatus();
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setIsLoggedIn(false); // Update the state to reflect logout
    navigate('/'); // Redirect the user to the home page after logout
  };

  // Handle navigation to profile creation page
  const handleCreateProfile = () => {
    navigate('/skill-form'); // Navigate to the profile creation page
  };

  return (
    <nav className="main">
       <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" /> {/* Add logo */}
        </Link>
      </div>

      <ul>
        {/* Check if the user is not logged in */}
        {!isLoggedIn ? (
          <li>
            <Link to="/register">
              <button className="btn">Setup Skill Share</button>
            </Link>
          </li>
        ) : (
          <>
            {/* Show Create Profile button only if form is NOT submitted */}
            {!formSubmitted && (
              <li>
                <button className="btn" onClick={handleCreateProfile}>
                  Create Profile
                </button>
              </li>
            )}
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
