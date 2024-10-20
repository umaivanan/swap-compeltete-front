import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
// import './UserDashboard.css'; // Custom CSS for card design
import { SkillContext } from '../context/SkillContext';
import logo from '../assets/lo2.jpg';  // Import the logo image
import lockIcon from '../assets/lo2.jpg'; // Add your lock icon image path here
import CryptoJS from 'crypto-js';
import StripeCheckout from "react-stripe-checkout";

const UserDashboard = () => {
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

    return fetch("http://localhost:8707/payment", {
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
          const response = await axios.get(`http://localhost:8707/api/formdata/${id}`);
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
        const response = await axios.get('http://localhost:8707/api/skills'); 
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
            <p><strong>Preferred Language:</strong> {userSkill.preferredLanguage}</p>  {/* Updated field */}
            <p><strong>Educational Background:</strong> {userSkill.educationalBackground}</p>  {/* Updated field */}
            {userSkill.profilePicture && (
              <img
                src={`http://localhost:8707${userSkill.profilePicture}`}
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

        {/* Course Information */}
        <div className="user-info-section">
          <h2>Course Information</h2>
          <p><strong>Course Description:</strong> {data.courseDescription}</p>
          <p><strong>Course Duration:</strong> {data.courseDuration}</p>
          <p><strong>Target Audience:</strong> {data.targetAudience}</p>
          <p><strong>Course Category:</strong> {data.courseCategory}</p>
          <p><strong>Languages:</strong> {data.languages}</p>
          <p><strong>PDF Price:</strong> ${data.pdfPrice}</p>  {/* Displaying the PDF price */}

          {isAuthorizedUser && (
            <Link to={`/update-info/${id}`}>
              <img src={logo} alt="Update Info" className="update-logo" />
            </Link>
          )}

          {/* Display the image (if available) */}
          {data.image && (
            <div className="image-section">
              <h3>Course Image</h3>
              <img
                src={`http://localhost:8707/imageUploads/${data.image}`}
                alt="Course uploaded"
                className="uploaded-image"
              />
            </div>
          )}
        </div>

        {/* PDF Links */}
        <div className="pdf-links-section">
          <h2>PDF Links</h2>

          {/* Add PDF chapters one by one */}
          {data.roadmapIntroduction && (
            <div className="pdf-card">
              <a
                href={`http://localhost:8707/pdfUploads/${data.roadmapIntroduction}`}
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
                    href={`http://localhost:8707/pdfUploads/${data[chapter]}`}
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

export default UserDashboard;
