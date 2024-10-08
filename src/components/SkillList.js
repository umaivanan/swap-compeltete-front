import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './SkillList.css'; // Custom styling

const SkillList = () => {
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('http://localhost:8703/api/skills'); // Fetch skills from backend
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };
    fetchSkills();
  }, []);

  const handleShowMore = (userId) => {
    navigate(`/display-data/${userId}`);
  };

  return (
    <div className="skills-grid">
      {skills.length > 0 ? (
        skills.map((skill) => (
          <div key={skill._id} className="skill-card">
            <div className="profile-picture-container">
              {skill.profilePicture && (
                <img
                  src={`http://localhost:8703${skill.profilePicture}`}
                  alt={skill.profileName}
                  className="profile-picture"
                />
              )}
            </div>
            <div className="skill-info">
              <h3 className="skill-name">{skill.profileName}</h3>
              <p className="skill-category">{skill.skillCategory}</p>
              <Link to={`/display-data/${skill.formDataId}`}>
                <button className="show-more-button">Show More</button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="no-skills-message">No talents found yet.</p>
      )}
    </div>
  );
};

export default SkillList;
