import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a new context for skill data
export const SkillContext = createContext();

// SkillProvider component to provide skills to other components
export const SkillProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch skills from backend on mount
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('http://localhost:8707/api/skills');
        setSkills(response.data);
      } catch (error) {
        setError('Error fetching skills');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <SkillContext.Provider value={{ skills,setSkills, loading, error }}>
      {children}
    </SkillContext.Provider>
  );
};
