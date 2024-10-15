// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Navbar.css';
// import axios from 'axios';
// import logo from '/home/ukijaffna/Documents/october14/swapSmartFrontend/src/assets/a9714e26-a365-405f-8cdb-47df3aeedfb8.webp';
// import Popup from './Popup';  // Importing the Popup component

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Login status
//   const [formSubmitted, setFormSubmitted] = useState(false); // Track if the form is already submitted
//   const [loading, setLoading] = useState(true); // Track loading state
//   const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
//   const navigate = useNavigate();

//   // Check login status and form submission when the component mounts
//   useEffect(() => {
//     const token = localStorage.getItem('token'); // Retrieve token from localStorage
//     const userEmail = localStorage.getItem('userEmail'); // Retrieve user email from localStorage

//     // If the token and email exist, user is logged in
//     if (token && userEmail) {
//       setIsLoggedIn(true);

//       // Check if the form is already submitted
//       const checkFormSubmissionStatus = async () => {
//         try {
//           const response = await axios.post('http://localhost:8703/api/skills/check-form', { email: userEmail });
//           setFormSubmitted(response.data.formSubmitted);
//         } catch (error) {
//           console.error('Error checking form submission status:', error);
//         } finally {
//           setLoading(false); // Set loading to false when check is complete
//         }
//       };
//       checkFormSubmissionStatus();
//     } else {
//       setLoading(false); // Set loading to false if no token or email
//     }
//   }, []);

//   // Handle logout functionality
//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Remove token from localStorage
//     localStorage.removeItem('userEmail'); // Optionally remove userEmail from localStorage
//     setIsLoggedIn(false); // Update login state
//     navigate('/'); // Navigate to the home page
//   };

//   // Handle navigation to profile creation page
//   const handleCreateProfile = () => {
//     navigate('/skill-form'); // Navigate to the skill form page
//   };

//   // Handle showing the popup modal
//   const handlePopup = () => {
//     setShowPopup(!showPopup);  // Toggle popup visibility
//   };

//   // While loading, show a loading indicator or nothing
//   if (loading) {
//     return <div>Loading...</div>; // Replace with a proper loading spinner if needed
//   }

//   // Handle login/register success
//   const handlePopupClose = () => {
//     setShowPopup(false);  // Close the popup after successful login or register
//   };

//   return (
//     <div>
//       {/* Display the Navbar only when popup is NOT shown */}
//       {!showPopup && (
//         <nav className="main">
//           <div className="navbar-logo">
//             <Link to="/">
//               <img src={logo} alt="Logo" className="logo" /> {/* Add logo */}
//             </Link>
//           </div>

//           <ul>
//             {!isLoggedIn ? (
//               <li>
//                 <button className="btn" onClick={handlePopup}>SETUP</button>
//               </li>
//             ) : (
//               <>
//                 {!formSubmitted && (
//                   <li>
//                     <button className="btn" onClick={handleCreateProfile}>
//                       Create Profile
//                     </button>
//                   </li>
//                 )}
//                 <li>
//                   <button className="btn" onClick={handleLogout}>
//                     Logout
//                   </button>
//                 </li>
//               </>
//             )}
//           </ul>
//         </nav>
//       )}

//       {/* Display the popup and pass the handlePopupClose function */}
//       {showPopup && <Popup onClose={handlePopupClose} />}  {/* Pass the function to close popup */}
//     </div>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';
import logo from '/home/ukijaffna/Documents/october14/swapSmartFrontend/src/assets/a9714e26-a365-405f-8cdb-47df3aeedfb8.webp';
import Popup from './Popup';  // Importing the Popup component

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login status
  const [formSubmitted, setFormSubmitted] = useState(false); // Track if the form is already submitted
  const [loading, setLoading] = useState(true); // Track loading state
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const navigate = useNavigate();

  // Check login status and form submission when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const userEmail = localStorage.getItem('userEmail'); // Retrieve user email from localStorage

    // If the token and email exist, user is logged in
    if (token && userEmail) {
      setIsLoggedIn(true);

      // Check form submission status from localStorage
      const localFormSubmitted = localStorage.getItem(`formSubmitted_${userEmail}`);
      if (localFormSubmitted === 'true') {
        setFormSubmitted(true); // Set formSubmitted to true if found in localStorage
      }

      // If not in localStorage, check if the form is already submitted via backend
      const checkFormSubmissionStatus = async () => {
        try {
          const response = await axios.post('http://localhost:8703/api/skills/check-form', { email: userEmail });
          setFormSubmitted(response.data.formSubmitted); // Update formSubmitted status
          
          // Save form submission status in localStorage
          localStorage.setItem(`formSubmitted_${userEmail}`, response.data.formSubmitted ? 'true' : 'false');
        } catch (error) {
          console.error('Error checking form submission status:', error);
        } finally {
          setLoading(false); // Set loading to false when check is complete
        }
      };
      
      if (!localFormSubmitted) {
        checkFormSubmissionStatus(); // Check with backend if not found in localStorage
      } else {
        setLoading(false); // If formSubmitted is already in localStorage, skip backend check
      }
    } else {
      setLoading(false); // Set loading to false if no token or email
    }
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('userEmail'); // Optionally remove userEmail from localStorage
    setIsLoggedIn(false); // Update login state
    navigate('/'); // Navigate to the home page
  };

  // Handle navigation to profile creation page
  const handleCreateProfile = () => {
    navigate('/skill-form'); // Navigate to the skill form page
  };

  // Handle showing the popup modal
  const handlePopup = () => {
    setShowPopup(!showPopup);  // Toggle popup visibility
  };

  // While loading, show a loading indicator or nothing
  if (loading) {
    return <div>Loading...</div>; // Replace with a proper loading spinner if needed
  }

  // Handle login/register success
  const handlePopupClose = () => {
    setShowPopup(false);  // Close the popup after successful login or register
  };

  return (
    <div>
      {/* Display the Navbar only when popup is NOT shown */}
      {!showPopup && (
        <nav className="main">
          <div className="navbar-logo">
            <Link to="/">
              <img src={logo} alt="Logo" className="logo" /> {/* Add logo */}
            </Link>
          </div>

          <ul>
            {!isLoggedIn ? (
              <li>
                <button className="btn" onClick={handlePopup}>SETUP</button>
              </li>
            ) : (
              <>
                {/* If form is not submitted, show Create Profile */}
                {!formSubmitted && (
                  <li>
                    <button className="btn" onClick={handleCreateProfile}>
                      Create Profile
                    </button>
                  </li>
                )}
                {/* Show Logout button */}
                <li>
                  <button className="btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}

      {/* Display the popup and pass the handlePopupClose function */}
      {showPopup && <Popup onClose={handlePopupClose} />}  {/* Pass the function to close popup */}
    </div>
  );
};

export default Navbar;
