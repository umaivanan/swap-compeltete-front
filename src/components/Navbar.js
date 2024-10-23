// import React, { useState, useEffect, useCallback } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Navbar.css';
// import logo from '../assets/a9714e26-a365-405f-8cdb-47df3aeedfb8.webp';
// import Popup from './Popup'; // Import Popup component
// import CryptoJS from 'crypto-js'; // Import CryptoJS

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [showPopup, setShowPopup] = useState(false);
//   const [userProfile, setUserProfile] = useState(null);
//   const navigate = useNavigate();

//   const decryptEmail = (encryptedEmail) => {
//     const secretKey = '12345';
//     const bytes = CryptoJS.AES.decrypt(encryptedEmail, secretKey);
//     return bytes.toString(CryptoJS.enc.Utf8);
//   };

//   // Memoize the function using useCallback to prevent unnecessary re-renders
//   const checkLoginStatus = useCallback(() => {
//     const token = localStorage.getItem('token');
//     const encryptedUserEmail = localStorage.getItem('userEmail');

//     if (token && encryptedUserEmail) {
//       setIsLoggedIn(true);
//       const userEmail = decryptEmail(encryptedUserEmail);

//       const localSubmittedStatus = localStorage.getItem('submittedStatus');
//       if (localSubmittedStatus !== null) {
//         setFormSubmitted(JSON.parse(localSubmittedStatus));
//       }

//       fetchUserProfile(userEmail);
//     }
//     setLoading(false);
//   }, []); // No dependencies

//   const fetchUserProfile = async (email) => {
//     try {
//       const response = await fetch(`http://localhost:8707/api/skills?email=${email}`);
//       const data = await response.json();
//       setUserProfile(data);
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//     }
//   };

//   useEffect(() => {
//     checkLoginStatus();

