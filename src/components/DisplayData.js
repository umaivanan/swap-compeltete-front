// // import React, { useState, useEffect, useContext } from 'react';
// // import axios from 'axios';
// // import { useParams, Link } from 'react-router-dom';
// // import './DataDisplay.css'; // Custom CSS for card design
// // import { SkillContext } from '../context/SkillContext';
// // import logo from '/home/ukijaffna/Documents/october5/swapSmartFrontend/src/assets/lo2.jpg';  // Import the logo image
// // import CryptoJS from 'crypto-js';


// // const DisplayData = () => {
// //   const [data, setData] = useState({});
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const { id } = useParams();  // URL-ல் இருந்து :id பாகத்தை பெறுகிறது
// //  // Extract user ID from the URL
// //   console.log("Fetched ID from URL:", id);
// //   const [loggedInEmail, setLoggedInEmail] = useState("");  // Save logged-in email

  

// //   const { skills, setSkills } = useContext(SkillContext); // Get and set skills from context
// //   // const userSkill = skills.find(skill => skill.user === id);
// //   const userSkill = skills ? skills.find(skill => skill.formDataId === id) : null;

// //   // Current logged-in user's email-ஐ பெறும் logic (for example, authentication system)
// //   useEffect(() => {
// //     // இந்த இடத்தில் authentication மூலம் email பெறுவது
// //     const fetchUserEmail = async () => {
// //       // localStorage-இல் இருந்து encrypted email-ஐ பெறுதல்
// //       const encryptedEmail = localStorage.getItem("userEmail"); 
  
// //       if (encryptedEmail) {
// //         try {
// //           // secretKey அதே key ஆக பயன்படுத்த வேண்டும் (encrypt செய்தது போல)
// //           const secretKey = '12345';  // Ensure this matches the encryption key used during encryption
  
// //           // Email-ஐ decrypt செய்கிறது
// //           const decryptedBytes = CryptoJS.AES.decrypt(encryptedEmail, secretKey);
// //           const decryptedEmail = decryptedBytes.toString(CryptoJS.enc.Utf8); // Convert bytes to string
          
// //           setLoggedInEmail(decryptedEmail); // Decrypted email state-ல் save செய்கிறது
// //         } catch (error) {
// //           console.error("Error decrypting email:", error);
// //         }
// //       } else {
// //         console.error("No encrypted email found in localStorage");
// //       }
// //     };
  
// //     fetchUserEmail();
// //   }, []); // Empty dependency array to run once on component mount


// //   useEffect(() => {
// //     if (id) {  // Check if id is not undefined
// //       const fetchData = async () => {
// //         try {
// //           const response = await axios.get(`http://localhost:8703/api/formdata/${id}`);
// //           setData(response.data);  // Set data retrieved from the API
// //         } catch (error) {
// //           setError('Error fetching data');
// //           console.error(error);
// //         } finally {
// //           setLoading(false);
// //         }
// //       };
      
// //       fetchData();
// //     } else {
// //       console.log("ID is undefined");
// //       setError("Invalid ID or ID not found");
// //     }
// //   }, [id]);

// //   // Fetch skills data
// //   useEffect(() => {
// //     const fetchSkills = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:8703/api/skills'); // Fetch skills from the backend
// //         setSkills(response.data);  // Update skills in context
// //       } catch (error) {
// //         console.error('Error fetching skills:', error);
// //       }
// //     };

// //     fetchSkills();
// //   }, [setSkills]);

// //   // If the data is loading, show a loading message
// //   if (loading) return <p className="loading">Loading...</p>;

// //   // If there's an error, show the error message
// //   if (error) return <p className="error">{error}</p>;

// //   const isAuthorizedUser = userSkill && userSkill.email === loggedInEmail && userSkill.formDataId === data._id;


// //   return (
// //     <div className="data-display-container">
// //       <h1 className="heading">Form Data Display for User {id}</h1>

