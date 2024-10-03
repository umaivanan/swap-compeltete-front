import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './DataDisplay.css'; // Custom CSS for card design
import { SkillContext } from '../context/SkillContext';
import logo from '/home/ukijaffna/Documents/october 1/swapSmartFrontend/src/assets/lo2.jpg';  // Import the logo image

const DisplayData = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();  // Extract user ID from the URL
  const { skills, setSkills } = useContext(SkillContext); // Get and set skills from context
  const userSkill = skills.find(skill => skill.user === id);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8703/api/formdata/${id}`);
        setData(response.data);  // Set data retrieved from the API
      } catch (error) {
        setError('Error fetching data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Fetch skills data
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('http://localhost:8703/api/skills'); // Fetch skills from the backend
        setSkills(response.data);  // Update skills in context
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, [setSkills]);

  // If the data is loading, show a loading message
  if (loading) return <p className="loading">Loading...</p>;

  // If there's an error, show the error message
  if (error) return <p className="error">{error}</p>;

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
            <Link to={`/update-info/${id}`}>
              <img src={logo} alt="Update Info" className="update-logo" />
            </Link>
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
          <Link to={`/update-info/${id}`}>
            <img src={logo} alt="Update Info" className="update-logo" />
          </Link>
        </div>

        {/* PDF Links */}
        <div className="pdf-links-section">
          <h2>PDF Links</h2>
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
          {data.firstChapter && (
            <div className="pdf-card">
              <a
                href={`http://localhost:8703/pdfUploads/${data.firstChapter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View First Chapter
              </a>
            </div>
          )}
          {data.secondChapter && (
            <div className="pdf-card">
              <a
                href={`http://localhost:8703/pdfUploads/${data.secondChapter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Second Chapter
              </a>
            </div>
          )}
          {data.thirdChapter && (
            <div className="pdf-card">
              <a
                href={`http://localhost:8703/pdfUploads/${data.thirdChapter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Third Chapter
              </a>
            </div>
          )}
          {data.fourthChapter && (
            <div className="pdf-card">
              <a
                href={`http://localhost:8703/pdfUploads/${data.fourthChapter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Fourth Chapter
              </a>
            </div>
          )}
          {data.fifthChapter && (
            <div className="pdf-card">
              <a
                href={`http://localhost:8703/pdfUploads/${data.fifthChapter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Fifth Chapter
              </a>
            </div>
          )}
          {data.sixthChapter && (
            <div className="pdf-card">
              <a
                href={`http://localhost:8703/pdfUploads/${data.sixthChapter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Sixth Chapter
              </a>
            </div>
          )}
          {data.seventhChapter && (
            <div className="pdf-card">
              <a
                href={`http://localhost:8703/pdfUploads/${data.seventhChapter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Seventh Chapter
              </a>
            </div>
          )}
          {data.eighthChapter && (
            <div className="pdf-card">
              <a
                href={`http://localhost:8703/pdfUploads/${data.eighthChapter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Eighth Chapter
              </a>
            </div>
          )}
          {data.ninthChapter && (
            <div className="pdf-card">
              <a
                href={`http://localhost:8703/pdfUploads/${data.ninthChapter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Ninth Chapter
              </a>
            </div>
          )}
          {data.tenthChapter && (
            <div className="pdf-card">
              <a
                href={`http://localhost:8703/pdfUploads/${data.tenthChapter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Tenth Chapter
              </a>
            </div>
          )}
          <Link to={`/update-info/${id}`}>
            <img src={logo} alt="Update Info" className="update-logo" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
