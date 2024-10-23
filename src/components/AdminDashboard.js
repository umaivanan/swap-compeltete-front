// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//   const [skills, setSkills] = useState([]);
//   const [formDatas, setFormDatas] = useState([]); // To hold FormData records
//   const [selectedFormData, setSelectedFormData] = useState(null); // To hold selected FormData details
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch skills and form data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const formDataResponse = await axios.get(`http://localhost:8706/api/formdata`);
//         setFormDatas(formDataResponse.data); // Set form data response

//         const skillsResponse = await axios.get('http://localhost:8706/api/skills');
//         setSkills(skillsResponse.data); // Set skills response
//       } catch (error) {
//         setError('Error fetching data');
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to fetch full FormData details when a user clicks 'View Details'
//   const handleViewDetails = (formDataId) => {
//     const selectedData = formDatas.find(data => data._id === formDataId);
//     setSelectedFormData(selectedData); // Set the selected form data details
//   };

//   // Function to delete a user when 'Block User' is clicked
//   const handleBlockUser = async (formDataId) => {
//     try {
//       // Send DELETE request to backend API
//       await axios.delete(`http://localhost:8707/api/formdata/${formDataId}`);

//       // Update the frontend state to remove the blocked user
//       setFormDatas(formDatas.filter(data => data._id !== formDataId));

//     } catch (error) {
//       console.error('Error blocking user:', error);
//     }
//   };

//   if (loading) return <p className="text-cyan-500">Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="min-h-screen bg-white flex">
//       {/* Sidebar takes 1/3 of the screen */}
//       <aside className="w-1/3 bg-cyan-500 text-white p-4">
//         <button className="w-full py-2 text-white font-semibold">
//           Users with FormData and Skills
//         </button>
//       </aside>

//       {/* Content takes 3/4 of the screen */}
//       <div className="w-3/4 p-4">
//         <header className="mb-6">
//           <h1 className="text-3xl font-bold text-cyan-500">Admin Dashboard</h1>
//         </header>

//         <section className="space-y-4">
//           {formDatas.map((formData) => (
//             <div key={formData._id} className="p-4 border rounded-lg shadow-md bg-white w-full">
//               <h2
//                 className="text-xl font-bold text-cyan-500 cursor-pointer hover:underline"
//                 onClick={() => handleViewDetails(formData._id)}
//               >
//                 Form Data ID: {formData._id}
//               </h2>

//               {selectedFormData && selectedFormData._id === formData._id && (
//                 <div className="flex flex-col lg:flex-row lg:space-x-6 mt-4 w-full">
//                   <div className="w-full lg:w-1/2 space-y-4">
//                     <p><strong>Course Description:</strong> {selectedFormData.courseDescription}</p>
//                     <p><strong>Course Duration:</strong> {selectedFormData.courseDuration}</p>
//                     <p><strong>Target Audience:</strong> {selectedFormData.targetAudience}</p>
//                     <p><strong>Course Category:</strong> {selectedFormData.courseCategory}</p>
//                     <p><strong>Languages:</strong> {selectedFormData.languages}</p>
//                     <h3 className="font-bold text-lg text-cyan-500">PDF Links</h3>
//                     {/* PDF Links */}
//                     {selectedFormData.roadmapIntroduction && (
//                       <div>
//                         <a
//                           href={`http://localhost:8706/pdfUploads/${selectedFormData.roadmapIntroduction}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-cyan-500 underline"
//                         >
//                           View Roadmap Introduction PDF
//                         </a>
//                       </div>
//                     )}
//                     {/* Include other chapter links similarly... */}
//                     {['firstChapter', 'secondChapter', 'thirdChapter', 'fourthChapter', 'fifthChapter',
//                       'sixthChapter', 'seventhChapter', 'eighthChapter', 'ninthChapter', 'tenthChapter']
//                       .map((chapter, index) => (
//                         selectedFormData[chapter] && (
//                           <div key={index}>
//                             <a
//                               href={`http://localhost:8706/pdfUploads/${selectedFormData[chapter]}`}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-cyan-500 underline"
//                             >
//                               View {chapter.charAt(0).toUpperCase() + chapter.slice(1)} PDF
//                             </a>
//                           </div>
//                         )
//                       ))}
//                   </div>

