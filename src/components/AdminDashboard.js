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
        const formDataResponse = await axios.get(`http://localhost:8706/api/formdata`);
        setFormDatas(formDataResponse.data); // Set form data response

        const skillsResponse = await axios.get('http://localhost:8706/api/skills');
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

  // Function to delete a user when 'Block User' is clicked
  const handleBlockUser = async (formDataId) => {
    try {
      // Send DELETE request to backend API
      await axios.delete(`http://localhost:8706/api/formdata/${formDataId}`);

      // Update the frontend state to remove the blocked user
      setFormDatas(formDatas.filter(data => data._id !== formDataId));

    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  if (loading) return <p className="text-cyan-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar takes 1/3 of the screen */}
      <aside className="w-1/3 bg-cyan-500 text-white p-4">
        <button className="w-full py-2 text-white font-semibold">
          Users with FormData and Skills
        </button>
      </aside>

      {/* Content takes 3/4 of the screen */}
      <div className="w-3/4 p-4">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-cyan-500">Admin Dashboard</h1>
        </header>

        <section className="space-y-4">
          {formDatas.map((formData) => (
            <div key={formData._id} className="p-4 border rounded-lg shadow-md bg-white w-full">
              <h2
                className="text-xl font-bold text-cyan-500 cursor-pointer hover:underline"
                onClick={() => handleViewDetails(formData._id)}
              >
                Form Data ID: {formData._id}
              </h2>

              {selectedFormData && selectedFormData._id === formData._id && (
                <div className="flex flex-col lg:flex-row lg:space-x-6 mt-4 w-full">
                  <div className="w-full lg:w-1/2 space-y-4">
                    <p><strong>Course Description:</strong> {selectedFormData.courseDescription}</p>
                    <p><strong>Course Duration:</strong> {selectedFormData.courseDuration}</p>
                    <p><strong>Target Audience:</strong> {selectedFormData.targetAudience}</p>
                    <p><strong>Course Category:</strong> {selectedFormData.courseCategory}</p>
                    <p><strong>Languages:</strong> {selectedFormData.languages}</p>
                    <h3 className="font-bold text-lg text-cyan-500">PDF Links</h3>
                    {/* PDF Links */}
                    {selectedFormData.roadmapIntroduction && (
                      <div>
                        <a
                          href={`http://localhost:8706/pdfUploads/${selectedFormData.roadmapIntroduction}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-500 underline"
                        >
                          View Roadmap Introduction PDF
                        </a>
                      </div>
                    )}
                    {/* Include other chapter links similarly... */}
                    {['firstChapter', 'secondChapter', 'thirdChapter', 'fourthChapter', 'fifthChapter',
                      'sixthChapter', 'seventhChapter', 'eighthChapter', 'ninthChapter', 'tenthChapter']
                      .map((chapter, index) => (
                        selectedFormData[chapter] && (
                          <div key={index}>
                            <a
                              href={`http://localhost:8706/pdfUploads/${selectedFormData[chapter]}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-500 underline"
                            >
                              View {chapter.charAt(0).toUpperCase() + chapter.slice(1)} PDF
                            </a>
                          </div>
                        )
                      ))}
                  </div>

                  <div className="w-full lg:w-1/2 space-y-4">
                    <h3 className="font-bold text-lg text-cyan-500">Profile Picture</h3>
                    {selectedFormData.skill.profilePicture && (
                      <img
                        src={`http://localhost:8706${selectedFormData.skill.profilePicture}`}
                        alt={selectedFormData.skill.profileName}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}

                    <h3 className="font-bold text-lg text-cyan-500">Course Image</h3>
                    {selectedFormData.image && (
                      <img
                        src={`http://localhost:8706/imageUploads/${selectedFormData.image}`}
                        alt="Course uploaded"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}

                    <h3 className="font-bold text-lg text-cyan-500">Skill Details</h3>
                    <p><strong>Skill ID:</strong> {selectedFormData.skill._id}</p>
                    <p><strong>Profile Name:</strong> {selectedFormData.skill.profileName}</p>
                    <p><strong>Skill Category:</strong> {selectedFormData.skill.skillCategory}</p>
                    <p><strong>Email:</strong> {selectedFormData.skill.email}</p>
                    <p><strong>Submitted Status:</strong> {selectedFormData.skill.submittedStatus ? 'Yes' : 'No'}</p>
                    <p><strong>Preferred Language:</strong> {selectedFormData.skill.preferredLanguage}</p>
                    <p><strong>Educational Background:</strong> {selectedFormData.skill.educationalBackground}</p>
                  </div>
                </div>
              )}

              <div className="mt-4">
                {/* Block User button to delete the formData */}
                <button 
                  className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
                  onClick={() => handleBlockUser(formData._id)}
                >
                  Block User
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