//     const handleStorageChange = () => {
//       const localSubmittedStatus = localStorage.getItem('submittedStatus');
//       if (localSubmittedStatus !== null) {
//         setFormSubmitted(JSON.parse(localSubmittedStatus));
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     window.addEventListener('formSubmitted', handleStorageChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('formSubmitted', handleStorageChange);
//     };
//   }, [checkLoginStatus]); // Depend on the memoized function

//   useEffect(() => {
//     if (isLoggedIn) {
//       const encryptedUserEmail = localStorage.getItem('userEmail');
//       if (encryptedUserEmail) {
//         const userEmail = decryptEmail(encryptedUserEmail);
//         fetchUserProfile(userEmail);

//         const localSubmittedStatus = localStorage.getItem('submittedStatus');
//         if (localSubmittedStatus !== null) {
//           setFormSubmitted(JSON.parse(localSubmittedStatus));
//         }
//       }
//     }
//   }, [isLoggedIn, showPopup]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userEmail');
//     localStorage.removeItem('submittedStatus');
//     localStorage.removeItem('skillId');
//     setIsLoggedIn(false);
//     setFormSubmitted(false);
//     setUserProfile(null);
//     navigate('/');
//   };

//   const handleDashboardNavigation = () => {
//     navigate('/user-dashboard/:id');
//   };

//   const handleNavigation = () => {
//     if (!formSubmitted) {
//       navigate('/skill-form');
//     } else {
//       navigate('/additionalInformation');
//     }
//   };

//   const handlePopup = () => {
//     setShowPopup(!showPopup);
//   };

//   const handlePopupClose = () => {
//     setShowPopup(false);

//     const encryptedUserEmail = localStorage.getItem('userEmail');
//     if (encryptedUserEmail) {
//       const userEmail = decryptEmail(encryptedUserEmail);
//       setIsLoggedIn(true);

//       const localSubmittedStatus = localStorage.getItem('submittedStatus');
//       if (localSubmittedStatus !== null) {
//         setFormSubmitted(JSON.parse(localSubmittedStatus));
//       } else {
//         const checkFormSubmissionStatus = async () => {
//           try {
//             const response = await fetch('http://localhost:8707/api/skills/check-form', {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({ email: userEmail }),
//             });
//             const data = await response.json();
//             setFormSubmitted(data.formSubmitted);
//             localStorage.setItem('submittedStatus', data.formSubmitted ? 'true' : 'false');
//           } catch (error) {
//             console.error('Error checking form submission status:', error);
//           }
//         };

//         checkFormSubmissionStatus();
//       }

//       fetchUserProfile(userEmail);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {!showPopup && (
//         <nav className="main">
//           <div className="navbar-logo">
//             <Link to="/">
//               <img src={logo} alt="Logo" className="logo" />
//             </Link>
//           </div>

//           <ul>
//             {!isLoggedIn ? (
//               <li>
//                 <button className="btn" onClick={handlePopup}>SETUP</button>
//               </li>
//             ) : (
//               <>
//                 {userProfile && userProfile.profilePicture && (
//                   <li className="profile-pic">
//                     <img
//                       src={`http://localhost:8707${userProfile.profilePicture}`}
//                       alt="Profile"
//                       className="profile-picture"
//                       onClick={handleDashboardNavigation}
//                     />
//                   </li>
//                 )}
//                 <li>
//                   <button className="btn" onClick={handleNavigation}>
//                     {!formSubmitted ? 'Create Profile' : 'Create Course'}
//                   </button>
//                 </li>
//                 <li>
//                   <button className="btn" onClick={handleLogout}>Logout</button>
//                 </li>
//               </>
//             )}
//           </ul>
//         </nav>
//       )}
//       {showPopup && <Popup onClose={handlePopupClose} />}
//     </div>
//   );
// };

// export default Navbar;
// import React, { useState, useEffect, useCallback } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import logo from '../assets/a9714e26-a365-405f-8cdb-47df3aeedfb8.webp';
// import Popup from './Popup'; // Import Popup component
// import CryptoJS from 'crypto-js'; // Import CryptoJS

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [showPopup, setShowPopup] = useState(false);
//   const [userProfile, setUserProfile] = useState(null);
//   const navigate = useNavigate();

//   const decryptEmail = (encryptedEmail) => {
//     const secretKey = '12345';
//     const bytes = CryptoJS.AES.decrypt(encryptedEmail, secretKey);
//     return bytes.toString(CryptoJS.enc.Utf8);
//   };

//   const checkLoginStatus = useCallback(() => {
//     const token = localStorage.getItem('token');
//     const encryptedUserEmail = localStorage.getItem('userEmail');

//     if (token && encryptedUserEmail) {
//       setIsLoggedIn(true);
//       const userEmail = decryptEmail(encryptedUserEmail);

//       const localSubmittedStatus = localStorage.getItem('submittedStatus');
//       if (localSubmittedStatus !== null) {
//         setFormSubmitted(JSON.parse(localSubmittedStatus));
//       }

//       fetchUserProfile(userEmail);
//     }
//     setLoading(false);
//   }, []);

//   const fetchUserProfile = async (email) => {
//     try {
//       const response = await fetch(`http://localhost:8707/api/skills?email=${email}`);
//       const data = await response.json();
//       setUserProfile(data);
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//     }
//   };

//   useEffect(() => {
//     checkLoginStatus();

//     const handleStorageChange = () => {
//       const localSubmittedStatus = localStorage.getItem('submittedStatus');
//       if (localSubmittedStatus !== null) {
//         setFormSubmitted(JSON.parse(localSubmittedStatus));
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     window.addEventListener('formSubmitted', handleStorageChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('formSubmitted', handleStorageChange);
//     };
//   }, [checkLoginStatus]);

//   useEffect(() => {
//     if (isLoggedIn) {
//       const encryptedUserEmail = localStorage.getItem('userEmail');
//       if (encryptedUserEmail) {
//         const userEmail = decryptEmail(encryptedUserEmail);
//         fetchUserProfile(userEmail);

//         const localSubmittedStatus = localStorage.getItem('submittedStatus');
//         if (localSubmittedStatus !== null) {
//           setFormSubmitted(JSON.parse(localSubmittedStatus));
//         }
//       }
//     }
//   }, [isLoggedIn, showPopup]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userEmail');
//     localStorage.removeItem('submittedStatus');
//     localStorage.removeItem('skillId');
//     setIsLoggedIn(false);
//     setFormSubmitted(false);
//     setUserProfile(null);
//     navigate('/');
//   };

//   const handleDashboardNavigation = () => {
//     navigate('/user-dashboard/:id');
//   };

//   const handleNavigation = () => {
//     if (!formSubmitted) {
//       navigate('/skill-form');
//     } else {
//       navigate('/additionalInformation');
//     }
//   };

//   const handlePopup = () => {
//     setShowPopup(!showPopup);
//   };

//   const handlePopupClose = () => {
//     setShowPopup(false);
//     const encryptedUserEmail = localStorage.getItem('userEmail');
//     if (encryptedUserEmail) {
//       const userEmail = decryptEmail(encryptedUserEmail);
//       setIsLoggedIn(true);
//       const localSubmittedStatus = localStorage.getItem('submittedStatus');
//       if (localSubmittedStatus !== null) {
//         setFormSubmitted(JSON.parse(localSubmittedStatus));
//       } else {
//         const checkFormSubmissionStatus = async () => {
//           try {
//             const response = await fetch('http://localhost:8707/api/skills/check-form', {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({ email: userEmail }),
//             });
//             const data = await response.json();
//             setFormSubmitted(data.formSubmitted);
//             localStorage.setItem('submittedStatus', data.formSubmitted ? 'true' : 'false');
//           } catch (error) {
//             console.error('Error checking form submission status:', error);
//           }
//         };
//         checkFormSubmissionStatus();
//       }
//       fetchUserProfile(userEmail);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {!showPopup && (
//         <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-cyan-500 to-white fixed top-0 left-0 w-full z-50">
//           <div className="navbar-logo">
//             <Link to="/">
//               <img src={logo} alt="Logo" className="h-12" />
//             </Link>
//           </div>

//           <ul className="flex space-x-5">
//             {!isLoggedIn ? (
//               <li>
//                 <button className="bg-black text-white border-2 border-white py-2 px-4 rounded transition-transform duration-300 transform hover:bg-white hover:text-black hover:border-black focus:outline-none focus:ring focus:ring-white" onClick={handlePopup}>SETUP</button>
//               </li>
//             ) : (
//               <>
//                 {userProfile && userProfile.profilePicture && (
//                   <li className="flex items-center ml-5">
//                     <img
//                       src={`http://localhost:8707${userProfile.profilePicture}`}
//                       alt="Profile"
//                       className="w-10 h-10 rounded-full cursor-pointer"
//                       onClick={handleDashboardNavigation}
//                     />
//                   </li>
//                 )}
//                 <li>
//                   <button className="bg-black text-white border-2 border-white py-2 px-4 rounded transition-transform duration-300 transform hover:bg-white hover:text-black hover:border-black focus:outline-none focus:ring focus:ring-white" onClick={handleNavigation}>
//                     {!formSubmitted ? 'Create Profile' : 'Create Course'}
//                   </button>
//                 </li>
//                 <li>
//                   <button className="bg-black text-white border-2 border-white py-2 px-4 rounded transition-transform duration-300 transform hover:bg-white hover:text-black hover:border-black focus:outline-none focus:ring focus:ring-white" onClick={handleLogout}>Logout</button>
//                 </li>
//               </>
//             )}
//           </ul>
//         </nav>
//       )}
//       {showPopup && <Popup onClose={handlePopupClose} />}
//     </div>
//   );
// };

// export default Navbar;
// import React, { useState, useEffect, useCallback } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import logo from '../assets/a9714e26-a365-405f-8cdb-47df3aeedfb8.webp';
// import Popup from './Popup'; // Import Popup component
// import CryptoJS from 'crypto-js'; // Import CryptoJS

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [showPopup, setShowPopup] = useState(false);
//   const [userProfile, setUserProfile] = useState(null);
//   const [showSetupButton, setShowSetupButton] = useState(false); // State for setup button visibility
//   const navigate = useNavigate();
//   const location = useLocation(); // Get the current location

//   const decryptEmail = (encryptedEmail) => {
//     const secretKey = '12345';
//     const bytes = CryptoJS.AES.decrypt(encryptedEmail, secretKey);
//     return bytes.toString(CryptoJS.enc.Utf8);
//   };

//   const checkLoginStatus = useCallback(() => {
//     const token = localStorage.getItem('token');
//     const encryptedUserEmail = localStorage.getItem('userEmail');

//     if (token && encryptedUserEmail) {
//       setIsLoggedIn(true);
//       const userEmail = decryptEmail(encryptedUserEmail);

//       const localSubmittedStatus = localStorage.getItem('submittedStatus');
//       if (localSubmittedStatus !== null) {
//         setFormSubmitted(JSON.parse(localSubmittedStatus));
//       }

//       fetchUserProfile(userEmail);
//     }
//     setLoading(false);
//   }, []);

//   const fetchUserProfile = async (email) => {
//     try {
//       const response = await fetch(`http://localhost:8707/api/skills?email=${email}`);
//       const data = await response.json();
//       setUserProfile(data);
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//     }
//   };

//   useEffect(() => {
//     checkLoginStatus();

//     const handleStorageChange = () => {
//       const localSubmittedStatus = localStorage.getItem('submittedStatus');
//       if (localSubmittedStatus !== null) {
//         setFormSubmitted(JSON.parse(localSubmittedStatus));
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     window.addEventListener('formSubmitted', handleStorageChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('formSubmitted', handleStorageChange);
//     };
//   }, [checkLoginStatus]);

//   useEffect(() => {
//     if (isLoggedIn) {
//       const encryptedUserEmail = localStorage.getItem('userEmail');
//       if (encryptedUserEmail) {
//         const userEmail = decryptEmail(encryptedUserEmail);
//         fetchUserProfile(userEmail);

//         const localSubmittedStatus = localStorage.getItem('submittedStatus');
//         if (localSubmittedStatus !== null) {
//           setFormSubmitted(JSON.parse(localSubmittedStatus));
//         }
//       }
//     }
//   }, [isLoggedIn, showPopup]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userEmail');
//     localStorage.removeItem('submittedStatus');
//     localStorage.removeItem('skillId');
//     setIsLoggedIn(false);
//     setFormSubmitted(false);
//     setUserProfile(null);
//     navigate('/');
//   };

//   const handleDashboardNavigation = () => {
//     navigate('/user-dashboard/:id');
//   };

//   const handleNavigation = () => {
//     if (!formSubmitted) {
//       navigate('/skill-form');
//     } else {
//       navigate('/additionalInformation');
//     }
//   };

//   const handlePopup = () => {
//     setShowPopup(!showPopup);
//   };

//   const handlePopupClose = () => {
//     setShowPopup(false);
//     const encryptedUserEmail = localStorage.getItem('userEmail');
//     if (encryptedUserEmail) {
//       const userEmail = decryptEmail(encryptedUserEmail);
//       setIsLoggedIn(true);
//       const localSubmittedStatus = localStorage.getItem('submittedStatus');
//       if (localSubmittedStatus !== null) {
//         setFormSubmitted(JSON.parse(localSubmittedStatus));
//       } else {
//         const checkFormSubmissionStatus = async () => {
//           try {
//             const response = await fetch('http://localhost:8707/api/skills/check-form', {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({ email: userEmail }),
//             });
//             const data = await response.json();
//             setFormSubmitted(data.formSubmitted);
//             localStorage.setItem('submittedStatus', data.formSubmitted ? 'true' : 'false');
//           } catch (error) {
//             console.error('Error checking form submission status:', error);
//           }
//         };
//         checkFormSubmissionStatus();
//       }
//       fetchUserProfile(userEmail);
//     }
//   };

//   useEffect(() => {
//     // Reset button visibility based on location
//     if (location.pathname === '/') {
//       setShowSetupButton(true); // Show setup button only on home
//     } else {
//       setShowSetupButton(false); // Hide it on other pages
//     }
//   }, [location]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {!showPopup && (
//         <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-cyan-500 to-white fixed top-0 left-0 w-full h-[8%] z-50">
//           <div className="navbar-logo">
//             <Link to="/">
//               <img src={logo} alt="Logo" className="h-12" />
//             </Link>
//           </div>

//           <ul className="flex space-x-4">
//             {location.pathname === '/' ? ( // Only show setup button on home page
//               <li>
//                 <button className="bg-[#161D6F] text-white border-2 border-[#161D6F] py-3 px-6 rounded-full transition-transform duration-300 transform hover:bg-blue-800 focus:outline-none focus:ring focus:ring-white" onClick={handlePopup}>SETUP</button>
//               </li>
//             ) : (
//               <>
//                 {!isLoggedIn ? (
//                   <li>
//                     <button className="bg-[#161D6F] text-white border-2 border-[#161D6F] py-3 px-6 rounded-full transition-transform duration-300 transform hover:bg-blue-800 focus:outline-none focus:ring focus:ring-white" onClick={handlePopup}>SETUP</button>
//                   </li>
//                 ) : (
//                   <>
//                     {userProfile && userProfile.profilePicture && (
//                       <li className="flex items-center ml-5">
//                         <img
//                           src={`http://localhost:8707${userProfile.profilePicture}`}
//                           alt="Profile"
//                           className="w-10 h-10 rounded-full cursor-pointer"
//                           onClick={handleDashboardNavigation}
//                         />
//                       </li>
//                     )}
//                     <li>
//                       <button className="bg-[#161D6F] text-white border-2 border-[#161D6F] py-3 px-6 rounded-full transition-transform duration-300 transform hover:bg-blue-800 focus:outline-none focus:ring focus:ring-white" onClick={handleNavigation}>
//                         {!formSubmitted ? 'Create Profile' : 'Create Course'}
//                       </button>
//                     </li>
//                     <li>
//                       <button className="bg-[#161D6F] text-white border-2 border-[#161D6F] py-3 px-6 rounded-full transition-transform duration-300 transform hover:bg-blue-800 focus:outline-none focus:ring focus:ring-white" onClick={handleLogout}>Logout</button>
//                     </li>
//                   </>
//                 )}
//               </>
//             )}
//           </ul>
//         </nav>
//       )}
//       {showPopup && <Popup onClose={handlePopupClose} />}
//     </div>
//   );
// };

// export default Navbar;
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai'; // Import user and logout icons
import { FaCog } from 'react-icons/fa'; // Import settings icon
import logo from '/home/ukijaffna/um/swapSmartFrontend/src/assets/DALL·E 2024-10-20 22.16.59 - An abstract geometric logo design, similar to the uploaded image, featuring a complex diamond pattern with directional arrows. Replace the green tones.webp';
import Popup from './Popup'; // Import Popup component
import CryptoJS from 'crypto-js'; // Import CryptoJS

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [showSetupButton, setShowSetupButton] = useState(false); // State for setup button visibility
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const decryptEmail = (encryptedEmail) => {
    const secretKey = '12345';
    const bytes = CryptoJS.AES.decrypt(encryptedEmail, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const checkLoginStatus = useCallback(() => {
    const token = localStorage.getItem('token');
    const encryptedUserEmail = localStorage.getItem('userEmail');

    if (token && encryptedUserEmail) {
      setIsLoggedIn(true);
      const userEmail = decryptEmail(encryptedUserEmail);

      const localSubmittedStatus = localStorage.getItem('submittedStatus');
      if (localSubmittedStatus !== null) {
        setFormSubmitted(JSON.parse(localSubmittedStatus));
      }

      fetchUserProfile(userEmail);
    }
    setLoading(false);
  }, []);

  const fetchUserProfile = async (email) => {
    try {
      const response = await fetch(`http://localhost:8707/api/skills?email=${email}`);
      const data = await response.json();
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    checkLoginStatus();

    const handleStorageChange = () => {
      const localSubmittedStatus = localStorage.getItem('submittedStatus');
      if (localSubmittedStatus !== null) {
        setFormSubmitted(JSON.parse(localSubmittedStatus));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('formSubmitted', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('formSubmitted', handleStorageChange);
    };
  }, [checkLoginStatus]);

  useEffect(() => {
    if (isLoggedIn) {
      const encryptedUserEmail = localStorage.getItem('userEmail');
      if (encryptedUserEmail) {
        const userEmail = decryptEmail(encryptedUserEmail);
        fetchUserProfile(userEmail);

        const localSubmittedStatus = localStorage.getItem('submittedStatus');
        if (localSubmittedStatus !== null) {
          setFormSubmitted(JSON.parse(localSubmittedStatus));
        }
      }
    }
  }, [isLoggedIn, showPopup]);

  const handleLogout = () => {
    // Email-ஐ localStorage-இல் இருந்து பெறுகிறீர்கள் மற்றும் decrypt செய்கிறீர்கள்
    const encryptedUserEmail = localStorage.getItem('userEmail');
    
    if (encryptedUserEmail) {
      const email = decryptEmail(encryptedUserEmail); // Decrypt the email from localStorage
  
      // Skill ID மற்றும் தொடர்புடைய values-ஐ localStorage-ல் இருந்து அகற்றவும்
      localStorage.removeItem(`skillId_${email}`);  // Encrypted skillId ஐ அகற்றும்
    }
  
    localStorage.removeItem('token');  // Token ஐ அகற்றும்
    localStorage.removeItem('userEmail');  // User email ஐ அகற்றும்
    localStorage.removeItem('submittedStatus');  // Form submitted status ஐ அகற்றும்
  
    // State values reset
    setIsLoggedIn(false);
    setFormSubmitted(false);
    setUserProfile(null);
  
    // பயனரை login பக்கத்திற்கு மாற்றுதல்
    navigate('/');
  };

  const handleDashboardNavigation = () => {
    navigate('/user-dashboard');
  };

  const handleNavigation = () => {
    if (!formSubmitted) {
      navigate('/skill-form');
    } else {
      navigate('/additionalInformation');
    }
  };

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    const encryptedUserEmail = localStorage.getItem('userEmail');
    if (encryptedUserEmail) {
      const userEmail = decryptEmail(encryptedUserEmail);
      setIsLoggedIn(true);
      const localSubmittedStatus = localStorage.getItem('submittedStatus');
      if (localSubmittedStatus !== null) {
        setFormSubmitted(JSON.parse(localSubmittedStatus));
      } else {
        const checkFormSubmissionStatus = async () => {
          try {
            const response = await fetch('http://localhost:8707/api/skills/check-form', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: userEmail }),
            });
            const data = await response.json();
            setFormSubmitted(data.formSubmitted);
            localStorage.setItem('submittedStatus', data.formSubmitted ? 'true' : 'false');
          } catch (error) {
            console.error('Error checking form submission status:', error);
          }
        };
        checkFormSubmissionStatus();
      }
      fetchUserProfile(userEmail);
    }
  };

  useEffect(() => {
    // Reset button visibility based on location
    if (location.pathname === '/') {
      setShowSetupButton(true); // Show setup button only on home
    } else {
      setShowSetupButton(false); // Hide it on other pages
    }
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    // <div>
    //   {!showPopup && (
    //     <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-cyan-500 to-white fixed top-0 left-0 w-full h-[8%] z-50">
    //       <div className="navbar-logo">
    //         <Link to="/">
    //           <img src={logo} alt="Logo" className="h-12" />
    //         </Link>
    //       </div>

    //       <ul className="flex space-x-4">
    //         {location.pathname === '/' ? ( // Only show setup button on home page
    //           <li>
    //             <button className="flex items-center bg-[#161D6F] text-white border-2 border-[#161D6F] py-3 px-6 rounded-full transition-transform duration-300 transform hover:bg-blue-800 focus:outline-none focus:ring focus:ring-white" onClick={handlePopup}>
    //               <FaCog className="mr-2" />
    //               SETUP
    //             </button>
    //           </li>
    //         ) : (
    //           <>
    //             {!isLoggedIn ? (
    //               <li>
    //                 <button className="flex items-center bg-[#161D6F] text-white border-2 border-[#161D6F] py-3 px-6 rounded-full transition-transform duration-300 transform hover:bg-blue-800 focus:outline-none focus:ring focus:ring-white" onClick={handlePopup}>
    //                   <FaCog className="mr-2" />
    //                   SETUP
    //                 </button>
    //               </li>
    //             ) : (
    //               <>
    //                 {userProfile && userProfile.profilePicture && (
    //                   <li className="flex items-center ml-5">
    //                     <img
    //                       src={`http://localhost:8707${userProfile.profilePicture}`}
    //                       alt="Profile"
    //                       className="w-10 h-10 rounded-full cursor-pointer"
    //                       onClick={handleDashboardNavigation}
    //                     />
    //                   </li>
    //                 )}
    //                 <li>
    //                   <button className="flex items-center bg-[#161D6F] text-white border-2 border-[#161D6F] py-3 px-6 rounded-full transition-transform duration-300 transform hover:bg-blue-800 focus:outline-none focus:ring focus:ring-white" onClick={handleNavigation}>
    //                     <AiOutlineUser className="mr-2" />
    //                     {!formSubmitted ? 'Create Profile' : 'Create Course'}
    //                   </button>
    //                 </li>
    //                 <li>
    //                   <button className="flex items-center bg-[#161D6F] text-white border-2 border-[#161D6F] py-3 px-6 rounded-full transition-transform duration-300 transform hover:bg-blue-800 focus:outline-none focus:ring focus:ring-white" onClick={handleLogout}>
    //                     <AiOutlineLogout className="mr-2" />
    //                     Logout
    //                   </button>
    //                 </li>
    //               </>
    //             )}
    //           </>
    //         )}
    //       </ul>
    //     </nav>
    //   )}
    //   {showPopup && <Popup onClose={handlePopupClose} />}
    // </div>
    <div>
  {!showPopup && (
    <nav className="flex justify-between items-center p-4 bg-white fixed top-0 left-0 w-full h-[8%] z-50">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-12" />
        </Link>
      </div>

      <ul className="flex space-x-4">
        {location.pathname === '/' ? ( // Only show setup button on home page
          <li>
            <button className="flex items-center bg-purple-900 text-white border-2 border-purple-900 py-3 px-6 rounded-full transition-transform duration-300 transform hover:bg-purple-700 focus:outline-none focus:ring focus:ring-white" onClick={handlePopup}>
              <FaCog className="mr-2" />
              SETUP
            </button>
          </li>
        ) : (
          <>
            {!isLoggedIn ? (
              <li>
                <button className="flex items-center bg-purple-900 text-white border-2 border-purple-900 py-3 px-6 rounded-full transition-transform duration-300 transform hover:bg-purple-700 focus:outline-none focus:ring focus:ring-white" onClick={handlePopup}>
                  <FaCog className="mr-2" />
                  SETUP
                </button>
              </li>
            ) : (
              <>
                {userProfile && userProfile.profilePicture && (
                  <li className="flex items-center ml-5">
                    <img
                      src={`http://localhost:8707${userProfile.profilePicture}`}
                      alt="Profile"
                      className="w-10 h-10 rounded-full cursor-pointer"
                      onClick={handleDashboardNavigation}
                    />
                  </li>
                )}
                <li>
                  <button className="flex items-center bg-purple-900 text-white border-2 border-purple-900 py-3 px-6 rounded-full transition-transform duration-300 transform hover:bg-purple-700 focus:outline-none focus:ring focus:ring-white" onClick={handleNavigation}>
                    <AiOutlineUser className="mr-2" />
                    {!formSubmitted ? 'Create Profile' : 'Create Course'}
                  </button>
                </li>
                <li>
                  <button className="flex items-center bg-purple-900 text-white border-2 border-purple-900 py-3 px-6 rounded-full transition-transform duration-300 transform hover:bg-purple-700 focus:outline-none focus:ring focus:ring-white" onClick={handleLogout}>
                    <AiOutlineLogout className="mr-2" />
                    Logout
                  </button>
                </li>
              </>
            )}
          </>
        )}
      </ul>
    </nav>
  )}
  {showPopup && <Popup onClose={handlePopupClose} />}
</div>

  );
};

export default Navbar;