//                   <div className="w-full lg:w-1/2 space-y-4">
//                     <h3 className="font-bold text-lg text-cyan-500">Profile Picture</h3>
//                     {selectedFormData.skill.profilePicture && (
//                       <img
//                         src={`http://localhost:8706${selectedFormData.skill.profilePicture}`}
//                         alt={selectedFormData.skill.profileName}
//                         className="w-24 h-24 object-cover rounded-lg"
//                       />
//                     )}

//                     <h3 className="font-bold text-lg text-cyan-500">Course Image</h3>
//                     {selectedFormData.image && (
//                       <img
//                         src={`http://localhost:8706/imageUploads/${selectedFormData.image}`}
//                         alt="Course uploaded"
//                         className="w-full h-48 object-cover rounded-lg"
//                       />
//                     )}

//                     <h3 className="font-bold text-lg text-cyan-500">Skill Details</h3>
//                     <p><strong>Skill ID:</strong> {selectedFormData.skill._id}</p>
//                     <p><strong>Profile Name:</strong> {selectedFormData.skill.profileName}</p>
//                     <p><strong>Skill Category:</strong> {selectedFormData.skill.skillCategory}</p>
//                     <p><strong>Email:</strong> {selectedFormData.skill.email}</p>
//                     <p><strong>Submitted Status:</strong> {selectedFormData.skill.submittedStatus ? 'Yes' : 'No'}</p>
//                     <p><strong>Preferred Language:</strong> {selectedFormData.skill.preferredLanguage}</p>
//                     <p><strong>Educational Background:</strong> {selectedFormData.skill.educationalBackground}</p>
//                   </div>
//                 </div>
//               )}

//               <div className="mt-4">
//                 {/* Block User button to delete the formData */}
//                 <button 
//                   className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
//                   onClick={() => handleBlockUser(formData._id)}
//                 >
//                   Block User
//                 </button>
//               </div>
//             </div>
//           ))}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//   const [skills, setSkills] = useState([]);
//   const [formDatas, setFormDatas] = useState([]); // To hold FormData records
//   const [selectedFormData, setSelectedFormData] = useState(null); // To hold selected FormData details
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch skills and form data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const formDataResponse = await axios.get(`http://localhost:8707/api/formdata`);
//         setFormDatas(formDataResponse.data); // Set form data response

//         const skillsResponse = await axios.get('http://localhost:8707/api/skills');
//         setSkills(skillsResponse.data); // Set skills response
//       } catch (error) {
//         setError('Error fetching data');
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to fetch full FormData details when a user clicks 'View Details'
//   const handleViewDetails = (formDataId) => {
//     const selectedData = formDatas.find(data => data._id === formDataId);
//     setSelectedFormData(selectedData); // Set the selected form data details
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="admin-dashboard-container">
//       <aside className="sidebar">
//         <button className={`sidebar-button active`}>
//           Users with FormData and Skills
//         </button>
//       </aside>

//       <div className="dashboard-content">
//         <header className="admin-header">
//           <h1>Admin Dashboard</h1>
//         </header>

//         <section className="dashboard-section">
//           <h2>Users</h2>
//           <table className="styled-table">
//             <thead>
//               <tr>
//                 <th>Form Data ID</th>
//                 <th>Name</th>
//                 <th>Skill Category</th>
//                 <th>Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               {formDatas.map((formData) => (
//                 <tr key={formData._id}>
//                   <td>{formData._id}</td>
//                   <td>{formData.skill.profileName}</td>
//                   <td>{formData.skill.skillCategory}</td>
//                   <td>
//                     <button onClick={() => handleViewDetails(formData._id)}>
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>

//         {/* Conditionally render selected FormData details */}
//         {selectedFormData && (
//           <div className="form-data-details">
//             <h2>Form Data Details</h2>
//             <p><strong>Where I Live:</strong> {selectedFormData.whereILive}</p>
//             <p><strong>Decade Born:</strong> {selectedFormData.decadeBorn}</p>
//             <p><strong>Time Spent:</strong> {selectedFormData.timeSpent}</p>
//             <p><strong>Work:</strong> {selectedFormData.work}</p>
//             <p><strong>Languages:</strong> {selectedFormData.languages}</p>
//             <p><strong>About Me:</strong> {selectedFormData.aboutMe}</p>

