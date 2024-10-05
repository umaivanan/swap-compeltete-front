
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SkillForm.css';

const SkillForm = () => {
  const [profileName, setProfileName] = useState('');
  const [skillCategory, setSkillCategory] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState(''); // Track the current user email
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the current user email from localStorage
    const userEmail = localStorage.getItem('userEmail');
    console.log('Current user email:', userEmail);  // Check the email value
    
    if (!userEmail) {
      console.error('No user email found in localStorage');
      return;
    }

    // Set the currentUserEmail state with the value from localStorage
    setCurrentUserEmail(userEmail);  // Update currentUserEmail state

    // Check if this user has already submitted the form
    const formSubmittedForUser = localStorage.getItem(`formSubmitted_${userEmail}`);
    console.log('Form submission status:', formSubmittedForUser);  // Check the form submission status
    
    if (formSubmittedForUser === 'true') {
      // If the form is already submitted by this user, navigate to the list page
      navigate('/list');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure user email is set
    if (!currentUserEmail) {
      console.error('No user email available to submit the form');
      return;
    }

    const formData = new FormData();
    formData.append('profileName', profileName);
    formData.append('skillCategory', skillCategory);
    formData.append('email', currentUserEmail);  // Add the email to formData

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

      // Save form submission status and skillId for this specific user in localStorage
      localStorage.setItem(`formSubmitted_${currentUserEmail}`, 'true');
      localStorage.setItem(`skillId_${currentUserEmail}`, skillId);

      // Navigate to the AdditionalInformation page after successful submission
      navigate('/additionalInformation', { state: { skillId } }); // Pass skillId to AdditionalInformation
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


