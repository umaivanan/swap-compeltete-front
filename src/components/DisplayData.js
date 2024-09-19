import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DataDisplay.css'; // Custom CSS for card design

const DisplayData = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();  // Extract user ID from the URL
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8700/api/formdata/${id}`);
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
      <h1 className="heading">Form Data Display for User {id}</h1>

      <div className="card-grid">
        {/* Roadmap Introduction */}
        {data.roadmapIntroduction && (
          <div className="pdf-card">
            <div className="pdf-content">
              <h3>Roadmap Introduction</h3>
              <a
                href={`http://localhost:8700/pdfUploads/${data.roadmapIntroduction}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-pdf-btn"
              >
                View Roadmap Introduction
              </a>
            </div>
          </div>
        )}

        {/* First Chapter */}
        {data.firstChapter && (
          <div className="pdf-card">
            <div className="pdf-content">
              <h3>First Chapter</h3>
              <a
                href={`http://localhost:8700/pdfUploads/${data.firstChapter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-pdf-btn"
              >
                View First Chapter
              </a>
            </div>
          </div>
        )}

        {/* Second Chapter */}
        {data.secondChapter && (
          <div className="pdf-card">
            <div className="pdf-content">
              <h3>Second Chapter</h3>
              <a
                href={`http://localhost:8700/pdfUploads/${data.secondChapter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-pdf-btn"
              >
                View Second Chapter
              </a>
            </div>
          </div>
        )}

        {/* Third Chapter */}
        {data.thirdChapter && (
          <div className="pdf-card">
            <div className="pdf-content">
              <h3>Third Chapter</h3>
              <a
                href={`http://localhost:8700/pdfUploads/${data.thirdChapter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-pdf-btn"
              >
                View Third Chapter
              </a>
            </div>
          </div>
        )}

        {/* Fourth Chapter */}
        {data.fourthChapter && (
          <div className="pdf-card">
            <div className="pdf-content">
              <h3>Fourth Chapter</h3>
              <a
                href={`http://localhost:8700/pdfUploads/${data.fourthChapter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-pdf-btn"
              >
                View Fourth Chapter
              </a>
            </div>
          </div>
        )}

        {/* Fifth Chapter */}
        {data.fifthChapter && (
          <div className="pdf-card">
            <div className="pdf-content">
              <h3>Fifth Chapter</h3>
              <a
                href={`http://localhost:8700/pdfUploads/${data.fifthChapter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-pdf-btn"
              >
                View Fifth Chapter
              </a>
            </div>
          </div>
        )}

        {/* Sixth Chapter */}
        {data.sixthChapter && (
          <div className="pdf-card">
            <div className="pdf-content">
              <h3>Sixth Chapter</h3>
              <a
                href={`http://localhost:8700/pdfUploads/${data.sixthChapter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-pdf-btn"
              >
                View Sixth Chapter
              </a>
            </div>
          </div>
        )}

        {/* Seventh Chapter */}
        {data.seventhChapter && (
          <div className="pdf-card">
            <div className="pdf-content">
              <h3>Seventh Chapter</h3>
              <a
                href={`http://localhost:8700/pdfUploads/${data.seventhChapter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-pdf-btn"
              >
                View Seventh Chapter
              </a>
            </div>
          </div>
        )}

        {/* Eighth Chapter */}
        {data.eighthChapter && (
          <div className="pdf-card">
            <div className="pdf-content">
              <h3>Eighth Chapter</h3>
              <a
                href={`http://localhost:8700/pdfUploads/${data.eighthChapter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-pdf-btn"
              >
                View Eighth Chapter
              </a>
            </div>
          </div>
        )}

        {/* Ninth Chapter */}
        {data.ninthChapter && (
          <div className="pdf-card">
            <div className="pdf-content">
              <h3>Ninth Chapter</h3>
              <a
                href={`http://localhost:8700/pdfUploads/${data.ninthChapter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-pdf-btn"
              >
                View Ninth Chapter
              </a>
            </div>
          </div>
        )}

        {/* Tenth Chapter */}
        {data.tenthChapter && (
          <div className="pdf-card">
            <div className="pdf-content">
              <h3>Tenth Chapter</h3>
              <a
                href={`http://localhost:8700/pdfUploads/${data.tenthChapter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-pdf-btn"
              >
                View Tenth Chapter
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayData;
