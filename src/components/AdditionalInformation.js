// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faBook, faClock, faUser, faTag,
//     faLanguage, faDollarSign, faImage
// } from '@fortawesome/free-solid-svg-icons';

// const AdditionalInformation = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     // Use skillId from location.state or fallback to localStorage
//     const { skillId } = location.state || {};
//     const storedSkillId = localStorage.getItem('skillId');
//     const currentSkillId = skillId || storedSkillId;

//     const [formData, setFormData] = useState({
//         courseDescription: '',
//         courseDuration: '',
//         targetAudience: '',
//         courseCategory: '',
//         languages: '',
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
//         pdfPrice: '',
//         image: null
//     });

//     const [fileNames, setFileNames] = useState({});
//     const [errors, setErrors] = useState({});
//     const [isLoading, setIsLoading] = useState(false);

//     // Save skillId to localStorage when it is available
//     useEffect(() => {
//         if (currentSkillId) localStorage.setItem('skillId', currentSkillId);
//     }, [currentSkillId]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleFileChange = (e) => {
//         const { name, files } = e.target;
//         const selectedFile = files[0];
//         setFormData({ ...formData, [name]: selectedFile });
//         setFileNames({ ...fileNames, [name]: selectedFile.name });
//     };

//     const handlePriceChange = (e) => {
//         const { value } = e.target;
//         if (/^\d*\.?\d*$/.test(value)) {
//             setFormData({ ...formData, pdfPrice: value });
//         }
//     };

//     const validateForm = () => {
//         let formErrors = {};
//         if (!formData.courseDescription.trim()) formErrors.courseDescription = 'Course description is required';
//         if (!formData.courseDuration.trim()) formErrors.courseDuration = 'Course duration is required';
//         if (!formData.targetAudience.trim()) formErrors.targetAudience = 'Target audience is required';
//         if (!formData.courseCategory.trim()) formErrors.courseCategory = 'Course category is required';
//         if (!formData.languages.trim()) formErrors.languages = 'Languages are required';
//         if (!formData.pdfPrice.trim()) formErrors.pdfPrice = 'Price is required';
//         setErrors(formErrors);
//         return Object.keys(formErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             setIsLoading(true);
//             try {
//                 const formDataObj = new FormData();
//                 formDataObj.append('courseDescription', formData.courseDescription);
//                 formDataObj.append('courseDuration', formData.courseDuration);
//                 formDataObj.append('targetAudience', formData.targetAudience);
//                 formDataObj.append('courseCategory', formData.courseCategory);
//                 formDataObj.append('languages', formData.languages);
//                 formDataObj.append('pdfPrice', formData.pdfPrice);
//                 formDataObj.append('skillId', currentSkillId);

//                 Object.keys(formData).forEach(key => {
//                     if (formData[key] instanceof File) {
//                         formDataObj.append(key, formData[key]);
//                     }
//                 });

//                 const response = await axios.post('http://localhost:8707/api/formdata', formDataObj, {
//                     headers: { 'Content-Type': 'multipart/form-data' },
//                 });

//                 const formDataId = response.data.formData._id;

//                 await axios.patch(`http://localhost:8707/api/skills/${currentSkillId}`, { formDataId });

//                 const skillResponse = await axios.get(`http://localhost:8707/api/skills/${currentSkillId}`);
//                 const submittedStatus = skillResponse.data.submittedStatus;

//                 localStorage.setItem('submittedStatus', submittedStatus);

//                 // Emit custom event to notify Navbar
//                 window.dispatchEvent(new Event('formSubmitted'));

//                 alert('Successfully submitted your information!');
//                 navigate('/list');
//             } catch (error) {
//                 console.error('Error submitting additional information', error);
//             } finally {
//                 setIsLoading(false);
//             }
//         }
//     };
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import CryptoJS from 'crypto-js';

// const AdditionalInformation = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const secretKey = '12345'; // குறியாக்க விசை (Encryption Key)

//     // location.state அல்லது localStorage-ல் இருந்து skillId பெறவும்
//     const { skillId } = location.state || {};
//     const storedSkillId = localStorage.getItem('skillId');
//     let currentSkillId = skillId || storedSkillId;

//     const [formData, setFormData] = useState({
//         courseDescription: '',
//         courseDuration: '',
//         targetAudience: '',
//         courseCategory: '',
//         languages: '',
//         pdfPrice: '',
//         image: null
//     });

