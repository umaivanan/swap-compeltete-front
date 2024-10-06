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
