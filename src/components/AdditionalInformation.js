import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './AdditionalInformation.css'; // Import the external CSS file

const AdditionalInformation = () => {
    const location = useLocation();
    const { skillId } = location.state;
    const [formData, setFormData] = useState({
        whereILive: '',
        decadeBorn: '',
        timeSpent: '',
        work: '',
        languages: '',
        aboutMe: '',
        pdfFiles: [],
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]); // State for uploaded files
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 3) {
            alert('You can only upload up to 3 PDF files.');
        } else {
            setFormData({ ...formData, pdfFiles: files });
        }
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.whereILive.trim()) formErrors.whereILive = 'Where I Live is required';
        if (!formData.decadeBorn.trim()) formErrors.decadeBorn = 'Decade I Was Born is required';
        if (!formData.timeSpent.trim()) formErrors.timeSpent = 'Time spent is required';
        if (!formData.work.trim()) formErrors.work = 'Work is required';
        if (!formData.languages.trim()) formErrors.languages = 'Languages are required';
        if (!formData.aboutMe.trim()) formErrors.aboutMe = 'About Me is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            try {
                const formDataObj = new FormData();

                formDataObj.append('whereILive', formData.whereILive);
                formDataObj.append('decadeBorn', formData.decadeBorn);
                formDataObj.append('timeSpent', formData.timeSpent);
                formDataObj.append('work', formData.work);
                formDataObj.append('languages', formData.languages);
                formDataObj.append('aboutMe', formData.aboutMe);
                formDataObj.append('skillId', skillId);

                formData.pdfFiles.forEach((file) => {
                    formDataObj.append('pdfFiles', file);
                });

                const response = await axios.post('http://localhost:8800/api/formdata', formDataObj, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const formDataId = response.data.formData._id;

                await axios.patch(`http://localhost:8800/api/skills/${skillId}`, { formDataId });

                setUploadedFiles(response.data.formData.pdfFiles);

                alert('Successfully submitted your information!');
                navigate('/list');
            } catch (error) {
                console.error('Error submitting additional information', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="full-page">
            <div className="image-container">
                {/* Replace 'your-image-url-here' with your actual image link */}
                {/* <img src="your-image-url-here" alt="Side Image" className="side-image" /> */}
            </div>
            <div className="form-container">
                <form className="additional-information-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="whereILive">Where I Live</label>
                        <input
                            type="text"
                            id="whereILive"
                            name="whereILive"
                            value={formData.whereILive}
                            onChange={handleChange}
                            className="enlarge-on-click"
                        />
                        {errors.whereILive && <span className="error">{errors.whereILive}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="decadeBorn">Decade I Was Born</label>
                        <input
                            type="text"
                            id="decadeBorn"
                            name="decadeBorn"
                            value={formData.decadeBorn}
                            onChange={handleChange}
                            className="enlarge-on-click"
                        />
                        {errors.decadeBorn && <span className="error">{errors.decadeBorn}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="timeSpent">I Spend Too Much Time</label>
                        <input
                            type="text"
                            id="timeSpent"
                            name="timeSpent"
                            value={formData.timeSpent}
                            onChange={handleChange}
                            className="enlarge-on-click"
                        />
                        {errors.timeSpent && <span className="error">{errors.timeSpent}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="work">My Work</label>
                        <input
                            type="text"
                            id="work"
                            name="work"
                            value={formData.work}
                            onChange={handleChange}
                            className="enlarge-on-click"
                        />
                        {errors.work && <span className="error">{errors.work}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="languages">Languages I Speak</label>
                        <input
                            type="text"
                            id="languages"
                            name="languages"
                            value={formData.languages}
                            onChange={handleChange}
                            className="enlarge-on-click"
                        />
                        {errors.languages && <span className="error">{errors.languages}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="aboutMe">About Me</label>
                        <textarea
                            id="aboutMe"
                            name="aboutMe"
                            value={formData.aboutMe}
                            onChange={handleChange}
                            className="large-input"
                        />
                        {errors.aboutMe && <span className="error">{errors.aboutMe}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="pdfFiles">Upload up to 3 PDF files</label>
                        <input
                            type="file"
                            id="pdfFiles"
                            name="pdfFiles"
                            accept="application/pdf"
                            multiple
                            onChange={handleFileChange}
                        />
                        {formData.pdfFiles.length > 0 && (
                            <ul>
                                {formData.pdfFiles.map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdditionalInformation;