//     const [fileNames, setFileNames] = useState({});
//     const [errors, setErrors] = useState({});
//     const [isLoading, setIsLoading] = useState(false);

//     // skillId-ஐ localStorage-ல் encrypt செய்து சேமிக்கவும் (அது ஏற்கனவே சேமிக்கப்படவில்லை என்றால் மட்டும்)
//     useEffect(() => {
//         if (skillId && !storedSkillId) {
//             try {
//                 const encryptedSkillId = CryptoJS.AES.encrypt(skillId, secretKey).toString();
//                 localStorage.setItem('skillId', encryptedSkillId);
//                 console.log('Skill ID encrypted and saved to localStorage:', encryptedSkillId);
//             } catch (error) {
//                 console.error('Error encrypting skillId:', error);
//             }
//         }
//     }, [skillId, storedSkillId, secretKey]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleFileChange = (e) => {
//         const { name, files } = e.target;
//         const selectedFile = files[0];
//         setFormData({ ...formData, [name]: selectedFile });
//         setFileNames({ ...fileNames, [name]: selectedFile.name });
//     };

//     const handlePriceChange = (e) => {
//         const { value } = e.target;
//         if (/^\d*\.?\d*$/.test(value)) {
//             setFormData({ ...formData, pdfPrice: value });
//         }
//     };

//     const validateForm = () => {
//         let formErrors = {};
//         if (!formData.courseDescription.trim()) formErrors.courseDescription = 'Course description is required';
//         if (!formData.courseDuration.trim()) formErrors.courseDuration = 'Course duration is required';
//         if (!formData.targetAudience.trim()) formErrors.targetAudience = 'Target audience is required';
//         if (!formData.courseCategory.trim()) formErrors.courseCategory = 'Course category is required';
//         if (!formData.languages.trim()) formErrors.languages = 'Languages are required';
//         if (!formData.pdfPrice.trim()) formErrors.pdfPrice = 'Price is required';
        
//         setErrors(formErrors);
//         return Object.keys(formErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             setIsLoading(true);
//             try {
//                 const formDataObj = new FormData();
//                 formDataObj.append('courseDescription', formData.courseDescription);
//                 formDataObj.append('courseDuration', formData.courseDuration);
//                 formDataObj.append('targetAudience', formData.targetAudience);
//                 formDataObj.append('courseCategory', formData.courseCategory);
//                 formDataObj.append('languages', formData.languages);
//                 formDataObj.append('pdfPrice', formData.pdfPrice);
    
//                 // localStorage-ல் இருந்து skillId-ஐ பெறுதல் மற்றும் decrypt செய்தல்
//                 const storedSkillId = localStorage.getItem('skillId');
//                 if (storedSkillId) {
//                     try {
//                         const decryptedSkillId = CryptoJS.AES.decrypt(storedSkillId, secretKey).toString(CryptoJS.enc.Utf8);
                        
//                         // Decryption வெற்றிகரமாக உள்ளதா என்பதைச் சரிபார்க்க
//                         console.log("Decrypted Skill ID:", decryptedSkillId);
//                         if (!decryptedSkillId || decryptedSkillId.trim() === '') {
//                             throw new Error('Decryption of skillId failed');
//                         }
    
//                         formDataObj.append('skillId', decryptedSkillId);
    
//                         // formData-ஐ server-க்கு அனுப்புதல்
//                         const response = await axios.post('http://localhost:8707/api/formdata', formDataObj, {
//                             headers: { 'Content-Type': 'multipart/form-data' },
//                         });
    
//                         const formDataId = response.data.formData._id;
//                         await axios.patch(`http://localhost:8707/api/skills/${decryptedSkillId}`, { formDataId });
    
//                         const skillResponse = await axios.get(`http://localhost:8707/api/skills/${decryptedSkillId}`);
//                         const submittedStatus = skillResponse.data.submittedStatus;
//                         localStorage.setItem('submittedStatus', submittedStatus);
    
