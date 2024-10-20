import React, { useContext } from 'react';
import { SkillContext } from '../context/SkillContext';  // Import SkillContext

const FileDisplay = () => {
  // useContext மூலம் SkillContext-ஐ access செய்கிறது
  const { skills, loading, error } = useContext(SkillContext);

  // Loading state handle செய்ய
  if (loading) return <p>Loading...</p>;

  // Error state handle செய்ய
  if (error) return <p>{error}</p>;

  // skills array-ஐ map செய்து file locations-ஐ display செய்கிறது
  return (
    <div>
      {skills.map(skill => (
        <div key={skill._id}>
          <h3>{skill.profileName}</h3>
          <p>Skill Category: {skill.skillCategory}</p>

          {/* Profile Picture Display */}
          {skill.profilePicture && (
            <div>
              <p>Profile Picture:</p>
              {/* File location to display as image */}
              <img
                src={`http://localhost:8703${skill.profilePicture}`} 
                alt="Profile"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          )}

          {/* PDF or Document Display */}
          {skill.documentPath && (
            <div>
              <p>Document:</p>
              {/* File location to display as a link */}
              <a href={`http://localhost:8703${skill.documentPath}`} target="_blank" rel="noopener noreferrer">
                View Document
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FileDisplay;
