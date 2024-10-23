// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './SkillForm.css';
// import CryptoJS from 'crypto-js';

// const SkillForm = () => {
//   const [profileName, setProfileName] = useState('');
//   const [skillCategory, setSkillCategory] = useState('');
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [preferredLanguage, setPreferredLanguage] = useState(''); // New state for Preferred Language
//   const [educationalBackground, setEducationalBackground] = useState(''); // New state for Educational Background
//   const [currentUserEmail, setCurrentUserEmail] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const encryptedUserEmail = localStorage.getItem('userEmail');
    
//     if (encryptedUserEmail) {
//       const secretKey = '12345'; // Decryption key
//       const decryptedEmail = CryptoJS.AES.decrypt(encryptedUserEmail, secretKey).toString(CryptoJS.enc.Utf8);
      
//       if (decryptedEmail) {
//         setCurrentUserEmail(decryptedEmail); // Decrypted email is set in the state

//         const checkFormSubmissionStatus = async () => {
//           try {
//             // Send request to backend to check submission status
//             const response = await axios.post('http://localhost:8707/api/skills/check-form', { email: decryptedEmail });
//             console.log('Backend Response:', response.data);
//             if (response.data.formSubmitted) {
//               // If form is already submitted
//               navigate('/list'); // Redirect to the list page
//             }
//           } catch (error) {
//             console.error('Error checking form submission status:', error);
//           }
//         };
//         checkFormSubmissionStatus(); // Function call
//       }
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!currentUserEmail) {
//       console.error('No user email available to submit the form');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('profileName', profileName);
//     formData.append('skillCategory', skillCategory);
//     formData.append('email', currentUserEmail);  // Add email to formData
//     formData.append('preferredLanguage', preferredLanguage); // Add Preferred Language
//     formData.append('educationalBackground', educationalBackground); // Add Educational Background

//     if (profilePicture) {
//       formData.append('profilePicture', profilePicture);
//     }

//     try {
//       const response = await axios.post('http://localhost:8707/api/skills', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const skillId = response.data._id;

//       // Backend update for submittedStatus
//       await axios.patch(`http://localhost:8707/api/skills/${skillId}`, { submittedStatus: true });

//       // Redirect after form submission
//       navigate('/additionalInformation', { state: { skillId: skillId } });

//     } catch (error) {
//       console.error('Error uploading skill', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="skill-form">
//       <div className="form-group">
//         <label htmlFor="profileName">Profile Name</label>
//         <input
//           type="text"
//           id="profileName"
//           value={profileName}
//           onChange={(e) => setProfileName(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="skillCategory">Skill Category</label>
//         <input
//           type="text"
//           id="skillCategory"
//           value={skillCategory}
//           onChange={(e) => setSkillCategory(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="profilePicture">Profile Picture (Optional)</label>
//         <input
//           type="file"
//           id="profilePicture"
//           onChange={(e) => setProfilePicture(e.target.files[0])}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="preferredLanguage">Preferred Language</label>
//         <input
//           type="text"
//           id="preferredLanguage"
//           value={preferredLanguage}
//           onChange={(e) => setPreferredLanguage(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="educationalBackground">Educational Background</label>
//         <input
//           type="text"
//           id="educationalBackground"
//           value={educationalBackground}
//           onChange={(e) => setEducationalBackground(e.target.value)}
//         />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default SkillForm;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './SkillForm.css';
// import CryptoJS from 'crypto-js';

// const SkillForm = () => {
//   const [profileName, setProfileName] = useState('');
//   const [skillCategory, setSkillCategory] = useState('');
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [preferredLanguage, setPreferredLanguage] = useState('');
//   const [educationalBackground, setEducationalBackground] = useState('');
//   const [currentUserEmail, setCurrentUserEmail] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const encryptedUserEmail = localStorage.getItem('userEmail');
    
//     if (encryptedUserEmail) {
//       const secretKey = '12345'; // Decryption key
//       const decryptedEmail = CryptoJS.AES.decrypt(encryptedUserEmail, secretKey).toString(CryptoJS.enc.Utf8);
      
//       if (decryptedEmail) {
//         setCurrentUserEmail(decryptedEmail); // Decrypted email is set in the state

//         // Check if form submission status is already saved in localStorage
//         const formSubmittedStatus = localStorage.getItem(`formSubmitted_${decryptedEmail}`);
        
//         if (formSubmittedStatus === 'true') {
//           // If form is already submitted (status true in localStorage), redirect to list page
//           navigate('/list');
//         } else {
//           const checkFormSubmissionStatus = async () => {
//             try {
//               const response = await axios.post('http://localhost:8707/api/skills/check-form', { email: decryptedEmail });
//               console.log('Backend Response:', response.data);
//               if (response.data.formSubmitted) {
//                 // Save the form submission status in localStorage if backend says it's submitted
//                 localStorage.setItem(`formSubmitted_${decryptedEmail}`, 'true');
//                 navigate('/list'); // Redirect to list page
//               }
//             } catch (error) {
//               console.error('Error checking form submission status:', error);
//             }
//           };
//           checkFormSubmissionStatus();
//         }
//       }
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!currentUserEmail) {
//       console.error('No user email available to submit the form');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('profileName', profileName);
//     formData.append('skillCategory', skillCategory);
//     formData.append('email', currentUserEmail);  // Add email to formData
//     formData.append('preferredLanguage', preferredLanguage); // Add Preferred Language
//     formData.append('educationalBackground', educationalBackground); // Add Educational Background

//     if (profilePicture) {
//       formData.append('profilePicture', profilePicture);
//     }

//     try {
//       const response = await axios.post('http://localhost:8707/api/skills', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const skillId = response.data._id;

//       // Backend update for submittedStatus
//       await axios.patch(`http://localhost:8707/api/skills/${skillId}`, { submittedStatus: true });

//       // Save the form submission status to localStorage
//       localStorage.setItem(`formSubmitted_${currentUserEmail}`, 'true');

//       // Redirect after form submission
//       navigate('/additionalInformation', { state: { skillId: skillId } });

//     } catch (error) {
//       console.error('Error uploading skill', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="skill-form">
//       <div className="form-group">
//         <label htmlFor="profileName">Profile Name</label>
//         <input
//           type="text"
//           id="profileName"
//           value={profileName}
//           onChange={(e) => setProfileName(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="skillCategory">Skill Category</label>
//         <input
//           type="text"
//           id="skillCategory"
//           value={skillCategory}
//           onChange={(e) => setSkillCategory(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="profilePicture">Profile Picture (Optional)</label>
//         <input
//           type="file"
//           id="profilePicture"
//           onChange={(e) => setProfilePicture(e.target.files[0])}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="preferredLanguage">Preferred Language</label>
//         <input
//           type="text"
//           id="preferredLanguage"
//           value={preferredLanguage}
//           onChange={(e) => setPreferredLanguage(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="educationalBackground">Educational Background</label>
//         <input
//           type="text"
//           id="educationalBackground"
//           value={educationalBackground}
//           onChange={(e) => setEducationalBackground(e.target.value)}
//         />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default SkillForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SkillForm.css';
import CryptoJS from 'crypto-js';
import bookImage from '../assets/a-man-reads-a-book-1024x683.jpg'; // Import the image




const SkillForm = () => {
  const [profileName, setProfileName] = useState('');
  // const [skillCategory, setSkillCategory] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [preferredLanguage, setPreferredLanguage] = useState('');
  const [educationalBackground, setEducationalBackground] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const encryptedUserEmail = localStorage.getItem('userEmail');
    
    if (encryptedUserEmail) {
      const secretKey = '12345'; // Decryption key
      const decryptedEmail = CryptoJS.AES.decrypt(encryptedUserEmail, secretKey).toString(CryptoJS.enc.Utf8);
      
      if (decryptedEmail) {
        setCurrentUserEmail(decryptedEmail);

        const formSubmittedStatus = localStorage.getItem(`formSubmitted_${decryptedEmail}`);
        
        if (formSubmittedStatus === 'true') {
          navigate('/list');
        } else {
          const checkFormSubmissionStatus = async () => {
            try {
              const response = await axios.post('http://localhost:8707/api/skills/check-form', { email: decryptedEmail });
              console.log('Backend Response:', response.data);
              if (response.data.formSubmitted) {
                localStorage.setItem(`formSubmitted_${decryptedEmail}`, 'true');
                navigate('/list');
              }
            } catch (error) {
              console.error('Error checking form submission status:', error);
            }
          };
          checkFormSubmissionStatus();
        }
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUserEmail) {
      console.error('No user email available to submit the form');
      return;
    }

    const formData = new FormData();
    formData.append('profileName', profileName);
    // formData.append('skillCategory', skillCategory);
    formData.append('email', currentUserEmail);
    formData.append('preferredLanguage', preferredLanguage);
    formData.append('educationalBackground', educationalBackground);

    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await axios.post('http://localhost:8707/api/skills', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const skillId = response.data._id;

      // Update the submittedStatus in the backend
      await axios.patch(`http://localhost:8707/api/skills/${skillId}`, { submittedStatus: true });

      // Save the form submission status to localStorage
      localStorage.setItem(`formSubmitted_${currentUserEmail}`, 'true');

      // Save Skill ID to localStorage
      localStorage.setItem(`skillId_${currentUserEmail}`, skillId);
      


      // Redirect after form submission
      navigate('/additionalInformation', { state: { skillId: skillId } });

    } catch (error) {
      console.error('Error uploading skill', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white hover:bg-purple-600 transition-colors duration-300">

    {/* Container for form and image */}
    <div className="bg-white rounded-3xl shadow-lg flex overflow-hidden max-w-5xl w-full">
      
      {/* Left Side: Image Section */}
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${bookImage})` }}>

        {/* You can replace 'your-image-path.jpg' with the path to your background image */}
      </div>

      {/* Right Side: Form Section */}
      <div className="w-1/2 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Submit Your Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="profileName" className="block text-gray-600 mb-2">Profile Name</label>
            <input
              type="text"
              id="profileName"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profilePicture" className="block text-gray-600 mb-2">Profile Picture (Optional)</label>
            <input
              type="file"
              id="profilePicture"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={(e) => setProfilePicture(e.target.files[0])}
            />
          </div>
          <div className="form-group">
            <label htmlFor="preferredLanguage" className="block text-gray-600 mb-2">Preferred Language</label>
            <input
              type="text"
              id="preferredLanguage"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="educationalBackground" className="block text-gray-600 mb-2">Educational Background</label>
            <input
              type="text"
              id="educationalBackground"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              value={educationalBackground}
              onChange={(e) => setEducationalBackground(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full p-3 bg-red-500 text-white rounded-md hover:bg-red-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>

  );
};

export default SkillForm;













// <form onSubmit={handleSubmit} className="skill-form">
    //   <div className="form-group">
    //     <label htmlFor="profileName">Profile Name</label>
    //     <input
    //       type="text"
    //       id="profileName"
    //       value={profileName}
    //       onChange={(e) => setProfileName(e.target.value)}
    //     />
    //   </div>
    //   {/* <div className="form-group">
    //     <label htmlFor="skillCategory">Skill Category</label>
    //     <input
    //       type="text"
    //       id="skillCategory"
    //       value={skillCategory}
    //       onChange={(e) => setSkillCategory(e.target.value)}
    //     />
    //   </div> */}
    //   <div className="form-group">
    //     <label htmlFor="profilePicture">Profile Picture (Optional)</label>
    //     <input
    //       type="file"
    //       id="profilePicture"
    //       onChange={(e) => setProfilePicture(e.target.files[0])}
    //     />
    //   </div>
    //   <div className="form-group">
    //     <label htmlFor="preferredLanguage">Preferred Language</label>
    //     <input
    //       type="text"
    //       id="preferredLanguage"
    //       value={preferredLanguage}
    //       onChange={(e) => setPreferredLanguage(e.target.value)}
    //     />
    //   </div>
    //   <div className="form-group">
    //     <label htmlFor="educationalBackground">Educational Background</label>
    //     <input
    //       type="text"
    //       id="educationalBackground"
    //       value={educationalBackground}
    //       onChange={(e) => setEducationalBackground(e.target.value)}
    //     />
    //   </div>
    //   <button type="submit">Submit</button>
    // </form>