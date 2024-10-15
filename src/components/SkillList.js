

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to navigate to the detailed page
import './SkillList.css'; // Custom CSS file if needed

const SkillList = () => {
  const [usersData, setUsersData] = useState([]); // To store all users' form data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch all users' form data from the backend
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get('http://localhost:8703/api/formdata'); // Fetch all form data from the backend
        setUsersData(response.data); // Set the fetched data to the state
      } catch (error) {
        setError('Error fetching users data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData(); // Call the function to fetch data
  }, []);

  // Handle navigation to detailed view page
  const handleShowMore = (userId) => {
    navigate(`/display-data/${userId}`); // Navigate to detailed page
  };

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="skill-list-container px-4 py-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">All Users Form Data</h1>
      <div className="users-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {usersData.map((user, index) => (
          <div key={index} className="user-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            {/* Display only Course Description */}
            <p className="text-gray-600"><strong>Course Description:</strong> {user.courseDescription}</p>
            
            {/* Display the image (if available) */}
            {user.image && (
              <img
                src={`http://localhost:8703/imageUploads/${user.image}`}
                alt="User uploaded"
                className="user-image rounded-lg mt-4 w-full h-48 object-cover"
              />
            )}

            {/* "Show More" button to navigate to detailed page */}
            <button 
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => handleShowMore(user._id)} // Pass the user's ID to the show more function
            >
              Show More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillList;
