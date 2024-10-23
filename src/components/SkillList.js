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
//         const response = await axios.get('http://localhost:8707/api/formdata');
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
//                 src={`http://localhost:8707/imageUploads/${user.image}`}
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


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import DisplayData from './DisplayData'; // Import DisplayData component

// const SkillList = () => {
//   const [usersData, setUsersData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedId, setSelectedId] = useState(null); // State to handle selected user ID for the modal
//   const [zoomedCard, setZoomedCard] = useState(null); // State to handle zoomed card
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8707/api/formdata');
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

//   // Handle opening the popup
//   const handleShowMore = (userId) => {
//     setSelectedId(userId); // Set the selected user ID
//   };

//   // Handle closing the popup
//   const handleClosePopup = () => {
//     setSelectedId(null); // Reset selected ID to close the popup
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
//     <div className={`skill-list-container px-4 py-8 bg-white `}>
//       <h1 className="text-4xl font-bold text-center mb-12 text-cyan-500">Explore Our Courses</h1>
//       <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${selectedId ? 'blur' : ''}`}>

//         {usersData.map((user, index) => (
//           <div
//             key={index}
//             onClick={() => handleCardClick(index)} // Handle card click for zoom effect
//             className={`relative bg-gradient-to-r from-[#ebf8ff] to-[#e6f7ff] p-6 rounded-lg shadow-xl transition-transform duration-300 ${generateCardSize()} ${
//               zoomedCard === index ? 'scale-110 z-10' : ''
//             }`} // Apply zoom effect if clicked
//             style={{ cursor: 'pointer' }} // Change cursor to pointer
//           >
//             <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-4 rounded-lg">
//               <h2 className="text-white font-bold text-lg mb-2">
//                 {user.courseDescription}
//               </h2>
//               <button
//                 className={`absolute bottom-4 right-4 py-2 px-4 text-white rounded-full shadow-lg hover:shadow-2xl transition-all ${generateRandomColor()}`}
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent card click from triggering
//                   handleShowMore(user._id); // Show the popup with selected ID
//                 }}
//               >
//                 Show More
//               </button>
//             </div>
//             {user.image && (
//               <img
//                 src={`http://localhost:8707/imageUploads/${user.image}`}
//                 alt="Course"
//                 className="object-cover w-full h-full rounded-lg"
//               />
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Modal for DisplayData */}
//       {selectedId && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <button
//               className="close-button"
//               onClick={handleClosePopup} // Close modal using the new function
//             >
//               Close
//             </button>
//             {/* Render DisplayData with selected user ID and pass the onClose function */}
//             <DisplayData id={selectedId} onClose={handleClosePopup} /> 
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SkillList;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import DisplayData from './DisplayData'; // Import DisplayData component

// const SkillList = () => {
//   const [usersData, setUsersData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedId, setSelectedId] = useState(null); // State to handle selected user ID for the modal
//   const [zoomedCard, setZoomedCard] = useState(null); // State to handle zoomed card
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8707/api/formdata');
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

//   // Handle opening the popup
//   const handleShowMore = (userId) => {
//     setSelectedId(userId); // Set the selected user ID
//   };

//   // Handle closing the popup
//   const handleClosePopup = () => {
//     setSelectedId(null); // Reset selected ID to close the popup
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

