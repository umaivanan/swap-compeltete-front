// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import './AdditionalInformation.css'; // Import the external CSS file
// // import formimage from '/home/ukijaffna/Documents/swappdf/swapSmartFrontend/src/assets/jotform-mobile-forms_still_2x.gif';

// const AdditionalInformation = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const skillId = location.state?.skillId || null;
//     // useEffect(() => {
//     //     if (!skillId) {
//     //         alert('Skill ID not found. Please go back and submit the form again.');
//     //         navigate('/skill-form'); // Change '/' to the appropriate route
//     //     }
//     // }, [skillId, navigate]);

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
//     const [errors, setErrors] = useState({});
//     const [isLoading, setIsLoading] = useState(false);
//     const [uploadedFiles, setUploadedFiles] = useState([]); // State for uploaded files
//     // const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleFileChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.files[0] });
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

//                 // Append all the chapter files
//                 formDataObj.append('roadmapIntroduction', formData.roadmapIntroduction);
//                 formDataObj.append('firstChapter', formData.firstChapter);
//                 formDataObj.append('secondChapter', formData.secondChapter);
//                 formDataObj.append('thirdChapter', formData.thirdChapter);
//                 formDataObj.append('fourthChapter', formData.fourthChapter);
//                 formDataObj.append('fifthChapter', formData.fifthChapter);
//                 formDataObj.append('sixthChapter', formData.sixthChapter);
//                 formDataObj.append('seventhChapter', formData.seventhChapter);
//                 formDataObj.append('eighthChapter', formData.eighthChapter);
//                 formDataObj.append('ninthChapter', formData.ninthChapter);
//                 formDataObj.append('tenthChapter', formData.tenthChapter);

//                 const response = await axios.post('http://localhost:8703/api/formdata', formDataObj, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                     },
//                 });

//                 const formDataId = response.data.formData._id;

//                 await axios.patch(`http://localhost:8703/api/skills/${skillId}`, { formDataId });

//                 setUploadedFiles(response.data.formData); // Update with the uploaded form data

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
//             <div className="image-container">
//                 {/* <img src={formimage} alt="Side Image" className="side-image" /> */}
//             </div>
//             <div className="form-container">
//                 <form className="additional-information-form" onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label htmlFor="whereILive">Where I Live</label>
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
//                         <label htmlFor="decadeBorn">Decade I Was Born</label>
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
//                         <label htmlFor="timeSpent">I Spend Too Much Time</label>
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
//                         <label htmlFor="work">My Work</label>
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
//                         <label htmlFor="languages">Languages I Speak</label>
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
//                         <label htmlFor="aboutMe">About Me</label>
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
import './AdditionalInformation.css'; // Import the external CSS file
// import formimage from '/home/ukijaffna/Documents/swappdf/swapSmartFrontend/src/assets/jotform-mobile-forms_still_2x.gif';

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
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]); // State for uploaded files
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
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

                // Append all the chapter files
                formDataObj.append('roadmapIntroduction', formData.roadmapIntroduction);
                formDataObj.append('firstChapter', formData.firstChapter);
                formDataObj.append('secondChapter', formData.secondChapter);
                formDataObj.append('thirdChapter', formData.thirdChapter);
                formDataObj.append('fourthChapter', formData.fourthChapter);
                formDataObj.append('fifthChapter', formData.fifthChapter);
                formDataObj.append('sixthChapter', formData.sixthChapter);
                formDataObj.append('seventhChapter', formData.seventhChapter);
                formDataObj.append('eighthChapter', formData.eighthChapter);
                formDataObj.append('ninthChapter', formData.ninthChapter);
                formDataObj.append('tenthChapter', formData.tenthChapter);

                const response = await axios.post('http://localhost:8703/api/formdata', formDataObj, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const formDataId = response.data.formData._id;

                await axios.patch(`http://localhost:8703/api/skills/${skillId}`, { formDataId });

                setUploadedFiles(response.data.formData); // Update with the uploaded form data

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
                {/* <img src={formimage} alt="Side Image" className="side-image" /> */}
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
                    </div>

                    <div className="form-group">
                        <label htmlFor="firstChapter">First Chapter (PDF)</label>
                        <input
                            type="file"
                            id="firstChapter"
                            name="firstChapter"
                            accept="application/pdf"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="secondChapter">Second Chapter (PDF)</label>
                        <input
                            type="file"
                            id="secondChapter"
                            name="secondChapter"
                            accept="application/pdf"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="thirdChapter">Third Chapter (PDF)</label>
                        <input
                            type="file"
                            id="thirdChapter"
                            name="thirdChapter"
                            accept="application/pdf"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="fourthChapter">Fourth Chapter (PDF)</label>
                        <input
                            type="file"
                            id="fourthChapter"
                            name="fourthChapter"
                            accept="application/pdf"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="fifthChapter">Fifth Chapter (PDF)</label>
                        <input
                            type="file"
                            id="fifthChapter"
                            name="fifthChapter"
                            accept="application/pdf"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sixthChapter">Sixth Chapter (PDF)</label>
                        <input
                            type="file"
                            id="sixthChapter"
                            name="sixthChapter"
                            accept="application/pdf"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="seventhChapter">Seventh Chapter (PDF)</label>
                        <input
                            type="file"
                            id="seventhChapter"
                            name="seventhChapter"
                            accept="application/pdf"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="eighthChapter">Eighth Chapter (PDF)</label>
                        <input
                            type="file"
                            id="eighthChapter"
                            name="eighthChapter"
                            accept="application/pdf"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="ninthChapter">Ninth Chapter (PDF)</label>
                        <input
                            type="file"
                            id="ninthChapter"
                            name="ninthChapter"
                            accept="application/pdf"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tenthChapter">Tenth Chapter (PDF)</label>
                        <input
                            type="file"
                            id="tenthChapter"
                            name="tenthChapter"
                            accept="application/pdf"
                            onChange={handleFileChange}
                        />
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