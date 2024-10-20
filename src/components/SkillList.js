// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const SkillList = () => {
//   const [usersData, setUsersData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [zoomedCard, setZoomedCard] = useState(null); // State to handle zoomed card
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8706/api/formdata');
//         setUsersData(response.data);
//       } catch (error) {
//         setError('Error fetching users data');
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllData();
//   }, []);

//   const handleShowMore = (userId) => {
//     navigate(`/display-data/${userId}`);
//   };

//   // Handle card click to zoom
//   const handleCardClick = (index) => {
//     if (zoomedCard === index) {
//       setZoomedCard(null); // Un-zoom if clicked again
//     } else {
//       setZoomedCard(index); // Zoom the clicked card
//     }
//   };

//   // Helper function to generate random button colors
//   const generateRandomColor = () => {
//     const colors = ['bg-red-400', 'bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-purple-400'];
//     return colors[Math.floor(Math.random() * colors.length)];
//   };

//   // Helper function to generate random card sizes
//   const generateCardSize = () => {
//     const sizes = ['h-64', 'h-72', 'h-80', 'h-96', 'h-48'];
//     return sizes[Math.floor(Math.random() * sizes.length)];
//   };

//   return (
//     <div className="skill-list-container px-4 py-8 bg-white">
//       <h1 className="text-4xl font-bold text-center mb-12 text-cyan-500">Explore Our Courses</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {usersData.map((user, index) => (
//           <div
//             key={index}
//             onClick={() => handleCardClick(index)} // Handle card click for zoom effect
//             className={`relative bg-gradient-to-r from-[#ebf8ff] to-[#e6f7ff] p-6 rounded-lg shadow-xl transition-transform duration-300 ${generateCardSize()} ${
//               zoomedCard === index ? 'scale-110 z-10' : ''
//             }`} // Apply zoom effect if clicked
//             style={{ cursor: 'pointer' }} // Change cursor to pointer
//           >
//             {/* Overlay for the course description */}
//             <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-4 rounded-lg">
//               <h2 className="text-white font-bold text-lg mb-2">
//                 {user.courseDescription}
//               </h2>

//               {/* Random button with different colors and shapes */}
//               <button
//                 className={`absolute bottom-4 right-4 py-2 px-4 text-white rounded-full shadow-lg hover:shadow-2xl transition-all ${generateRandomColor()}`}
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent card click from triggering
//                   handleShowMore(user._id);
//                 }}
//               >
//                 Show More
//               </button>
//             </div>

//             {/* Display the image (if available) */}
//             {user.image && (
//               <img
//                 src={`http://localhost:8706/imageUploads/${user.image}`}
//                 alt="Course"
//                 className="object-cover w-full h-full rounded-lg"
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SkillList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DisplayData from './DisplayData'; // Import DisplayData component
import './SkillList.css';


const SkillList = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null); // State to handle selected user ID for the modal
  const [zoomedCard, setZoomedCard] = useState(null); // State to handle zoomed card
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get('http://localhost:8706/api/formdata');
        setUsersData(response.data);
      } catch (error) {
        setError('Error fetching users data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleShowMore = (userId) => {
    setSelectedId(userId); // Set the selected user ID
  };

  // Handle card click to zoom
  const handleCardClick = (index) => {
    if (zoomedCard === index) {
      setZoomedCard(null); // Un-zoom if clicked again
    } else {
      setZoomedCard(index); // Zoom the clicked card
    }
  };

  // Helper function to generate random button colors
  const generateRandomColor = () => {
    const colors = ['bg-red-400', 'bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-purple-400'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Helper function to generate random card sizes
  const generateCardSize = () => {
    const sizes = ['h-64', 'h-72', 'h-80', 'h-96', 'h-48'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  return (
    <div className={`skill-list-container px-4 py-8 bg-white `}>
      <h1 className="text-4xl font-bold text-center mb-12 text-cyan-500">Explore Our Courses</h1>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${selectedId ? 'blur' : ''}`}>

        {usersData.map((user, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)} // Handle card click for zoom effect
            className={`relative bg-gradient-to-r from-[#ebf8ff] to-[#e6f7ff] p-6 rounded-lg shadow-xl transition-transform duration-300 ${generateCardSize()} ${
              zoomedCard === index ? 'scale-110 z-10' : ''
            }`} // Apply zoom effect if clicked
            style={{ cursor: 'pointer' }} // Change cursor to pointer
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-4 rounded-lg">
              <h2 className="text-white font-bold text-lg mb-2">
                {user.courseDescription}
              </h2>
              <button
                className={`absolute bottom-4 right-4 py-2 px-4 text-white rounded-full shadow-lg hover:shadow-2xl transition-all ${generateRandomColor()}`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click from triggering
                  handleShowMore(user._id); // Show the popup with selected ID
                }}
              >
                Show More
              </button>
            </div>
            {user.image && (
              <img
                src={`http://localhost:8706/imageUploads/${user.image}`}
                alt="Course"
                className="object-cover w-full h-full rounded-lg"
              />
            )}
          </div>
        ))}
      </div>

      {/* Modal for DisplayData */}
      {selectedId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-button"
              onClick={() => setSelectedId(null)} // Close modal
            >
              Close
            </button>
            <DisplayData id={selectedId} /> {/* Render DisplayData with selected user ID */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillList;
