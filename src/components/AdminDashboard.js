// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2'; // Import Chart.js
// import 'chart.js/auto'; // Required for Chart.js v3+
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//   const [skills, setSkills] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [formDatas, setFormDatas] = useState([]); // To hold FormData records
//   const [selectedFormData, setSelectedFormData] = useState(null); // To hold selected FormData details
//   const [activeSection, setActiveSection] = useState('skills'); // Manage active section state
//   const [activeView, setActiveView] = useState('table'); // To toggle between table and graph views
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch users, skills, and form data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const skillsResponse = await axios.get('http://localhost:8703/api/skills');
//         const usersResponse = await axios.get('http://localhost:8703/api/auth/admin/users');
//         const formDatasResponse = await axios.get('http://localhost:8703/api/formdata'); // Fetch form data

//         setSkills(skillsResponse.data);
//         setUsers(usersResponse.data);
//         setFormDatas(formDatasResponse.data); // Store form data
//       } catch (error) {
//         setError('Error fetching data');
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to get the FormData ID associated with a user
//   const getFormDataId = (userId) => {
//     const formData = formDatas.find(data => data.skill && data.skill.user === userId); // Use skill.user
//     return formData ? formData._id : null;
//   };

//   // Function to fetch full FormData details when a user clicks 'View Details'
//   const fetchFormDataDetails = async (formDataId) => {
//     try {
//       const response = await axios.get(`http://localhost:8703/api/formdata/${formDataId}`);
//       setSelectedFormData(response.data); // Store the selected form data details
//     } catch (error) {
//       console.error('Error fetching form data details', error);
//     }
//   };

//   // Prepare data for the Bar Chart
//   const skillNames = skills.map(skill => skill.profileName);
//   const skillCount = skills.map(skill => skill.skillCategory.length); // Assuming skill category length for demo
  
//   const chartData = {
//     labels: skillNames,
//     datasets: [
//       {
//         label: 'Skill Count',
//         data: skillCount,
//         backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff'],
//         borderColor: '#fff',
//         borderWidth: 2,
//       },
//     ],
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="admin-dashboard-container">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <button
//           className={`sidebar-button ${activeSection === 'skills' ? 'active' : ''}`}
//           onClick={() => setActiveSection('skills')}
//         >
//           Skills
//         </button>
//         <button
//           className={`sidebar-button ${activeSection === 'users' ? 'active' : ''}`}
//           onClick={() => setActiveSection('users')}
//         >
//           Users
//         </button>
//         <button
//           className={`sidebar-button ${activeView === 'table' ? 'active' : ''}`}
//           onClick={() => setActiveView('table')}
//         >
//           Table View
//         </button>
//         <button
//           className={`sidebar-button ${activeView === 'graph' ? 'active' : ''}`}
//           onClick={() => setActiveView('graph')}
//         >
//           Graph View
//         </button>
//       </aside>

//       {/* Main Content Area */}
//       <div className="dashboard-content">
//         <header className="admin-header">
//           <h1>Admin Dashboard</h1>
//         </header>

//         {/* Show Table View or Graph View based on the activeView state */}
//         {activeView === 'table' && (
//           <>
//             {activeSection === 'skills' && (
//               <section className="dashboard-section">
//                 <h2>Skills</h2>
//                 <table className="styled-table">
//                   <thead>
//                     <tr>
//                       <th>Profile Picture</th>
//                       <th>Profile Name</th>
//                       <th>Skill Category</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {skills.map(skill => (
//                       <tr key={skill._id}>
//                         <td>
//                           {skill.profilePicture ? (
//                             <img
//                               src={`http://localhost:8703${skill.profilePicture}`}
//                               alt="Profile"
//                               className="profile-picture"
//                             />
//                           ) : (
//                             <p>No picture</p>
//                           )}
//                         </td>
//                         <td>{skill.profileName}</td>
//                         <td>{skill.skillCategory}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </section>
//             )}

//             {activeSection === 'users' && (
//               <section className="dashboard-section">
//                 <h2>Users</h2>
//                 <table className="styled-table">
//                   <thead>
//                     <tr>
//                       <th>Form Data ID</th>
//                       <th>Name</th>
//                       <th>Email</th>
//                       <th>Details</th> {/* Add column to fetch and show user details */}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {users.map(user => (
//                       <tr key={user._id}>
//                         <td>{getFormDataId(user._id) || 'No Form Data'}</td> {/* Display FormData ID */}
//                         <td>{user.name}</td>
//                         <td>{user.email}</td>
//                         <td>
//                           {getFormDataId(user._id) ? (
//                             <button onClick={() => fetchFormDataDetails(getFormDataId(user._id))}>
//                               View Details
//                             </button>
//                           ) : (
//                             <span>No Form Data</span>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </section>
//             )}
//           </>
//         )}

//         {/* Display Selected FormData Details */}
//         {selectedFormData && (
//           <div className="form-data-details">
//             <h2>Form Data Details</h2>
//             <p><strong>Where I Live:</strong> {selectedFormData.whereILive}</p>
//             <p><strong>Decade Born:</strong> {selectedFormData.decadeBorn}</p>
//             <p><strong>Time Spent:</strong> {selectedFormData.timeSpent}</p>
//             <p><strong>Work:</strong> {selectedFormData.work}</p>
//             <p><strong>Languages:</strong> {selectedFormData.languages}</p>
//             <p><strong>About Me:</strong> {selectedFormData.aboutMe}</p>

//             {/* Display PDF Links */}
//             {selectedFormData.roadmapIntroduction && (
//               <div>
//                 <a
//                   href={`http://localhost:8703/pdfUploads/${selectedFormData.roadmapIntroduction}`}
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
//                   href={`http://localhost:8703/pdfUploads/${selectedFormData.firstChapter}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   View First Chapter PDF
//                 </a>
//               </div>
//             )}
//             {/* Similarly, add more PDF links based on the fields in formData */}
//           </div>
//         )}

