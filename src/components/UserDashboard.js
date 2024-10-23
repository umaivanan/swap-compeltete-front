import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [skillData, setSkillData] = useState(null);
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileName, setProfileName] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('');
  const [educationalBackground, setEducationalBackground] = useState('');
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture
  const [updatedForm, setUpdatedForm] = useState({});
  const skillId = localStorage.getItem('skillId');

  const fetchSkill = async () => {
    if (!skillId) {
      setError(new Error('No skill ID found in local storage.'));
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8707/api/skills/${skillId}`);
      setSkillData(response.data);
      setProfileName(response.data.profileName);
      setPreferredLanguage(response.data.preferredLanguage);
      setEducationalBackground(response.data.educationalBackground);
      setProfilePicture(response.data.profilePicture); // Set profile picture URL
    } catch (err) {
      console.error('Error fetching skill data:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFormData = async () => {
    if (!skillId) return;

    try {
      const response = await axios.get(`http://localhost:8707/api/formdata`);
      setFormData(response.data); // Set all form data related to skillId
    } catch (err) {
      console.error('Error fetching form data:', err);
      setError(err);
    }
  };

  const handleFormChange = (e, fieldName) => {
    setUpdatedForm({
      ...updatedForm,
      [fieldName]: e.target.value,
    });
  };

  const handleFileChange = (e, fieldName) => {
    setUpdatedForm({
      ...updatedForm,
      [fieldName]: e.target.files[0], // Handle file input
    });
  };

  const updateFormData = async (id) => {
    const formDataObj = new FormData();
  
    // Append non-file fields
    Object.keys(updatedForm).forEach((key) => {
      if (key !== 'image') {
        formDataObj.append(key, updatedForm[key]);
      }
    });
  
    // Only append the image field if a new file has been uploaded
    if (updatedForm.image && updatedForm.image instanceof File) {
      formDataObj.append('image', updatedForm.image);
    }
  
    try {
      const response = await axios.patch(`http://localhost:8707/api/formdata/${id}`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        alert('Form data updated successfully');
        setFormData((prevFormData) =>
          prevFormData.map((form) => (form._id === id ? response.data.formData : form))
        );
        // Fetch form data again to refresh the UI
        fetchFormData();
      } else {
        alert('Failed to update form data. Please try again.');
      }
    } catch (err) {
      console.error('Error updating form data:', err);
      setError(err);
      alert('An error occurred while updating the form data.');
    }
  };
  

  const updateSkill = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Use FormData to handle file uploads
    formData.append('profileName', profileName);
    formData.append('preferredLanguage', preferredLanguage);
    formData.append('educationalBackground', educationalBackground);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await axios.patch(`http://localhost:8707/api/skills/${skillId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the correct content type
        },
      });

      if (response.status === 200) {
        alert('Skill updated successfully');
        setSkillData(response.data);
        setProfilePicture(response.data.profilePicture);
      } else {
        alert('Failed to update skill. Please try again.');
      }
    } catch (err) {
      console.error('Error updating skill:', err);
      setError(err);
      alert('An error occurred while updating the skill.');
    }
  };

  useEffect(() => {
    fetchSkill();
    fetchFormData();
  }, [skillId]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error.message}</div>;
  }

  // Filter formData to only include entries that match the skillId
  const filteredFormData = formData.filter((form) => form.skill._id === skillId);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center">User Dashboard</h1>
      {skillData && (
        <div className="skill-info mt-6">
          <h2 className="text-2xl font-semibold mb-4">Skill Information</h2>
          <img
            src={`http://localhost:8707${profilePicture}` || 'default_profile_picture_url.jpg'}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4"
          />
          <form onSubmit={updateSkill} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Name:</label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Preferred Language:</label>
              <input
                type="text"
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Educational Background:</label>
              <input
                type="text"
                value={educationalBackground}
                onChange={(e) => setEducationalBackground(e.target.value)}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Picture:</label>
              <input
                type="file"
                onChange={(e) => setProfilePicture(e.target.files[0])}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Update Skill
            </button>
          </form>
        </div>
      )}
      {filteredFormData.length > 0 && (
        <div className="form-data mt-6">
          <h2 className="text-2xl font-semibold mb-4">Form Data</h2>
          {filteredFormData.map((form) => (
            <div key={form._id} className="p-4 bg-gray-100 rounded-md shadow-sm mb-4">
              {Object.keys(form).map((key) => (
                key !== '_id' && key !== 'skill' && (
                  <div key={key} className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 capitalize">{key}:</label>
                    {key.includes('Chapter') || key.includes('image') ? (
                      <>
                        {/* Display the image if it's an image field */}
                        {form[key] && (
                          <img
                            src={`http://localhost:8707/imageUploads/${form.image}`}
                            alt="Formdataimage"
                            className="w-32 h-32 rounded-md mb-4"
                          />
                        )}
                        <input
                          type="file"
                          onChange={(e) => handleFileChange(e, key)}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
                        />
                      </>
                    ) : (
                      <input
                        type="text"
                        value={updatedForm[key] || form[key]}
                        onChange={(e) => handleFormChange(e, key)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
                      />
                    )}
                  </div>
                )
              ))}
              <button
                onClick={() => updateFormData(form._id)}
                className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200"
              >
                Update Form
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