// //       <div className="three-section-container">
// //         {/* Profile Information */}
// //         {userSkill && (
// //           <div className="profile-section">
// //             <h2>Profile Information</h2>
// //             <p><strong>Profile Name:</strong> {userSkill.profileName}</p>
// //             <p><strong>Skill Category:</strong> {userSkill.skillCategory}</p>
// //             {userSkill.profilePicture && (
// //               <img
// //                 src={`http://localhost:8703${userSkill.profilePicture}`}
// //                 alt={userSkill.profileName}
// //                 className="profile-picture"
// //               />
// //             )}
// //              {isAuthorizedUser && (
// //               <Link to={`/update-info/${id}`}>
// //                 <img src={logo} alt="Update Info" className="update-logo" />
// //               </Link>
// //             )}
// //           </div>
// //         )}

// //         {/* User Information */}
// //         <div className="user-info-section">
// //           <h2>User Information</h2>
// //           <p><strong>Where Live:</strong> {data.whereILive}</p>
// //           <p><strong>Decade Born:</strong> {data.decadeBorn}</p>
// //           <p><strong>Time Spent:</strong> {data.timeSpent}</p>
// //           <p><strong>Work:</strong> {data.work}</p>
// //           <p><strong>Languages:</strong> {data.languages}</p>
// //           <p><strong>About Me:</strong> {data.aboutMe}</p>
// //           {isAuthorizedUser && (
// //               <Link to={`/update-info/${id}`}>
// //                 <img src={logo} alt="Update Info" className="update-logo" />
// //               </Link>
// //             )}
// //         </div>

// //         {/* PDF Links */}
// //         <div className="pdf-links-section">
// //           <h2>PDF Links</h2>
// //           {data.roadmapIntroduction && (
// //             <div className="pdf-card">
// //               <a
// //                 href={`http://localhost:8703/pdfUploads/${data.roadmapIntroduction}`}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 View Roadmap Introduction
// //               </a>
// //             </div>
// //           )}
// //           {data.firstChapter && (
// //             <div className="pdf-card">
// //               <a
// //                 href={`http://localhost:8703/pdfUploads/${data.firstChapter}`}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 View First Chapter
// //               </a>
// //             </div>
// //           )}
// //           {data.secondChapter && (
// //             <div className="pdf-card">
// //               <a
// //                 href={`http://localhost:8703/pdfUploads/${data.secondChapter}`}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 View Second Chapter
// //               </a>
// //             </div>
// //           )}
// //           {data.thirdChapter && (
// //             <div className="pdf-card">
// //               <a
// //                 href={`http://localhost:8703/pdfUploads/${data.thirdChapter}`}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 View Third Chapter
// //               </a>
// //             </div>
// //           )}
// //           {data.fourthChapter && (
// //             <div className="pdf-card">
// //               <a
// //                 href={`http://localhost:8703/pdfUploads/${data.fourthChapter}`}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 View Fourth Chapter
// //               </a>
// //             </div>
// //           )}
// //           {data.fifthChapter && (
// //             <div className="pdf-card">
// //               <a
// //                 href={`http://localhost:8703/pdfUploads/${data.fifthChapter}`}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 View Fifth Chapter
// //               </a>
// //             </div>
// //           )}
// //           {data.sixthChapter && (
// //             <div className="pdf-card">
// //               <a
// //                 href={`http://localhost:8703/pdfUploads/${data.sixthChapter}`}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 View Sixth Chapter
// //               </a>
// //             </div>
// //           )}
// //           {data.seventhChapter && (
// //             <div className="pdf-card">
// //               <a
// //                 href={`http://localhost:8703/pdfUploads/${data.seventhChapter}`}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 View Seventh Chapter
// //               </a>
// //             </div>
// //           )}
// //           {data.eighthChapter && (
// //             <div className="pdf-card">
// //               <a
// //                 href={`http://localhost:8703/pdfUploads/${data.eighthChapter}`}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 View Eighth Chapter
// //               </a>
// //             </div>
// //           )}
// //           {data.ninthChapter && (
// //             <div className="pdf-card">
// //               <a
// //                 href={`http://localhost:8703/pdfUploads/${data.ninthChapter}`}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 View Ninth Chapter
// //               </a>
// //             </div>
// //           )}
// //           {data.tenthChapter && (
// //             <div className="pdf-card">
// //               <a
// //                 href={`http://localhost:8703/pdfUploads/${data.tenthChapter}`}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 View Tenth Chapter
// //               </a>
// //             </div>
// //           )}
// //          {isAuthorizedUser && (
// //               <Link to={`/update-info/${id}`}>
// //                 <img src={logo} alt="Update Info" className="update-logo" />
// //               </Link>
// //             )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DisplayData;


// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';
// import './DataDisplay.css'; // Custom CSS for card design
// import { SkillContext } from '../context/SkillContext';
// import logo from '/home/ukijaffna/Documents/october5/swapSmartFrontend/src/assets/lo2.jpg';  // Import the logo image
// import lockIcon from '/home/ukijaffna/Documents/october5/swapSmartFrontend/src/assets/lo2.jpg'; // Add your lock icon image path here
// import CryptoJS from 'crypto-js';
// import StripeCheckout from "react-stripe-checkout"

// const DisplayData = () => {
//   const [data, setData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [paymentSuccess, setPaymentSuccess] = useState(false); // Track payment status
//   const { id } = useParams();  // Extract user ID from the URL
//   const [loggedInEmail, setLoggedInEmail] = useState("");  // Save logged-in email

//   const { skills, setSkills } = useContext(SkillContext); // Get and set skills from context
//   const userSkill = skills ? skills.find(skill => skill.formDataId === id) : null;

//   const[product,setProduct]=useState({
//     name:"buying pdf",
//     price:2000*100,
//     productBy:"instructors"
//   })

//   // Current logged-in user's email logic (from authentication system)
//   useEffect(() => {
//     const fetchUserEmail = async () => {
//       const encryptedEmail = localStorage.getItem("userEmail"); 
  
//       if (encryptedEmail) {
//         try {
//           const secretKey = '12345';  // Ensure this matches the encryption key used during encryption
//           const decryptedBytes = CryptoJS.AES.decrypt(encryptedEmail, secretKey);
//           const decryptedEmail = decryptedBytes.toString(CryptoJS.enc.Utf8); 
//           setLoggedInEmail(decryptedEmail); 
//         } catch (error) {
//           console.error("Error decrypting email:", error);
//         }
//       } else {
//         console.error("No encrypted email found in localStorage");
//       }
//     };
//     fetchUserEmail();
//   }, []);

//   // Fetch form data
//   useEffect(() => {
//     if (id) {  
//       const fetchData = async () => {
//         try {
//           const response = await axios.get(`http://localhost:8703/api/formdata/${id}`);
//           setData(response.data);  // Set data retrieved from the API
//         } catch (error) {
//           setError('Error fetching data');
//           console.error(error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchData();
//     } else {
//       setError("Invalid ID or ID not found");
//     }
//   }, [id]);

//   // Fetch skills data
//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         const response = await axios.get('http://localhost:8703/api/skills'); 
//         setSkills(response.data);  // Update skills in context
//       } catch (error) {
//         console.error('Error fetching skills:', error);
//       }
//     };
//     fetchSkills();
//   }, [setSkills]);

//   // Handle payment success
//   const handlePayment = () => {
//     alert('Payment successful! PDFs are unlocked.');
//     setPaymentSuccess(true); // Unlock the PDFs
//   };

//   // If the data is loading, show a loading message
//   if (loading) return <p className="loading">Loading...</p>;
//   if (error) return <p className="error">{error}</p>;

//   const isAuthorizedUser = userSkill && userSkill.email === loggedInEmail && userSkill.formDataId === data._id;

//   return (
//     <div className="data-display-container">
//       <h1 className="heading">Form Data Display for User {id}</h1>

//       <div className="three-section-container">
//         {/* Profile Information */}
//         {userSkill && (
//           <div className="profile-section">
//             <h2>Profile Information</h2>
//             <p><strong>Profile Name:</strong> {userSkill.profileName}</p>
//             <p><strong>Skill Category:</strong> {userSkill.skillCategory}</p>
//             {userSkill.profilePicture && (
//               <img
//                 src={`http://localhost:8703${userSkill.profilePicture}`}
//                 alt={userSkill.profileName}
//                 className="profile-picture"
//               />
//             )}
//             {isAuthorizedUser && (
//               <Link to={`/update-info/${id}`}>
//                 <img src={logo} alt="Update Info" className="update-logo" />
//               </Link>
//             )}
//           </div>
//         )}