//         {/* Graph View */}
//         {activeView === 'graph' && (
//           <section className="dashboard-section">
//             <h2>Skills Chart</h2>
//             <div className="chart-container">
//               <Bar data={chartData} />
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // import { Bar } from 'react-chartjs-2'; // Import Chart.js
// import 'chart.js/auto';
// import { Link } from 'react-router-dom'; // Use Link to navigate to the detailed page
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//   const [skills, setSkills] = useState([]);
//   const [formDatas, setFormDatas] = useState([]); // To hold FormData records
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch skills and form data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch form data by ID (just one request if needed, otherwise for all form data)
//         const formDataResponse = await axios.get(`http://localhost:8703/api/formdata`);
//         setFormDatas(formDataResponse.data); // Set form data response

//         // Fetch skills data
//         const skillsResponse = await axios.get('http://localhost:8703/api/skills');
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

//   const getFormDataId = (userId) => {
//     const formData = formDatas.find(data => data.skill.user === userId);
//     return formData ? formData._id : null;
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
//                     <Link to={`/formdata/${formData._id}`}>
//                       View Details
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>
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
  const [formDatas, setFormDatas] = useState([]); // To hold FormData records
  const [selectedFormData, setSelectedFormData] = useState(null); // To hold selected FormData details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch skills and form data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formDataResponse = await axios.get(`http://localhost:8703/api/formdata`);
        setFormDatas(formDataResponse.data); // Set form data response

        const skillsResponse = await axios.get('http://localhost:8703/api/skills');
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

  // Function to fetch full FormData details when a user clicks 'View Details'
  const handleViewDetails = (formDataId) => {
    const selectedData = formDatas.find(data => data._id === formDataId);
    setSelectedFormData(selectedData); // Set the selected form data details
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-dashboard-container">
      <aside className="sidebar">
        <button className={`sidebar-button active`}>
          Users with FormData and Skills
        </button>
      </aside>

      <div className="dashboard-content">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
        </header>

        <section className="dashboard-section">
          <h2>Users</h2>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Form Data ID</th>
                <th>Name</th>
                <th>Skill Category</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {formDatas.map((formData) => (
                <tr key={formData._id}>
                  <td>{formData._id}</td>
                  <td>{formData.skill.profileName}</td>
                  <td>{formData.skill.skillCategory}</td>
                  <td>
                    <button onClick={() => handleViewDetails(formData._id)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Conditionally render selected FormData details */}
        {selectedFormData && (
          <div className="form-data-details">
            <h2>Form Data Details</h2>
            <p><strong>Where I Live:</strong> {selectedFormData.whereILive}</p>
            <p><strong>Decade Born:</strong> {selectedFormData.decadeBorn}</p>
            <p><strong>Time Spent:</strong> {selectedFormData.timeSpent}</p>
            <p><strong>Work:</strong> {selectedFormData.work}</p>
            <p><strong>Languages:</strong> {selectedFormData.languages}</p>
            <p><strong>About Me:</strong> {selectedFormData.aboutMe}</p>

            <h3>PDF Links</h3>
            {selectedFormData.roadmapIntroduction && (
              <div>
                <a
                  href={`http://localhost:8703/pdfUploads/${selectedFormData.roadmapIntroduction}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Roadmap Introduction PDF
                </a>
              </div>
            )}
            {selectedFormData.firstChapter && (
              <div>
                <a
                  href={`http://localhost:8703/pdfUploads/${selectedFormData.firstChapter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View First Chapter PDF
                </a>
              </div>
            )}
            {selectedFormData.secondChapter && (
              <div>
                <a
                  href={`http://localhost:8703/pdfUploads/${selectedFormData.secondChapter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Second Chapter PDF
                </a>
              </div>
            )}
            {selectedFormData.thirdChapter && (
              <div>
                <a
                  href={`http://localhost:8703/pdfUploads/${selectedFormData.thirdChapter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Third Chapter PDF
                </a>
              </div>
            )}
            {selectedFormData.fourthChapter && (
              <div>
                <a
                  href={`http://localhost:8703/pdfUploads/${selectedFormData.fourthChapter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Fourth Chapter PDF
                </a>
              </div>
            )}
            {selectedFormData.fifthChapter && (
              <div>
                <a
                  href={`http://localhost:8703/pdfUploads/${selectedFormData.fifthChapter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Fifth Chapter PDF
                </a>
              </div>
            )}
            {selectedFormData.sixthChapter && (
              <div>
                <a
                  href={`http://localhost:8703/pdfUploads/${selectedFormData.sixthChapter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Sixth Chapter PDF
                </a>
              </div>
            )}
            {selectedFormData.seventhChapter && (
              <div>
                <a
                  href={`http://localhost:8703/pdfUploads/${selectedFormData.seventhChapter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Seventh Chapter PDF
                </a>
              </div>
            )}
            {selectedFormData.eighthChapter && (
              <div>
                <a
                  href={`http://localhost:8703/pdfUploads/${selectedFormData.eighthChapter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Eighth Chapter PDF
                </a>
              </div>
            )}
            {selectedFormData.ninthChapter && (
              <div>
                <a
                  href={`http://localhost:8703/pdfUploads/${selectedFormData.ninthChapter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Ninth Chapter PDF
                </a>
              </div>
            )}
            {selectedFormData.tenthChapter && (
              <div>
                <a
                  href={`http://localhost:8703/pdfUploads/${selectedFormData.tenthChapter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Tenth Chapter PDF
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
