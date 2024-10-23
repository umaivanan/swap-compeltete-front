import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // To get the formdata ID from the URL

const FormDataDetails = () => {
  const { id } = useParams(); // Get formdata ID from URL params
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`http://localhost:8707/api/formdata/${id}`);
        setFormData(response.data);
      } catch (error) {
        setError('Error fetching form data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Form Data Details</h1>
      {formData ? (
        <div>
          <p><strong>Where I Live:</strong> {formData.whereILive}</p>
          <p><strong>Decade Born:</strong> {formData.decadeBorn}</p>
          <p><strong>Work:</strong> {formData.work}</p>
          <p><strong>Languages:</strong> {formData.languages}</p>
          <p><strong>About Me:</strong> {formData.aboutMe}</p>

          {/* Display PDF Links */}
          {formData.roadmapIntroduction && (
            <div>
              <a
                href={`http://localhost:8707/pdfUploads/${formData.roadmapIntroduction}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Roadmap Introduction PDF
              </a>
            </div>
          )}
          {formData.firstChapter && (
            <div>
              <a
                href={`http://localhost:8707/pdfUploads/${formData.firstChapter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View First Chapter PDF
              </a>
            </div>
          )}
          {/* Similarly, add more PDF links based on the fields in formData */}
        </div>
      ) : (
        <p>No form data found for this ID</p>
      )}
    </div>
  );
};

export default FormDataDetails;
