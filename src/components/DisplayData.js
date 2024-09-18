import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DataDisplay.css'; // Import your custom CSS for styling

const DisplayData = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();  // Extract user ID from the URL
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/formdata/${id}`);
        setData(response.data);  // Set data retrieved from the API
      } catch (error) {
        setError('Error fetching data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // If the data is loading, show a loading message
  if (loading) return <p className="loading">Loading...</p>;

  // If there's an error, show the error message
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="data-display-container">
      <h1>Form Data Display for User {id}</h1>
      
      {/* Profile Picture */}
      {data.profilePicture ? (
        <div className="profile-picture-container">
          <img 
            src={`http://localhost:8800${data.profilePicture}`} 
            alt="Profile" 
            className="profile-picture" 
          />
        </div>
      ) : (
        <p>No profile picture available</p>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>Where I Live</th>
            <th>Decade I Was Born</th>
            <th>Time Spent</th>
            <th>My Work</th>
            <th>Languages I Speak</th>
            <th>About Me</th>
            <th>Uploaded PDF Files</th>
          </tr>
        </thead>
        <tbody>
          <tr key={data._id}>
            <td>{data.whereILive}</td>
            <td>{data.decadeBorn}</td>
            <td>{data.timeSpent}</td>
            <td>{data.work}</td>
            <td>{data.languages}</td>
            <td>{data.aboutMe}</td>
            <td>
              {data.pdfFiles && data.pdfFiles.length > 0 ? (
                <ul>
                  {data.pdfFiles.map((file, index) => (
                    <li key={index}>
                      <a
                        href={`http://localhost:8800/pdfUploads/${file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View PDF {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No files uploaded</p>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DisplayData;