//         {/* User Information */}
//         <div className="user-info-section">
//           <h2>User Information</h2>
//           <p><strong>Where Live:</strong> {data.whereILive}</p>
//           <p><strong>Decade Born:</strong> {data.decadeBorn}</p>
//           <p><strong>Time Spent:</strong> {data.timeSpent}</p>
//           <p><strong>Work:</strong> {data.work}</p>
//           <p><strong>Languages:</strong> {data.languages}</p>
//           <p><strong>About Me:</strong> {data.aboutMe}</p>
//           {isAuthorizedUser && (
//             <Link to={`/update-info/${id}`}>
//               <img src={logo} alt="Update Info" className="update-logo" />
//             </Link>
//           )}
//         </div>

//         {/* PDF Links */}
//         <div className="pdf-links-section">
//           <h2>PDF Links</h2>

//           {/* Add PDF chapters one by one */}
//           {data.roadmapIntroduction && (
//             <div className="pdf-card">
//               <a
//                 href={`http://localhost:8703/pdfUploads/${data.roadmapIntroduction}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 View Roadmap Introduction
//               </a>
//             </div>
//           )}
//           {['firstChapter', 'secondChapter', 'thirdChapter', 'fourthChapter', 'fifthChapter', 
//             'sixthChapter', 'seventhChapter', 'eighthChapter', 'ninthChapter', 'tenthChapter'].map((chapter, index) => (
//             data[chapter] && (
//               <div className="pdf-card" key={index}>
//                 {/* Only unlock the last 5 chapters if payment is made */}
//                 {index < 3 || paymentSuccess ? (
//                   <a
//                     href={`http://localhost:8703/pdfUploads/${data[chapter]}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     View {chapter.replace('Chapter', ' Chapter ')}
//                   </a>
//                 ) : (
//                   <div className="locked-chapter">
//                     <img src={lockIcon} alt="Locked" className="lock-icon" />
//                     <p>Locked</p>
//                   </div>
//                 )}
//               </div>
//             )
//           ))}

//           {/* Payment button to unlock the last 5 PDFs */}
//           <StripeCheckout>
//           {!paymentSuccess && (
//             <button onClick={handlePayment} className="payment-button">
//               Make Payment to Unlock PDFs{product.price/100}
//             </button>
//           )}
//           </StripeCheckout>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DisplayData;


import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './DataDisplay.css'; // Custom CSS for card design
import { SkillContext } from '../context/SkillContext';
import logo from '/home/ukijaffna/Documents/october9/swapSmartFrontend/src/assets/lo2.jpg';  // Import the logo image
import lockIcon from '/home/ukijaffna/Documents/october9/swapSmartFrontend/src/assets/lo2.jpg'; // Add your lock icon image path here
import CryptoJS from 'crypto-js';
import StripeCheckout from "react-stripe-checkout";