//             <h3>PDF Links</h3>
//             {selectedFormData.roadmapIntroduction && (
//               <div>
//                 <a
//                   href={`http://localhost:8707/pdfUploads/${selectedFormData.roadmapIntroduction}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   View Roadmap Introduction PDF
//                 </a>
//               </div>
//             )}
//             {selectedFormData.firstChapter && (
//               <div>
//                 <a
//                   href={`http://localhost:8707/pdfUploads/${selectedFormData.firstChapter}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   View First Chapter PDF
//                 </a>
//               </div>
//             )}
//             {selectedFormData.secondChapter && (
//               <div>
//                 <a
//                   href={`http://localhost:8707/pdfUploads/${selectedFormData.secondChapter}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   View Second Chapter PDF
//                 </a>
//               </div>
//             )}
//             {selectedFormData.thirdChapter && (
//               <div>
//                 <a
//                   href={`http://localhost:8707/pdfUploads/${selectedFormData.thirdChapter}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   View Third Chapter PDF
//                 </a>
//               </div>
//             )}
//             {selectedFormData.fourthChapter && (
//               <div>
//                 <a
//                   href={`http://localhost:8707/pdfUploads/${selectedFormData.fourthChapter}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   View Fourth Chapter PDF
//                 </a>
//               </div>
//             )}
//             {selectedFormData.fifthChapter && (
//               <div>
//                 <a
//                   href={`http://localhost:8707/pdfUploads/${selectedFormData.fifthChapter}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   View Fifth Chapter PDF
//                 </a>
//               </div>
//             )}
//             {selectedFormData.sixthChapter && (
//               <div>
//                 <a
//                   href={`http://localhost:8707/pdfUploads/${selectedFormData.sixthChapter}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   View Sixth Chapter PDF
//                 </a>
//               </div>
//             )}
//             {selectedFormData.seventhChapter && (
//               <div>
//                 <a
//                   href={`http://localhost:8707/pdfUploads/${selectedFormData.seventhChapter}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   View Seventh Chapter PDF
//                 </a>
//               </div>
//             )}
//             {selectedFormData.eighthChapter && (
//               <div>
//                 <a
//                   href={`http://localhost:8707/pdfUploads/${selectedFormData.eighthChapter}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   View Eighth Chapter PDF
//                 </a>
//               </div>
//             )}
//             {selectedFormData.ninthChapter && (
//               <div>
//                 <a
//                   href={`http://localhost:8707/pdfUploads/${selectedFormData.ninthChapter}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   View Ninth Chapter PDF
//                 </a>
//               </div>
//             )}
//             {selectedFormData.tenthChapter && (
//               <div>
//                 <a
//                   href={`http://localhost:8707/pdfUploads/${selectedFormData.tenthChapter}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   View Tenth Chapter PDF
//                 </a>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DisplayData from './DisplayData'; // Import the DisplayData component
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//   const [skills, setSkills] = useState([]);
//   const [formDatas, setFormDatas] = useState([]); 
//   const [selectedFormData, setSelectedFormData] = useState(null); // Store the selected form data
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch skills and form data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const formDataResponse = await axios.get('http://localhost:8707/api/formdata');
//         setFormDatas(formDataResponse.data); // Set form data response

//         const skillsResponse = await axios.get('http://localhost:8707/api/skills');
//         setSkills(skillsResponse.data); // Set skills response
//       } catch (error) {
//         setError('Error fetching data');
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to open detailed view (DisplayData component) when a user clicks 'View Details'
//   const handleViewDetails = (formDataId) => {
//     const selectedData = formDatas.find((data) => data._id === formDataId);
//     setSelectedFormData(selectedData); // Set the selected form data
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="admin-dashboard-container">
//       <aside className="sidebar">
//         <button className={`sidebar-button active`}>
//           Users with FormData and Skills
//         </button>
//       </aside>

