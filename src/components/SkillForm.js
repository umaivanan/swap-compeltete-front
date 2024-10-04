import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SkillForm.css';

const SkillForm = () => {
  const [profileName, setProfileName] = useState('');
  const [skillCategory, setSkillCategory] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user has already submitted the form
    const isFormSubmitted = sessionStorage.getItem('formSubmitted');
    
    if (isFormSubmitted) {
      // Remove previous skillId to ensure fresh submission
      sessionStorage.removeItem('skillId');
      navigate('/list');  // Remove or replace with your appropriate route
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve the user email from session storage
    const userEmail = sessionStorage.getItem('userEmail');
    if (!userEmail) {
      console.error('No user email found in session storage');
      return;
    }

    const formData = new FormData();
    formData.append('profileName', profileName);
    formData.append('skillCategory', skillCategory);
    formData.append('email', userEmail);  // Add the email to formData

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
      sessionStorage.setItem('formSubmitted', 'true');  // Update form submission status
      sessionStorage.setItem('skillId', skillId);  // Store the new skillId

      // Navigate to AdditionalInformation with the new skillId
      navigate('/additionalInformation', { state: { skillId } });
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
      <button type="submit">Continue</button>
    </form>
  );
};

export default SkillForm;