const DisplayData = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();  // Extract user ID from the URL
  const [loggedInEmail, setLoggedInEmail] = useState("");  // Save logged-in email
  
  const { skills, setSkills } = useContext(SkillContext); // Get and set skills from context
  const userSkill = skills ? skills.find(skill => skill.formDataId === id) : null;

  const [product, setProduct] = useState({
    name: "buying pdf",
    price: 0,
    productBy: "instructors"
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
      payer: loggedInEmail,  // Current logged-in user's email (payer)
      payingTo: userSkill ? userSkill.email : "Unknown",  // Instructor's email (payingTo)
    };

    const headers = {
      "Content-Type": "application/json"
    };

    return fetch("http://localhost:8703/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then((response) => {
        console.log("Payment response:", response);
        console.log("Payer (User):", loggedInEmail);  // Display payer's email
        console.log("Paying To (Instructor):", userSkill ? userSkill.email : "No Instructor email found");
      })
      .catch((err) => {
        console.log("Payment error:", err);
      });
  };

  // Current logged-in user's email logic (from authentication system)
  useEffect(() => {
    const fetchUserEmail = async () => {
      const encryptedEmail = localStorage.getItem("userEmail"); 
  
      if (encryptedEmail) {
        try {
          const secretKey = '12345';  // Ensure this matches the encryption key used during encryption
          const decryptedBytes = CryptoJS.AES.decrypt(encryptedEmail, secretKey);
          const decryptedEmail = decryptedBytes.toString(CryptoJS.enc.Utf8); 
          setLoggedInEmail(decryptedEmail); 
        } catch (error) {
          console.error("Error decrypting email:", error);
        }
      } else {
        console.error("No encrypted email found in localStorage");
      }
    };
    fetchUserEmail();
  }, []);

  // Fetch form data
  useEffect(() => {
    if (id) {  
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8703/api/formdata/${id}`);
          setData(response.data);  // Set data retrieved from the API

          if (response.data.pdfPrice) {
            setProduct({
              name: "buying pdf",
              price: response.data.pdfPrice * 100, // Convert price to cents for Stripe
              productBy: "instructors"
            });
          }
  
        } catch (error) {
          setError('Error fetching data');
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setError("Invalid ID or ID not found");
    }
  }, [id]);

  // Fetch skills data
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('http://localhost:8703/api/skills'); 
        setSkills(response.data);  // Update skills in context
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };
    fetchSkills();
  }, [setSkills]);

  // If the data is loading, show a loading message
  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  const isAuthorizedUser = userSkill && userSkill.email === loggedInEmail && userSkill.formDataId === data._id;

  return (
    <div className="data-display-container">
      <h1 className="heading">Form Data Display for User {id}</h1>

      <div className="three-section-container">
        {/* Profile Information */}
        {userSkill && (
          <div className="profile-section">
            <h2>Profile Information</h2>
            <p><strong>Profile Name:</strong> {userSkill.profileName}</p>
            <p><strong>Skill Category:</strong> {userSkill.skillCategory}</p>
            {userSkill.profilePicture && (
              <img
                src={`http://localhost:8703${userSkill.profilePicture}`}
                alt={userSkill.profileName}
                className="profile-picture"
              />
            )}
            {isAuthorizedUser && (
              <Link to={`/update-info/${id}`}>
                <img src={logo} alt="Update Info" className="update-logo" />
              </Link>
            )}
          </div>
        )}

        {/* User Information */}
        <div className="user-info-section">
          <h2>User Information</h2>
          <p><strong>Where Live:</strong> {data.whereILive}</p>
          <p><strong>Decade Born:</strong> {data.decadeBorn}</p>
          <p><strong>Time Spent:</strong> {data.timeSpent}</p>
          <p><strong>Work:</strong> {data.work}</p>
          <p><strong>Languages:</strong> {data.languages}</p>
          <p><strong>About Me:</strong> {data.aboutMe}</p>
          <p><strong>PDF Price:</strong> ${data.pdfPrice}</p>  {/* Displaying the PDF price */}

          {isAuthorizedUser && (
            <Link to={`/update-info/${id}`}>
              <img src={logo} alt="Update Info" className="update-logo" />
            </Link>
          )}
        </div>

        {/* PDF Links */}
        <div className="pdf-links-section">
          <h2>PDF Links</h2>

          {/* Add PDF chapters one by one */}
          {data.roadmapIntroduction && (
            <div className="pdf-card">
              <a
                href={`http://localhost:8703/pdfUploads/${data.roadmapIntroduction}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Roadmap Introduction
              </a>
            </div>
          )}
          {['firstChapter', 'secondChapter', 'thirdChapter', 'fourthChapter', 'fifthChapter', 
            'sixthChapter', 'seventhChapter', 'eighthChapter', 'ninthChapter', 'tenthChapter'].map((chapter, index) => (
            data[chapter] && (
              <div className="pdf-card" key={index}>
                {/* Only unlock the last 5 chapters if payment is made */}
                {index < 3 ? (
                  <a
                    href={`http://localhost:8703/pdfUploads/${data[chapter]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View {chapter.replace('Chapter', ' Chapter ')}
                  </a>
                ) : (
                  <div className="locked-chapter">
                    <img src={lockIcon} alt="Locked" className="lock-icon" />
                    <p>Locked</p>
                  </div>
                )}
              </div>
            )
          ))}

          {/* Payment button to unlock the last 5 PDFs */}
          <StripeCheckout
            name="Buying PDF"
            amount={product.price}
            stripeKey="pk_test_51Q0z3OIDR6fHncujf4V778OtQb2gJHqfP54FvBGnuvugIcT4fSmXMDSn4qIkkKJ5pw6aGRdwyluYJsGGsH1kLN9s00c1SapMSi"
            token={makePayment}
          >
            <button className="payment-button">
              Make Payment to Unlock PDFs ${data.pdfPrice}
            </button>
          </StripeCheckout>
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