//   return (
//     <div className={`skill-list-container px-4 py-8 bg-white `}>
//       <h1 className="text-4xl font-bold text-center mb-12 text-cyan-500">Explore Our Courses</h1>
//       <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${selectedId ? 'blur' : ''}`}>
//         {usersData.map((user, index) => (
//           <div
//             key={index}
//             onClick={() => handleCardClick(index)} // Handle card click for zoom effect
//             className={`relative bg-gradient-to-r from-[#ebf8ff] to-[#e6f7ff] p-6 rounded-lg shadow-xl transition-transform duration-300 h-72 ${
//               zoomedCard === index ? 'scale-110 z-10' : ''
//             }`} // Apply zoom effect if clicked, fixed height to 72 (same for all cards)
//             style={{ cursor: 'pointer' }} // Change cursor to pointer
//           >
//             <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-4 rounded-lg">
//               <h2 className="text-white font-bold text-lg mb-2">
//                 {user.courseDescription}
//               </h2>
//               <button
//                 className={`absolute bottom-4 right-4 py-2 px-4 text-white rounded-full shadow-lg hover:shadow-2xl transition-all ${generateRandomColor()}`}
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent card click from triggering
//                   handleShowMore(user._id); // Show the popup with selected ID
//                 }}
//               >
//                 Show More
//               </button>
//             </div>
//             {user.image && (
//               <img
//                 src={`http://localhost:8707/imageUploads/${user.image}`}
//                 alt="Course"
//                 className="object-cover w-full h-full rounded-lg"
//               />
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Modal for DisplayData */}
//       {selectedId && (
//         <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="modal-content bg-white p-8 rounded-lg shadow-xl">
//             <button
//               className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4"
//               onClick={handleClosePopup} // Close modal using the new function
//             >
//               Close
//             </button>
//             {/* Render DisplayData with selected user ID and pass the onClose function */}
//             <DisplayData id={selectedId} onClose={handleClosePopup} /> 
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SkillList;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import DisplayData from './DisplayData'; // Import DisplayData component

// const SkillList = () => {
//   const [usersData, setUsersData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedId, setSelectedId] = useState(null); // State to handle selected user ID for the modal
//   const [zoomedCard, setZoomedCard] = useState(null); // State to handle zoomed card
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8707/api/formdata');
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

//   // Handle opening the popup
//   const handleShowMore = (userId) => {
//     setSelectedId(userId); // Set the selected user ID
//   };

//   // Handle closing the popup
//   const handleClosePopup = () => {
//     setSelectedId(null); // Reset selected ID to close the popup
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

//   // Divide the usersData into rows with different card counts (3, 4, 3 pattern)
//   const chunkArray = (array, chunkSizes) => {
//     let i = 0;
//     const result = [];
//     while (i < array.length) {
//       for (const size of chunkSizes) {
//         result.push(array.slice(i, i + size));
//         i += size;
//       }
//     }
//     return result;
//   };

//   // Define the chunk sizes for each row (3, 4, 3)
//   const chunkedUsersData = chunkArray(usersData, [3, 4, 3]);

//   return (
//     <div className={`skill-list-container px-4 py-8 bg-white `}>
//       <h1 className="text-4xl font-bold text-center mb-12 text-cyan-500">Explore Our Courses</h1>

//       {chunkedUsersData.map((row, rowIndex) => (
//         <div
//           key={rowIndex}
//           className={`grid ${
//             rowIndex % 2 === 1 ? 'grid-cols-4' : 'grid-cols-3'
//           } gap-8 mb-8`} // Alternate between 3 and 4 columns
//         >
//           {row.map((user, index) => (
//             <div
//               key={index}
//               onClick={() => handleCardClick(index)} // Handle card click for zoom effect
//               className={`relative bg-gradient-to-r from-[#ebf8ff] to-[#e6f7ff] p-6 rounded-lg shadow-xl transition-transform duration-300 h-72 ${
//                 zoomedCard === index ? 'scale-110 z-10' : ''
//               }`} // Apply zoom effect if clicked, fixed height to 72 (same for all cards)
//               style={{ cursor: 'pointer' }} // Change cursor to pointer
//             >
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-4 rounded-lg">
//                 <h2 className="text-white font-bold text-lg mb-2">
//                   {user.courseDescription}
//                 </h2>
//                 <button
//                   className={`absolute bottom-4 right-4 py-2 px-4 text-white rounded-full shadow-lg hover:shadow-2xl transition-all ${generateRandomColor()}`}
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent card click from triggering
//                     handleShowMore(user._id); // Show the popup with selected ID
//                   }}
//                 >
//                   Show More
//                 </button>
//               </div>
//               {user.image && (
//                 <img
//                   src={`http://localhost:8707/imageUploads/${user.image}`}
//                   alt="Course"
//                   className="object-cover w-full h-full rounded-lg"
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       ))}

