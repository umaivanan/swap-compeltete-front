// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component
// import { faHome, faCalendar, faClock, faBriefcase, faLanguage, faUser } from '@fortawesome/free-solid-svg-icons'; // Import required icons
// import './AdditionalInformation.css'; // Import the external CSS file

// const AdditionalInformation = () => {
//     const location = useLocation();
//     const { skillId } = location.state;
//     const [formData, setFormData] = useState({
//         whereILive: '',
//         decadeBorn: '',
//         timeSpent: '',
//         work: '',
//         languages: '',
//         aboutMe: '',
//         roadmapIntroduction: null,
//         firstChapter: null,
//         secondChapter: null,
//         thirdChapter: null,
//         fourthChapter: null,
//         fifthChapter: null,
//         sixthChapter: null,
//         seventhChapter: null,
//         eighthChapter: null,
//         ninthChapter: null,
//         tenthChapter: null,
//     });
//     const [fileNames, setFileNames] = useState({}); // Keep track of uploaded file names
//     const [errors, setErrors] = useState({});
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleFileChange = (e) => {
//         const { name, files } = e.target;
//         const selectedFile = files[0];
//         setFormData({ ...formData, [name]: selectedFile });
//         setFileNames({ ...fileNames, [name]: selectedFile.name });
//     };

//     const validateForm = () => {
//         let formErrors = {};
//         if (!formData.whereILive.trim()) formErrors.whereILive = 'Where I Live is required';
//         if (!formData.decadeBorn.trim()) formErrors.decadeBorn = 'Decade I Was Born is required';
//         if (!formData.timeSpent.trim()) formErrors.timeSpent = 'Time spent is required';
//         if (!formData.work.trim()) formErrors.work = 'Work is required';
//         if (!formData.languages.trim()) formErrors.languages = 'Languages are required';
//         if (!formData.aboutMe.trim()) formErrors.aboutMe = 'About Me is required';

//         setErrors(formErrors);
//         return Object.keys(formErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             setIsLoading(true);
//             try {
//                 const formDataObj = new FormData();

//                 formDataObj.append('whereILive', formData.whereILive);
//                 formDataObj.append('decadeBorn', formData.decadeBorn);
//                 formDataObj.append('timeSpent', formData.timeSpent);
//                 formDataObj.append('work', formData.work);
//                 formDataObj.append('languages', formData.languages);
//                 formDataObj.append('aboutMe', formData.aboutMe);
//                 formDataObj.append('skillId', skillId);

//                 // Append all the chapter files and roadmap introduction
//                 Object.keys(formData).forEach(key => {
//                     if (formData[key] instanceof File) {
//                         formDataObj.append(key, formData[key]);
//                     }
//                 });

//                 const response = await axios.post('http://localhost:8703/api/formdata', formDataObj, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                     },
//                 });

//                 const formDataId = response.data.formData._id;

//                 await axios.patch(`http://localhost:8703/api/skills/${skillId}`, { formDataId });

//                 // setUploadedFiles(response.data.formData); // Update with the uploaded form data

//                 alert('Successfully submitted your information!');
//                 navigate('/list');
//             } catch (error) {
//                 console.error('Error submitting additional information', error);
//             } finally {
//                 setIsLoading(false);
//             }
//         }
//     };

//     return (
//         <div className="full-page">
//             <div className="form-container">
//                 <form className="additional-information-form" onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label htmlFor="whereILive">
//                             <FontAwesomeIcon icon={faHome} /> Where I Live
//                         </label>
//                         <input
//                             type="text"
//                             id="whereILive"
//                             name="whereILive"
//                             value={formData.whereILive}
//                             onChange={handleChange}
//                             className="enlarge-on-click"
//                         />
//                         {errors.whereILive && <span className="error">{errors.whereILive}</span>}
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="decadeBorn">
//                             <FontAwesomeIcon icon={faCalendar} /> Decade I Was Born
//                         </label>
//                         <input
//                             type="text"
//                             id="decadeBorn"
//                             name="decadeBorn"
//                             value={formData.decadeBorn}
//                             onChange={handleChange}
//                             className="enlarge-on-click"
//                         />
//                         {errors.decadeBorn && <span className="error">{errors.decadeBorn}</span>}
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="timeSpent">
//                             <FontAwesomeIcon icon={faClock} /> I Spend Too Much Time
//                         </label>
//                         <input
//                             type="text"
//                             id="timeSpent"
//                             name="timeSpent"
//                             value={formData.timeSpent}
//                             onChange={handleChange}
//                             className="enlarge-on-click"
//                         />
//                         {errors.timeSpent && <span className="error">{errors.timeSpent}</span>}
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="work">
//                             <FontAwesomeIcon icon={faBriefcase} /> My Work
//                         </label>
//                         <input
//                             type="text"
//                             id="work"
//                             name="work"
//                             value={formData.work}
//                             onChange={handleChange}
//                             className="enlarge-on-click"
//                         />
//                         {errors.work && <span className="error">{errors.work}</span>}
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="languages">
//                             <FontAwesomeIcon icon={faLanguage} /> Languages I Speak
//                         </label>
//                         <input
//                             type="text"
//                             id="languages"
//                             name="languages"
//                             value={formData.languages}
//                             onChange={handleChange}
//                             className="enlarge-on-click"
//                         />
//                         {errors.languages && <span className="error">{errors.languages}</span>}
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="aboutMe">
//                             <FontAwesomeIcon icon={faUser} /> About Me
//                         </label>
//                         <textarea
//                             id="aboutMe"
//                             name="aboutMe"
//                             value={formData.aboutMe}
//                             onChange={handleChange}
//                             className="large-input"
//                         />
//                         {errors.aboutMe && <span className="error">{errors.aboutMe}</span>}
//                     </div>

//                     {/* File inputs for Roadmap and Chapters */}
//                     <div className="form-group">
//                         <label htmlFor="roadmapIntroduction">Roadmap Introduction (PDF)</label>
//                         <input
//                             type="file"
//                             id="roadmapIntroduction"
//                             name="roadmapIntroduction"
//                             accept="application/pdf"
//                             onChange={handleFileChange}
//                         />
//                         {fileNames.roadmapIntroduction && (
//                             <span className="success-message">
//                                 {fileNames.roadmapIntroduction} uploaded successfully!
//                             </span>
//                         )}
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="firstChapter">First Chapter (PDF)</label>
//                         <input
//                             type="file"
//                             id="firstChapter"
//                             name="firstChapter"
//                             accept="application/pdf"
//                             onChange={handleFileChange}
//                         />
//                         {fileNames.firstChapter && (
//                             <span className="success-message">
//                                 {fileNames.firstChapter} uploaded successfully!
//                             </span>
//                         )}
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="secondChapter">Second Chapter (PDF)</label>
//                         <input
//                             type="file"
//                             id="secondChapter"
//                             name="secondChapter"
//                             accept="application/pdf"
//                             onChange={handleFileChange}
//                         />
//                         {fileNames.secondChapter && (
//                             <span className="success-message">
//                                 {fileNames.secondChapter} uploaded successfully!
//                             </span>
//                         )}
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="thirdChapter">Third Chapter (PDF)</label>
//                         <input
//                             type="file"
//                             id="thirdChapter"
//                             name="thirdChapter"
//                             accept="application/pdf"
//                             onChange={handleFileChange}
//                         />
//                         {fileNames.thirdChapter && (
//                             <span className="success-message">
//                                 {fileNames.thirdChapter} uploaded successfully!
//                             </span>
//                         )}
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="fourthChapter">Fourth Chapter (PDF)</label>
//                         <input
//                             type="file"
//                             id="fourthChapter"
//                             name="fourthChapter"
//                             accept="application/pdf"
//                             onChange={handleFileChange}
//                         />
//                         {fileNames.fourthChapter && (
//                             <span className="success-message">
//                                 {fileNames.fourthChapter} uploaded successfully!
//                             </span>
//                         )}
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="fifthChapter">Fifth Chapter (PDF)</label>
//                         <input
//                             type="file"
//                             id="fifthChapter"
//                             name="fifthChapter"
//                             accept="application/pdf"
//                             onChange={handleFileChange}
//                         />
//                         {fileNames.fifthChapter && (
//                             <span className="success-message">
//                                 {fileNames.fifthChapter} uploaded successfully!
//                             </span>
//                         )}
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="sixthChapter">Sixth Chapter (PDF)</label>
//                         <input
//                             type="file"
//                             id="sixthChapter"
//                             name="sixthChapter"
//                             accept="application/pdf"
//                             onChange={handleFileChange}
//                         />
//                         {fileNames.sixthChapter && (
//                             <span className="success-message">
//                                 {fileNames.sixthChapter} uploaded successfully!
//                             </span>
//                         )}
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="seventhChapter">Seventh Chapter (PDF)</label>
//                         <input
//                             type="file"
//                             id="seventhChapter"
//                             name="seventhChapter"
//                             accept="application/pdf"
//                             onChange={handleFileChange}
//                         />
//                         {fileNames.seventhChapter && (
//                             <span className="success-message">
//                                 {fileNames.seventhChapter} uploaded successfully!
//                             </span>
//                         )}
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="eighthChapter">Eighth Chapter (PDF)</label>
//                         <input
//                             type="file"
//                             id="eighthChapter"
//                             name="eighthChapter"
//                             accept="application/pdf"
//                             onChange={handleFileChange}
//                         />
//                         {fileNames.eighthChapter && (
//                             <span className="success-message">
//                                 {fileNames.eighthChapter} uploaded successfully!
//                             </span>
//                         )}
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="ninthChapter">Ninth Chapter (PDF)</label>
//                         <input
//                             type="file"
//                             id="ninthChapter"
//                             name="ninthChapter"
//                             accept="application/pdf"
//                             onChange={handleFileChange}
//                         />
//                         {fileNames.ninthChapter && (
//                             <span className="success-message">
//                                 {fileNames.ninthChapter} uploaded successfully!
//                             </span>
//                         )}
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="tenthChapter">Tenth Chapter (PDF)</label>
//                         <input
//                             type="file"
//                             id="tenthChapter"
//                             name="tenthChapter"
//                             accept="application/pdf"
//                             onChange={handleFileChange}
//                         />
//                         {fileNames.tenthChapter && (
//                             <span className="success-message">
//                                 {fileNames.tenthChapter} uploaded successfully!
//                             </span>
//                         )}
//                     </div>

//                     <button type="submit" disabled={isLoading}>
//                         {isLoading ? 'Submitting...' : 'Submit'}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AdditionalInformation;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component
import { faHome, faCalendar, faClock, faBriefcase, faLanguage, faUser, faDollarSign } from '@fortawesome/free-solid-svg-icons'; // Import required icons
import './AdditionalInformation.css'; // Import the external CSS file

const AdditionalInformation = () => {
    const location = useLocation();
    const { skillId } = location.state;
    const [showMore, setShowMore] = useState(false); // State for Show More button

    const [formData, setFormData] = useState({
        whereILive: '',
        decadeBorn: '',
        timeSpent: '',
        work: '',
        languages: '',
        aboutMe: '',
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
        if (!formData.whereILive.trim()) formErrors.whereILive = 'Where I Live is required';
        if (!formData.decadeBorn.trim()) formErrors.decadeBorn = 'Decade I Was Born is required';
        if (!formData.timeSpent.trim()) formErrors.timeSpent = 'Time spent is required';
        if (!formData.work.trim()) formErrors.work = 'Work is required';
        if (!formData.languages.trim()) formErrors.languages = 'Languages are required';
        if (!formData.aboutMe.trim()) formErrors.aboutMe = 'About Me is required';
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

                formDataObj.append('whereILive', formData.whereILive);
                formDataObj.append('decadeBorn', formData.decadeBorn);
                formDataObj.append('timeSpent', formData.timeSpent);
                formDataObj.append('work', formData.work);
                formDataObj.append('languages', formData.languages);
                formDataObj.append('aboutMe', formData.aboutMe);
                formDataObj.append('pdfPrice', formData.pdfPrice); // Add the PDF price
                formDataObj.append('skillId', skillId);

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
                            <label htmlFor="whereILive">
                                <FontAwesomeIcon icon={faHome} /> Where I Live
                            </label>
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
                            <label htmlFor="decadeBorn">
                                <FontAwesomeIcon icon={faCalendar} /> Decade I Was Born
                            </label>
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
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="timeSpent">
                                <FontAwesomeIcon icon={faClock} /> I Spend Too Much Time
                            </label>
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
                            <label htmlFor="work">
                                <FontAwesomeIcon icon={faBriefcase} /> My Work
                            </label>
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

                        <div className="form-group">
                            <label htmlFor="aboutMe">
                                <FontAwesomeIcon icon={faUser} /> About Me
                            </label>
                            <textarea
                                id="aboutMe"
                                name="aboutMe"
                                value={formData.aboutMe}
                                onChange={handleChange}
                                className="large-input"
                            />
                            {errors.aboutMe && <span className="error">{errors.aboutMe}</span>}
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
