
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faClock, faUser, faTag, faLanguage, faDollarSign, faImage } from '@fortawesome/free-solid-svg-icons';
import './AdditionalInformation.css'; // Import the external CSS file

const AdditionalInformation = () => {
    const location = useLocation();
    const { skillId } = location.state;
    const [showMore, setShowMore] = useState(false); // State for Show More button

    const [formData, setFormData] = useState({
        courseDescription: '',  // New field for course description
        courseDuration: '',      // New field for course duration
        targetAudience: '',      // New field for target audience
        courseCategory: '',      // New field for course category
        languages: '',           // Keeping languages input field
        roadmapIntroduction: null,
        firstChapter: null,
        secondChapter: null,
        thirdChapter: null,
        fourthChapter: null,
        fifthChapter: null,
        sixthChapter: null,
        seventhChapter: null,
        eighthChapter: null,
        ninthChapter: null,
        tenthChapter: null,
        pdfPrice: '', // Single price input field for all PDFs
        image: null   // Add the image field for storing the uploaded image
    });

    const [fileNames, setFileNames] = useState({}); // Keep track of uploaded file names
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const selectedFile = files[0];
        setFormData({ ...formData, [name]: selectedFile });
        setFileNames({ ...fileNames, [name]: selectedFile.name });
    };

    // This function ensures the price input only accepts positive numbers
    const handlePriceChange = (e) => {
        const { value } = e.target;
        if (/^\d*\.?\d*$/.test(value)) { // Allows only positive numbers and decimals
            setFormData({ ...formData, pdfPrice: value });
        }
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.courseDescription.trim()) formErrors.courseDescription = 'Course description is required';
        if (!formData.courseDuration.trim()) formErrors.courseDuration = 'Course duration is required';
        if (!formData.targetAudience.trim()) formErrors.targetAudience = 'Target audience is required';
        if (!formData.courseCategory.trim()) formErrors.courseCategory = 'Course category is required';
        if (!formData.languages.trim()) formErrors.languages = 'Languages are required';
        if (!formData.pdfPrice.trim()) formErrors.pdfPrice = 'Price is required'; // Ensure price is filled
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            try {
                const formDataObj = new FormData();

                formDataObj.append('courseDescription', formData.courseDescription);
                formDataObj.append('courseDuration', formData.courseDuration);
                formDataObj.append('targetAudience', formData.targetAudience);
                formDataObj.append('courseCategory', formData.courseCategory);
                formDataObj.append('languages', formData.languages);
                formDataObj.append('pdfPrice', formData.pdfPrice); // Add the PDF price
                formDataObj.append('skilId', skillId);

                // Append all the chapter files and roadmap introduction
                Object.keys(formData).forEach(key => {
                    if (formData[key] instanceof File) {
                        formDataObj.append(key, formData[key]);
                    }
                });

                const response = await axios.post('http://localhost:8703/api/formdata', formDataObj, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const formDataId = response.data.formData._id;

                await axios.patch(`http://localhost:8703/api/skills/${skillId}`, { formDataId });

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
            <div className="form-container">
                <form className="additional-information-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="courseDescription">
                                <FontAwesomeIcon icon={faBook} /> Course Description
                            </label>
                            <textarea
                                id="courseDescription"
                                name="courseDescription"
                                value={formData.courseDescription}
                                onChange={handleChange}
                                className="large-input"
                            />
                            {errors.courseDescription && <span className="error">{errors.courseDescription}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="courseDuration">
                                <FontAwesomeIcon icon={faClock} /> Course Duration
                            </label>
                            <input
                                type="text"
                                id="courseDuration"
                                name="courseDuration"
                                value={formData.courseDuration}
                                onChange={handleChange}
                                className="enlarge-on-click"
                            />
                            {errors.courseDuration && <span className="error">{errors.courseDuration}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="targetAudience">
                                <FontAwesomeIcon icon={faUser} /> Target Audience
                            </label>
                            <input
                                type="text"
                                id="targetAudience"
                                name="targetAudience"
                                value={formData.targetAudience}
                                onChange={handleChange}
                                className="enlarge-on-click"
                            />
                            {errors.targetAudience && <span className="error">{errors.targetAudience}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="courseCategory">
                                <FontAwesomeIcon icon={faTag} /> Course Category
                            </label>
                            <input
                                type="text"
                                id="courseCategory"
                                name="courseCategory"
                                value={formData.courseCategory}
                                onChange={handleChange}
                                className="enlarge-on-click"
                            />
                            {errors.courseCategory && <span className="error">{errors.courseCategory}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="languages">
                                <FontAwesomeIcon icon={faLanguage} /> Languages I Speak
                            </label>
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
                    </div>

                    {/* Single Price input field for PDF */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="pdfPrice">
                                <FontAwesomeIcon icon={faDollarSign} /> Price for PDFs (in USD)
                            </label>
                            <input
                                type="number"
                                id="pdfPrice"
                                name="pdfPrice"
                                value={formData.pdfPrice}
                                onChange={handlePriceChange}
                                min="1" // Allow only positive numbers starting from 1
                                className="price-input"
                            />
                            {errors.pdfPrice && <span className="error">{errors.pdfPrice}</span>}
                        </div>
                    </div>

                    {/* Image upload field */}
                    <div className="form-group">
                        <label htmlFor="image">
                            <FontAwesomeIcon icon={faImage} /> Upload Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*" // Accept any image type (JPEG, PNG, etc.)
                            onChange={handleFileChange}
                        />
                        {fileNames.image && (
                            <span className="success-message">
                                {fileNames.image} uploaded successfully!
                            </span>
                        )}
                    </div>

                    {/* File inputs for Roadmap and Chapters */}
                    <div className="form-group">
                        <label htmlFor="roadmapIntroduction">Roadmap Introduction (PDF)</label>
                        <input
                            type="file"
                            id="roadmapIntroduction"
                            name="roadmapIntroduction"
                            accept="application/pdf"
                            onChange={handleFileChange}
                        />
                        {fileNames.roadmapIntroduction && (
                            <span className="success-message">
                                {fileNames.roadmapIntroduction} uploaded successfully!
                            </span>
                        )}
                    </div>

                    {/* Show More or Show Less Button to reveal/hide additional chapters */}
                    {showMore ? (
                        <>
                            {/* Additional chapters */}
                            {Object.keys(formData).slice(1).map((chapter, index) => (
                                chapter.includes('Chapter') && (
                                    <div className="form-group" key={chapter}>
                                        <label htmlFor={chapter}>{`${chapter} (PDF)`}</label>
                                        <input
                                            type="file"
                                            id={chapter}
                                            name={chapter}
                                            accept="application/pdf"
                                            onChange={handleFileChange}
                                        />
                                        {fileNames[chapter] && (
                                            <span className="success-message">
                                                {fileNames[chapter]} uploaded successfully!
                                            </span>
                                        )}
                                    </div>
                                )
                            ))}
                            <button type="button" onClick={() => setShowMore(false)} className="show-less-button">
                                Show Less PDFs
                            </button>
                        </>
                    ) : (
                        <button type="button" onClick={() => setShowMore(true)} className="show-more-button">
                            Show More PDFs
                        </button>
                    )}

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdditionalInformation;
