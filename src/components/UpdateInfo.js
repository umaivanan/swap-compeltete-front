

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UpdateInfo.css'; // CSS for styling
import { SkillContext } from '../context/SkillContext'; // Import the SkillContext

const UpdateInfo = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [files, setFiles] = useState({
    roadmapIntroduction: null,
    profilePicture: null,
    chapters: {}, // Store files for chapters
  });

  const [uploadedChapters, setUploadedChapters] = useState(0); // Track the number of chapters uploaded (1 to 10)
  
  const { skills, setSkills } = useContext(SkillContext); 
  const userSkill = skills.find(skill => skill.user === id); // Get user's skill

  // Fetch form data and skills
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formResponse = await axios.get(`http://localhost:8707/api/formdata/${id}`);
        setData(formResponse.data); // Update form data

        const skillResponse = await axios.get('http://localhost:8707/api/skills');
        setSkills(skillResponse.data); // Update skill context
      } catch (error) {
        setError('Error fetching data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, setSkills]);

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      // Handle roadmapIntroduction and profilePicture separately
      if (name === 'roadmapIntroduction') {
        setFiles((prevFiles) => ({ ...prevFiles, roadmapIntroduction: files[0] }));
      } else if (name === 'profilePicture') {
        setFiles((prevFiles) => ({ ...prevFiles, profilePicture: files[0] }));
      } else {
        // Set the chapter file (e.g., chapter1, chapter2)
        setFiles((prevFiles) => ({
          ...prevFiles,
          chapters: {
            ...prevFiles.chapters,
            [name]: files[0], // Name could be chapter1, chapter2, etc.
          },
        }));
        setUploadedChapters(uploadedChapters + 1); // Enable next chapter upload
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all form data fields
    for (const key in data) {
      formData.append(key, data[key]);
    }

    // Append files (roadmapIntroduction, profilePicture)
    if (files.roadmapIntroduction) {
      formData.append('roadmapIntroduction', files.roadmapIntroduction);
    }
    if (files.profilePicture) {
      formData.append('profilePicture', files.profilePicture);
    }

    // Append each chapter (1 to uploadedChapters)
    for (let i = 1; i <= uploadedChapters; i++) {
      formData.append(`chapter${i}`, files.chapters[`chapter${i}`]);
    }

    try {
      const response = await axios.put(`http://localhost:8707/api/formdata/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // If the skill is available, update its formDataId
      if (userSkill) {
        const formDataId = response.data.formData._id;
        await axios.patch(`http://localhost:8707/api/skills/${userSkill._id}`, { formDataId });
      }

      alert('Data updated successfully!');
    } catch (error) {
      console.error('Error updating data', error);
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="update-info-container">
      <div className="card form-section">
        <h1 className="heading">User Information</h1>
        <form onSubmit={handleSubmit}>
          {/* Other form fields (text inputs) */}
          <div className="form-group">
            <label>Profile Name:</label>
            <input
              type="text"
              name="profileName"
              value={data.profileName || userSkill?.profileName || ''} 
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Profile Picture:</label>
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
            />
            {userSkill?.profilePicture && (
              <img
                src={`http://localhost:8707${userSkill.profilePicture}`} 
                alt="Profile"
                className="profile-picture"
              />
            )}
          </div>

          {/* Add other form fields similarly */}
          <button type="submit" className="submit-button">Update Information</button>
        </form>
      </div>

      {/* PDF Upload Section */}
      <div className="card pdf-upload-section">
        <h1 className="heading">Upload PDF Files</h1>

        {/* Upload Roadmap Introduction */}
        <div className="form-group">
          <label>Upload Roadmap Introduction:</label>
          <input
            type="file"
            name="roadmapIntroduction"
            onChange={handleFileChange}
          />
        </div>

        {/* One-by-One Chapter Uploads */}
        {[...Array(10)].map((_, index) => (
          <div className="form-group" key={index}>
            {index + 1 <= uploadedChapters + 1 ? (
              <>
                <label>Upload Chapter {index + 1}:</label>
                <input
                  type="file"
                  name={`chapter${index + 1}`} // Name will be chapter1, chapter2, etc.
                  onChange={handleFileChange}
                />
              </>
            ) : (
              <div className="disabled-chapter">
                {/* If the chapter cannot be uploaded yet */}
                <label>Upload Chapter {index + 1} (Locked):</label>
                <input type="file" disabled />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateInfo;