//                         window.dispatchEvent(new Event('formSubmitted'));
//                         alert('Successfully submitted your information!');
//                         navigate('/list');
//                     } catch (error) {
//                         console.error('Decryption or submission error:', error);
//                         alert('Skill ID decryption failed. Please log in again.');
//                     }
//                 } else {
//                     console.error('Error: currentSkillId is null or undefined');
//                     alert('Skill ID is missing. Please log in again.');
//                 }
//             } catch (error) {
//                 console.error('Error submitting additional information:', error.response ? error.response.data : error.message);
//                 alert('Failed to submit the form. Please try again.');
//             } finally {
//                 setIsLoading(false);
//             }
//         }
//     };
    
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             {/* <div className="bg-white shadow-md rounded-lg p-6 w-full    max-w-3xl"> */}
//             <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl" style={{ marginTop: "500%" }}>

//                 <form className="space-y-6" onSubmit={handleSubmit}>
//                     {/* Form Fields */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="form-group">
//                             <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700">
//                                 <FontAwesomeIcon icon={faBook} /> Course Description
//                             </label>
//                             <textarea
//                                 id="courseDescription"
//                                 name="courseDescription"
//                                 value={formData.courseDescription}
//                                 onChange={handleChange}
//                                 className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
//                             />
//                             {errors.courseDescription && <span className="text-red-500 text-sm">{errors.courseDescription}</span>}
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="courseDuration" className="block text-sm font-medium text-gray-700">
//                                 <FontAwesomeIcon icon={faClock} /> Course Duration
//                             </label>
//                             <input
//                                 type="text"
//                                 id="courseDuration"
//                                 name="courseDuration"
//                                 value={formData.courseDuration}
//                                 onChange={handleChange}
//                                 className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
//                             />
//                             {errors.courseDuration && <span className="text-red-500 text-sm">{errors.courseDuration}</span>}
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="form-group">
//                             <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700">
//                                 <FontAwesomeIcon icon={faUser} /> Target Audience
//                             </label>
//                             <input
//                                 type="text"
//                                 id="targetAudience"
//                                 name="targetAudience"
//                                 value={formData.targetAudience}
//                                 onChange={handleChange}
//                                 className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
//                             />
//                             {errors.targetAudience && <span className="text-red-500 text-sm">{errors.targetAudience}</span>}
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="courseCategory" className="block text-sm font-medium text-gray-700">
//                                 <FontAwesomeIcon icon={faTag} /> Course Category
//                             </label>
//                             <input
//                                 type="text"
//                                 id="courseCategory"
//                                 name="courseCategory"
//                                 value={formData.courseCategory}
//                                 onChange={handleChange}
//                                 className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
//                             />
//                             {errors.courseCategory && <span className="text-red-500 text-sm">{errors.courseCategory}</span>}
//                         </div>
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="languages" className="block text-sm font-medium text-gray-700">
//                             <FontAwesomeIcon icon={faLanguage} /> Languages I Speak
//                         </label>
//                         <input
//                             type="text"
//                             id="languages"
//                             name="languages"
//                             value={formData.languages}
//                             onChange={handleChange}
//                             className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
//                         />
//                         {errors.languages && <span className="text-red-500 text-sm">{errors.languages}</span>}
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="pdfPrice" className="block text-sm font-medium text-gray-700">
//                             <FontAwesomeIcon icon={faDollarSign} /> Price for PDFs (in USD)
//                         </label>
//                         <input
//                             type="number"
//                             id="pdfPrice"
//                             name="pdfPrice"
//                             value={formData.pdfPrice}
//                             onChange={handlePriceChange}
//                             min="1"
//                             className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
//                         />
//                         {errors.pdfPrice && <span className="text-red-500 text-sm">{errors.pdfPrice}</span>}
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="image" className="block text-sm font-medium text-gray-700">
//                             <FontAwesomeIcon icon={faImage} /> Upload Image
//                         </label>
//                         <input
//                             type="file"
//                             id="image"
//                             name="image"
//                             accept="image/*"
//                             onChange={handleFileChange}
//                             className="block w-full mt-1"
//                         />
//                         {fileNames.image && (
//                             <span className="text-green-500 text-sm">{fileNames.image} uploaded successfully!</span>
//                         )}
//                     </div>

                    // {/* File inputs for Roadmap and Chapters */}
                    // <div className="form-group">
                    //     <label htmlFor="roadmapIntroduction" className="block text-sm font-medium text-gray-700">
                    //         Roadmap Introduction (PDF)
                    //     </label>
                    //     <input
                    //         type="file"
                    //         id="roadmapIntroduction"
                    //         name="roadmapIntroduction"
                    //         accept="application/pdf"
                    //         onChange={handleFileChange}
                    //         className="block w-full mt-1"
                    //     />
                    //     {fileNames.roadmapIntroduction && (
                    //         <span className="text-green-500 text-sm">{fileNames.roadmapIntroduction} uploaded successfully!</span>
                    //     )}
                    // </div>