//       {/* Modal for DisplayData */}
//       {selectedId && (
//         <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="modal-content bg-white p-8 rounded-lg shadow-xl">
//             <button
//               className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4"
//               onClick={handleClosePopup} // Close modal using the new function
//             >
//               Close
//             </button>
//             {/* Render DisplayData with selected user ID and pass the onClose function */}
//             <DisplayData id={selectedId} onClose={handleClosePopup} /> 
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SkillList;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import DisplayData from './DisplayData'; // Import DisplayData component

// const SkillList = () => {
//   const [usersData, setUsersData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]); // To store filtered data
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedId, setSelectedId] = useState(null); // State to handle selected user ID for the modal
//   const [zoomedCard, setZoomedCard] = useState(null); // State to handle zoomed card
//   const [searchTerm, setSearchTerm] = useState(''); // State for search input
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8707/api/formdata');
//         setUsersData(response.data);
//         setFilteredData(response.data); // Initially, display all data
//       } catch (error) {
//         setError('Error fetching users data');
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllData();
//   }, []);

//   // Handle opening the popup
//   const handleShowMore = (userId) => {
//     setSelectedId(userId); // Set the selected user ID
//   };

//   // Handle closing the popup
//   const handleClosePopup = () => {
//     setSelectedId(null); // Reset selected ID to close the popup
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

//   // Filter data based on search input
//   useEffect(() => {
//     if (searchTerm === '') {
//       setFilteredData(usersData); // Show all data if no search term
//     } else {
//       const filtered = usersData.filter((user) =>
//         user.courseDescription.toLowerCase().includes(searchTerm.toLowerCase()) // Filter based on course description
//       );
//       setFilteredData(filtered);
//     }
//   }, [searchTerm, usersData]); // Re-run the filter whenever searchTerm or usersData changes

//   // Divide the usersData into rows with different card counts (3, 4, 3 pattern)
//   const chunkArray = (array, chunkSizes) => {
//     let i = 0;
//     const result = [];
//     while (i < array.length) {
//       for (const size of chunkSizes) {
//         result.push(array.slice(i, i + size));
//         i += size;
//       }
//     }
//     return result;
//   };

//   // Define the chunk sizes for each row (3, 4, 3)
//   const chunkedUsersData = chunkArray(filteredData, [3, 4, 3]);

//   return (
//     <div className={`skill-list-container px-4 py-8 bg-white `}>
//       <h1 className="text-4xl font-bold text-center mb-12 text-cyan-500">Explore Our Courses</h1>

//       {/* Search Bar */}
//       <div className="flex justify-center mb-20">
//         <input
//           type="text"
//           placeholder="What kind of module do you want?"
//           className="w-2/3 md:w-1/2 p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-cyan-500"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm as user types
//         />
//       </div>

//       {chunkedUsersData.map((row, rowIndex) => (
//         <div
//           key={rowIndex}
//           className={`grid ${
//             rowIndex % 2 === 1 ? 'grid-cols-4' : 'grid-cols-3'
//           } gap-8 mb-8`} // Alternate between 3 and 4 columns
//         >
//           {row.map((user, index) => (
//             <div
//               key={index}
//               onClick={() => handleCardClick(index)} // Handle card click for zoom effect
//               className={`relative bg-gradient-to-r from-[#ebf8ff] to-[#e6f7ff] p-6 rounded-lg shadow-xl transition-transform duration-300 h-72 ${
//                 zoomedCard === index ? 'scale-110 z-10' : ''
//               }`} // Apply zoom effect if clicked, fixed height to 72 (same for all cards)
//               style={{ cursor: 'pointer' }} // Change cursor to pointer
//             >
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-4 rounded-lg">
//                 <h2 className="text-white font-bold text-lg mb-2">
//                   {user.courseDescription}
//                 </h2>
//                 <button
//                   className={`absolute bottom-4 right-4 py-2 px-4 text-white rounded-full shadow-lg hover:shadow-2xl transition-all ${generateRandomColor()}`}
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent card click from triggering
//                     handleShowMore(user._id); // Show the popup with selected ID
//                   }}
//                 >
//                   Show More
//                 </button>
//               </div>
//               {user.image && (
//                 <img
//                   src={`http://localhost:8707/imageUploads/${user.image}`}
//                   alt="Course"
//                   className="object-cover w-full h-full rounded-lg"
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       ))}

