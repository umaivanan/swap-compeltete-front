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
//             const response = await axios.post('http://localhost:8703/api/skills/check-form', { email: decryptedEmail });
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
//       const response = await axios.post('http://localhost:8703/api/skills', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const skillId = response.data._id;

//       // Backend update for submittedStatus
//       await axios.patch(`http://localhost:8703/api/skills/${skillId}`, { submittedStatus: true });

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

const SkillForm = () => {
  const [profileName, setProfileName] = useState('');
  const [skillCategory, setSkillCategory] = useState('');
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
        setCurrentUserEmail(decryptedEmail); // Decrypted email is set in the state

        // Check if form submission status is already saved in localStorage
        const formSubmittedStatus = localStorage.getItem(`formSubmitted_${decryptedEmail}`);
        
        if (formSubmittedStatus === 'true') {
          // If form is already submitted (status true in localStorage), redirect to list page
          navigate('/list');
        } else {
          const checkFormSubmissionStatus = async () => {
            try {
              const response = await axios.post('http://localhost:8703/api/skills/check-form', { email: decryptedEmail });
              console.log('Backend Response:', response.data);
              if (response.data.formSubmitted) {
                // Save the form submission status in localStorage if backend says it's submitted
                localStorage.setItem(`formSubmitted_${decryptedEmail}`, 'true');
                navigate('/list'); // Redirect to list page
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
    formData.append('skillCategory', skillCategory);
    formData.append('email', currentUserEmail);  // Add email to formData
    formData.append('preferredLanguage', preferredLanguage); // Add Preferred Language
    formData.append('educationalBackground', educationalBackground); // Add Educational Background

    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await axios.post('http://localhost:8703/api/skills', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const skillId = response.data._id;

      // Backend update for submittedStatus
      await axios.patch(`http://localhost:8703/api/skills/${skillId}`, { submittedStatus: true });

      // Save the form submission status to localStorage
      localStorage.setItem(`formSubmitted_${currentUserEmail}`, 'true');

      // Redirect after form submission
      navigate('/additionalInformation', { state: { skillId: skillId } });

    } catch (error) {
      console.error('Error uploading skill', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="skill-form">
      <div className="form-group">
        <label htmlFor="profileName">Profile Name</label>
        <input
          type="text"
          id="profileName"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="skillCategory">Skill Category</label>
        <input
          type="text"
          id="skillCategory"
          value={skillCategory}
          onChange={(e) => setSkillCategory(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="profilePicture">Profile Picture (Optional)</label>
        <input
          type="file"
          id="profilePicture"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
      </div>
      <div className="form-group">
        <label htmlFor="preferredLanguage">Preferred Language</label>
        <input
          type="text"
          id="preferredLanguage"
          value={preferredLanguage}
          onChange={(e) => setPreferredLanguage(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="educationalBackground">Educational Background</label>
        <input
          type="text"
          id="educationalBackground"
          value={educationalBackground}
          onChange={(e) => setEducationalBackground(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SkillForm;