//                     {/* Chapter fields */}
//                     {['firstChapter', 'secondChapter', 'thirdChapter', 'fourthChapter', 'fifthChapter', 'sixthChapter', 'seventhChapter', 'eighthChapter', 'ninthChapter', 'tenthChapter'].map((chapter) => (
//                         <div className="form-group" key={chapter}>
//                             <label htmlFor={chapter} className="block text-sm font-medium text-gray-700">
//                                 {chapter.replace(/([A-Z])/g, ' $1')} (PDF)
//                             </label>
//                             <input
//                                 type="file"
//                                 id={chapter}
//                                 name={chapter}
//                                 accept="application/pdf"
//                                 onChange={handleFileChange}
//                                 className="block w-full mt-1"
//                             />
//                             {fileNames[chapter] && (
//                                 <span className="text-green-500 text-sm">{fileNames[chapter]} uploaded successfully!</span>
//                             )}
//                         </div>
//                     ))}

//                     <button
//                         type="submit"
//                         disabled={isLoading}
//                         className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
//                     >
//                         {isLoading ? 'Submitting...' : 'Submit'}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AdditionalInformation;






















import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBook, faClock, faUser, faTag,
    faLanguage, faDollarSign, faImage,faPlus
} from '@fortawesome/free-solid-svg-icons';

import backgroundImage from '../assets/a-man-reads-a-book-1024x683.jpg';  // Import the background image