//       {/* Modal for DisplayData */}
//       {selectedId && (
//         <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="modal-content bg-white p-8 rounded-lg shadow-xl">
//             <button
//               className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4"
//               onClick={handleClosePopup} // Close modal using the new function
//             >
//               Close
//             </button>
//             {/* Render DisplayData with selected user ID and pass the onClose function */}
//             <DisplayData id={selectedId} onClose={handleClosePopup} /> 
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SkillList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DisplayData from './DisplayData'; // Import DisplayData component

const SkillList = () => {
  const [usersData, setUsersData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // To store filtered data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null); // State to handle selected user ID for the modal
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get('http://localhost:8707/api/formdata');
        setUsersData(response.data);
        setFilteredData(response.data); // Initially, display all data
      } catch (error) {
        setError('Error fetching users data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Handle opening the popup
  const handleShowMore = (userId) => {
    setSelectedId(userId); // Set the selected user ID
  };

  // Handle closing the popup
  const handleClosePopup = () => {
    setSelectedId(null); // Reset selected ID to close the popup
  };

  // Helper function to generate random button colors
  const generateRandomColor = () => {
    const colors = ['bg-red-400', 'bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-purple-400'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Filter data based on search input
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredData(usersData); // Show all data if no search term
    } else {
      const filtered = usersData.filter((user) =>
        user.courseDescription.toLowerCase().includes(searchTerm.toLowerCase()) // Filter based on course description
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, usersData]); // Re-run the filter whenever searchTerm or usersData changes

  // Divide the usersData into rows with different card counts (3, 4, 3 pattern)
  const chunkArray = (array, chunkSizes) => {
    let i = 0;
    const result = [];
    while (i < array.length) {
      for (const size of chunkSizes) {
        result.push(array.slice(i, i + size));
        i += size;
      }
    }
    return result;
  };

  // Define the chunk sizes for each row (3, 4, 3)
  const chunkedUsersData = chunkArray(filteredData, [3, 4, 3]);

  return (
    <div className={`skill-list-container px-4 py-8 bg-white `}>
      <h1 className="text-4xl font-bold text-center mb-12 text-cyan-500">Explore Our Courses</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-20">
        <input
          type="text"
          placeholder="What kind of module do you want?"
          className="w-2/3 md:w-1/2 p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm as user types
        />
      </div>

      {chunkedUsersData.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`grid ${
            rowIndex % 2 === 1 ? 'grid-cols-4' : 'grid-cols-3'
          } gap-8 mb-8`} // Alternate between 3 and 4 columns
        >
          {row.map((user) => (
            <div
              key={user._id} // Make sure each card has a unique key (like user ID)
              onClick={() => handleShowMore(user._id)} // Remove zoom effect, keep only the show more functionality
              className={`relative bg-gradient-to-r from-[#ebf8ff] to-[#e6f7ff] p-6 rounded-lg shadow-xl h-72`} // Removed zoom-related classes
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
                  src={`http://localhost:8707/imageUploads/${user.image}`}
                  alt="Course"
                  className="object-cover w-full h-full rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Modal for DisplayData */}
      {selectedId && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="modal-content bg-white p-8 rounded-lg shadow-xl">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4"
              onClick={handleClosePopup} // Close modal using the new function
            >
              Close
            </button>
            {/* Render DisplayData with selected user ID and pass the onClose function */}
            <DisplayData id={selectedId} onClose={handleClosePopup} /> 
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillList;
