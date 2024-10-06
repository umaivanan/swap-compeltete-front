import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SkillForm.css';
import CryptoJS from 'crypto-js';

const SkillForm = () => {
  const [profileName, setProfileName] = useState('');
  const [skillCategory, setSkillCategory] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const encryptedUserEmail = localStorage.getItem('userEmail');
    
    if (encryptedUserEmail) {
      const secretKey = '12345'; // Decryption key
      const decryptedEmail = CryptoJS.AES.decrypt(encryptedUserEmail, secretKey).toString(CryptoJS.enc.Utf8);
      
      if (decryptedEmail) {
        setCurrentUserEmail(decryptedEmail); // Decrypted email ஐ state-ல் set செய்க

        const checkFormSubmissionStatus = async () => {
          try {
            // Backend-க்கு request அனுப்புதல்
            const response = await axios.post('http://localhost:8703/api/skills/check-form', { email: decryptedEmail });
            console.log('Backend Response:', response.data); // Response ஐ console-ல் log செய்து சரிபார்க்க
            if (response.data.formSubmitted) {
              // Form ஏற்கனவே submit செய்யப்பட்டால்
              navigate('/list'); // Redirect user to list page
            }
          } catch (error) {
            console.error('Error checking form submission status:', error);
          }
        };
        checkFormSubmissionStatus(); // Function call
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

      // Backend-ல் submittedStatus ஐ true ஆக update செய்யும் patch request
      // await axios.patch(`http://localhost:8703/api/skills/${skillId}`, { submittedStatus: true });
      await axios.patch(`http://localhost:8703/api/skills/${skillId}`, { submittedStatus: true });


      // Form submit செய்த பிறகு, List page-க்கு redirect
      navigate('/additionalInformation', { state: { skillId: skillId } });

    } catch (error) {
      console.error('Error uploading skill', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="profileName">Profile Name</label>
        <input
          type="text"
          id="profileName"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="skillCategory">Skill Category</label>
        <input
          type="text"
          id="skillCategory"
          value={skillCategory}
          onChange={(e) => setSkillCategory(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="profilePicture">Profile Picture (Optional)</label>
        <input
          type="file"
          id="profilePicture"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SkillForm;