//       <div className="dashboard-content">
//         <header className="admin-header">
//           <h1>Admin Dashboard</h1>
//         </header>

//         <section className="dashboard-section">
//           <h2>Users</h2>
//           <table className="styled-table">
//             <thead>
//               <tr>
//                 <th>Form Data ID</th>
//                 <th>Name</th>
//                 <th>Skill Category</th>
//                 <th>Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               {formDatas.map((formData) => (
//                 <tr key={formData._id}>
//                   <td>{formData._id}</td>
//                   <td>{formData.skill.profileName}</td>
//                   <td>{formData.skill.skillCategory}</td>
//                   <td>
//                     <button onClick={() => handleViewDetails(formData._id)}>
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>

//         {/* Conditionally render the DisplayData component if selectedFormData is available */}
//         {selectedFormData && (
//           <DisplayData id={selectedFormData._id} onClose={() => setSelectedFormData(null)} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [skills, setSkills] = useState([]);
  const [formDatas, setFormDatas] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch skills and form data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formDataResponse = await axios.get('http://localhost:8707/api/formdata');
        setFormDatas(formDataResponse.data); // Set form data response

        const skillsResponse = await axios.get('http://localhost:8707/api/skills');
        setSkills(skillsResponse.data); // Set skills response
      } catch (error) {
        setError('Error fetching data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-dashboard-container">
      <header className="admin-header py-4 bg-blue-500 text-white text-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </header>

      <div className="dashboard-content p-4">
        <section className="dashboard-section">
          <h2 className="text-xl font-semibold mb-4">Users with Form Data and Skills</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="border-b-2 border-gray-200 block md:table-row absolute -top-full md:relative">
                  <th className="p-2 text-left bg-gray-50 md:table-cell">Form Data ID</th>
                  <th className="p-2 text-left bg-gray-50 md:table-cell">Name</th>
                  <th className="p-2 text-left bg-gray-50 md:table-cell">Skill Category</th>
                  <th className="p-2 text-left bg-gray-50 md:table-cell">Profile Name</th>
                  <th className="p-2 text-left bg-gray-50 md:table-cell">Preferred Language</th>
                  <th className="p-2 text-left bg-gray-50 md:table-cell">Educational Background</th>
                  <th className="p-2 text-left bg-gray-50 md:table-cell">Course Description</th>
                  <th className="p-2 text-left bg-gray-50 md:table-cell">PDF Price</th>
                  <th className="p-2 text-left bg-gray-50 md:table-cell">Languages</th>
                  <th className="p-2 text-left bg-gray-50 md:table-cell">Roadmap PDF</th>
                  <th className="p-2 text-left bg-gray-50 md:table-cell">First Chapter PDF</th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                {formDatas.map((formData) => (
                  <tr key={formData._id} className="block md:table-row">
                    <td className="p-2 border-t block md:table-cell">{formData._id}</td>
                    <td className="p-2 border-t block md:table-cell">{formData.skill?.profileName}</td>
                    <td className="p-2 border-t block md:table-cell">{formData.skill?.skillCategory}</td>
                    <td className="p-2 border-t block md:table-cell">{formData.skill?.profileName}</td>
                    <td className="p-2 border-t block md:table-cell">{formData.skill?.preferredLanguage}</td>
                    <td className="p-2 border-t block md:table-cell">{formData.skill?.educationalBackground}</td>
                    <td className="p-2 border-t block md:table-cell">{formData.courseDescription}</td>
                    <td className="p-2 border-t block md:table-cell">${formData.pdfPrice}</td>
                    <td className="p-2 border-t block md:table-cell">{formData.languages}</td>
                    <td className="p-2 border-t block md:table-cell">
                      {formData.roadmapIntroduction && (
                        <a
                          href={`http://localhost:8707/pdfUploads/${formData.roadmapIntroduction}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          View Roadmap PDF
                        </a>
                      )}
                    </td>
                    <td className="p-2 border-t block md:table-cell">
                      {formData.firstChapter && (
                        <a
                          href={`http://localhost:8707/pdfUploads/${formData.firstChapter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          View First Chapter PDF
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