const AdditionalInformation = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Use skillId from location.state or fallback to localStorage
    const { skillId } = location.state || {};
    const storedSkillId = localStorage.getItem('skillId');
    const currentSkillId = skillId || storedSkillId;

    const [formData, setFormData] = useState({
        courseDescription: '',
        courseDuration: '',
        targetAudience: '',
        courseCategory: '',
        languages: '',
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
        pdfPrice: '',
        image: null
    });

    const [fileNames, setFileNames] = useState({});
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [chapterCount, setChapterCount] = useState(1); // Start with 1 chapter visible


    // Save skillId to localStorage when it is available
    useEffect(() => {
        if (currentSkillId) localStorage.setItem('skillId', currentSkillId);
    }, [currentSkillId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const selectedFile = files[0];
        setFormData({ ...formData, [name]: selectedFile });
        setFileNames({ ...fileNames, [name]: selectedFile.name });
    };

    const handlePriceChange = (e) => {
        const { value } = e.target;
        if (/^\d*\.?\d*$/.test(value)) {
            setFormData({ ...formData, pdfPrice: value });
        }
    };
    const handleShowNextChapter = () => {
        if (chapterCount < 10) {
          setChapterCount((prev) => prev + 1);
        }
      };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.courseDescription.trim()) formErrors.courseDescription = 'Course description is required';
        if (!formData.courseDuration.trim()) formErrors.courseDuration = 'Course duration is required';
        if (!formData.targetAudience.trim()) formErrors.targetAudience = 'Target audience is required';
        if (!formData.courseCategory.trim()) formErrors.courseCategory = 'Course category is required';
        if (!formData.languages.trim()) formErrors.languages = 'Languages are required';
        if (!formData.pdfPrice.trim()) formErrors.pdfPrice = 'Price is required';
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
                formDataObj.append('pdfPrice', formData.pdfPrice);
                formDataObj.append('skillId', currentSkillId);

                Object.keys(formData).forEach(key => {
                    if (formData[key] instanceof File) {
                        formDataObj.append(key, formData[key]);
                    }
                });

                const response = await axios.post('http://localhost:8707/api/formdata', formDataObj, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                const formDataId = response.data.formData._id;

                await axios.patch(`http://localhost:8707/api/skills/${currentSkillId}`, { formDataId });

                const skillResponse = await axios.get(`http://localhost:8707/api/skills/${currentSkillId}`);
                const submittedStatus = skillResponse.data.submittedStatus;

                localStorage.setItem('submittedStatus', submittedStatus);

                // Emit custom event to notify Navbar
                window.dispatchEvent(new Event('formSubmitted'));

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
  <div
  className="min-h-screen flex items-center justify-center bg-gray-100"
  style={{
    backgroundImage: `url(${backgroundImage})`, // Use the imported image
    backgroundSize: 'cover', // Ensures the image covers the entire container
    backgroundPosition: 'center', // Center the background image
    backgroundRepeat: 'no-repeat', // Prevent the image from repeating
    height: '100vh', // Ensure full viewport height
    width: '100vw', // Ensure full viewport width
    position: 'relative', // Ensures the image maintains relative positioning
  }}
>
  <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl mt-[8%] bg-opacity-90">
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700">
            <FontAwesomeIcon icon={faBook} /> Course Description
          </label>
          <textarea
            id="courseDescription"
            name="courseDescription"
            value={formData.courseDescription}
            onChange={handleChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="form-group">
          <label htmlFor="courseDuration" className="block text-sm font-medium text-gray-700">
            <FontAwesomeIcon icon={faClock} /> Course Duration
          </label>
          <input
            type="text"
            id="courseDuration"
            name="courseDuration"
            value={formData.courseDuration}
            onChange={handleChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700">
            <FontAwesomeIcon icon={faUser} /> Target Audience
          </label>
          <input
            type="text"
            id="targetAudience"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="form-group">
          <label htmlFor="courseCategory" className="block text-sm font-medium text-gray-700">
            <FontAwesomeIcon icon={faTag} /> Course Category
          </label>
          <input
            type="text"
            id="courseCategory"
            name="courseCategory"
            value={formData.courseCategory}
            onChange={handleChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="languages" className="block text-sm font-medium text-gray-700">
          <FontAwesomeIcon icon={faLanguage} /> Languages I Speak
        </label>
        <input
          type="text"
          id="languages"
          name="languages"
          value={formData.languages}
          onChange={handleChange}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div className="form-group">
        <label htmlFor="pdfPrice" className="block text-sm font-medium text-gray-700">
          <FontAwesomeIcon icon={faDollarSign} /> Price for PDFs (in USD)
        </label>
        <input
          type="number"
          id="pdfPrice"
          name="pdfPrice"
          value={formData.pdfPrice}
          onChange={handlePriceChange}
          min="1"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div className="form-group">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          <FontAwesomeIcon icon={faImage} /> Upload Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full mt-1"
        />
        {fileNames.image && (
          <span className="text-green-500 text-sm">{fileNames.image} uploaded successfully!</span>
        )}
      </div>

      {/* File inputs for Roadmap and Chapters */}
      <div className="form-group">
        <label htmlFor="roadmapIntroduction" className="block text-sm font-medium text-gray-700">
          <FontAwesomeIcon icon={faBook} /> Roadmap Introduction (PDF)
        </label>
        <input
          type="file"
          id="roadmapIntroduction"
          name="roadmapIntroduction"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full mt-1"
        />
        {fileNames.roadmapIntroduction && (
          <span className="text-green-500 text-sm">{fileNames.roadmapIntroduction} uploaded successfully!</span>
        )}
      </div>

      {/* Scrollable PDF Section */}
      <div className="max-h-48 overflow-y-auto border p-4 rounded-md">
        {[...Array(chapterCount)].map((_, index) => (
          <div className="form-group" key={index}>
            <label htmlFor={`chapter${index + 1}`} className="block text-sm font-medium text-gray-700">
              Chapter {index + 1} (PDF)
            </label>
            <input
              type="file"
              id={`chapter${index + 1}`}
              name={`chapter${index + 1}`}
              accept="application/pdf"
              onChange={handleFileChange}
              className="block w-full mt-1"
            />
            {fileNames[`chapter${index + 1}`] && (
              <span className="text-green-500 text-sm">{fileNames[`chapter${index + 1}`]} uploaded successfully!</span>
            )}
          </div>
        ))}

        {chapterCount < 10 && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleShowNextChapter}
              className="text-blue-500 hover:text-blue-700"
            >
              <FontAwesomeIcon icon={faPlus} /> Add Chapter
            </button>
          </div>
        )}
      </div>

      <button
  type="submit"
  disabled={isLoading}
  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
>
  {isLoading ? 'Submitting...' : 'Submit'}
</button>
g
    </form>
  </div>
</div>

);
};

export default AdditionalInformation;
    
    









