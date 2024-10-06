import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';
import './SkillList.css'; // Custom styling

const SkillList = () => {
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  // Fetch all skills on component mount
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('http://localhost:8703/api/skills'); // Fetch skills from the backend
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills(); // Call the function to fetch skills
  }, []); // Empty dependency array ensures it runs once on component mount

  // Handle "Show More" button click to navigate to user's profile
  const handleShowMore = (userId) => {
    navigate(`/display-data/${userId}`);
  };

  return (
    <div className="skills-grid">
      {skills.length > 0 ? (
        skills.map((skill) => (
          <div key={skill._id} className="skill-card">
            <h3 className="skill-name">{skill.profileName}</h3>
            <p className="skill-category">{skill.skillCategory}</p>
            {skill.profilePicture && (
              <img
                src={`http://localhost:8703${skill.profilePicture}`}
                alt={skill.profileName}
                className="profile-picture"
              />
            )}
            {/* <button
              className="show-more-button"
              onClick={() => handleShowMore(skill.user)}
            >
              Show More
            </button> */} 
            {skill._id && (
  <Link to={`/display-data/${skill.formDataId}`}>
    <button className="show-more-button">Show More</button>
  </Link>
)}
            
          </div>
        ))
      ) : (
        <p className="no-skills-message">No talents found yet.</p>
      )}
    </div>
  );
};

export default SkillList;
