// import React, { useState } from 'react';
// import googleAdsIcon from '../assets/maxresdefault.jpg';
// import twoPlusUsers from '../assets/PDF Summarizer (3).png';
// import returnCustomers from '../assets/0-roadmap-infographics___media_library_original_655_368.webp';
// import second from '../assets/pexels-photo-814544.webp';
// import third from '../assets/pexels-photo-814544.webp';
// import fifth from '../assets/pexels-photo-3183197 (1).jpeg';
// // import video from '../assets/Untitled (2).mp4';
// import Popup from './Popup'; // Assuming you have the Popup component
// import { FaRegCircle } from 'react-icons/fa'; // Importing an icon from react-icons
// import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

// import fourth from '../assets/DALL·E 2024-10-12 08.42.43 - A visually engaging image illustrating the concept of a journey of learning and skill development through structured use of PDFs. The scene features a.webp';

// const Hero = () => {
//   const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
//   const [activeCard, setActiveCard] = useState(null); // State for controlling card activity

//   // Function to toggle the popup
//   const togglePopup = () => {
//     setShowPopup(!showPopup);
//   };

//   // Function to handle card click in AboutUsSection
//   const handleCardClick = (card) => {
//     setActiveCard(card === activeCard ? null : card); // Toggle active card
//   };

//   const isCardActive = (card) => activeCard === card || !activeCard;

//   return (
//     <div>
//       {/* Conditionally apply blur to the background content when popup is active */}
//       <div className={showPopup ? "content-blur" : ""}>
        
//         {/* Hero Section */}
//         <section className="relative min-h-screen flex flex-col justify-center items-center mt-20 px-5 py-10 bg-gradient-to-br from-[#01352C] to-[#000000] text-white">

//           <div className="flex flex-col items-center mt-[-50rem]">
//             <div className="relative w-screen h-screen mt-[250rem] mb-[5rem] rounded-lg overflow-hidden shadow-lg">
//             {/* <video 
//   className="absolute top-0 left-0 w-full h-full object-cover" 
//   autoPlay 
//   loop 
//   muted 
//   src={video} 
//   alt="Main video"
//   style={{
//     filter: "brightness(0.5) contrast(1.1)", // Darken the video and enhance contrast
//   }}
// /> */}
//                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center group">
//   <h1
//     className="text-[#BAD8B6] text-9xl font-bold opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-in-out"
//     style={{
//       textShadow: "0 0 10px rgba(255, 255, 0, 0.8), 0 0 20px rgba(0, 255, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.9)",
//       filter: "drop-shadow(0 0 5px #000)",
//     }}
//   >
//     SWAP SMART
//   </h1>
// </div>
//               <p className="text-xl mt-2 text-[#E1EACD]">Empowering Businesses Through Strategic Social Media Management</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
//   {/* Card 1 */}
//   <div className="bg-gradient-to-r from-[#01352C] to-[#61B390] p-10 rounded-xl shadow-2xl text-center transform transition-transform hover:scale-105 hover:shadow-3xl">
//     <img src={googleAdsIcon} alt="Google Ads Skill" className="w-32 h-32 mx-auto mb-6 rounded-full shadow-lg" />
//     <h3 className="text-3xl font-bold text-[#E1EACD]">Expert in Social Media Strategy</h3>
//     <p className="text-lg text-[#BAD8B6] mt-4">
//       Maximize your social presence with effective Google Ads management.
//     </p>
//     <button className="mt-6 px-6 py-2 text-lg font-semibold text-[#01352C] bg-[#E1EACD] rounded-full hover:bg-[#BAD8B6]">
//       Learn More
//     </button>
//   </div>

//   {/* Card 2 */}
//   <div className="bg-gradient-to-r from-[#01352C] to-[#61B390] p-10 rounded-xl shadow-2xl text-center transform transition-transform hover:scale-105 hover:shadow-3xl">
//     <img src={twoPlusUsers} alt="Data-Driven Marketing Skill" className="w-32 h-32 mx-auto mb-6 rounded-full shadow-lg" />
//     <h3 className="text-3xl font-bold text-[#E1EACD]">Data-Driven Marketing</h3>
//     <p className="text-lg text-[#BAD8B6] mt-4">
//       Leverage insights to drive impactful and measurable marketing strategies.
//     </p>
//     <button className="mt-6 px-6 py-2 text-lg font-semibold text-[#01352C] bg-[#E1EACD] rounded-full hover:bg-[#BAD8B6]">
//       Learn More
//     </button>
//   </div>

//   {/* Card 3 */}
//   <div className="bg-gradient-to-r from-[#01352C] to-[#61B390] p-10 rounded-xl shadow-2xl text-center transform transition-transform hover:scale-105 hover:shadow-3xl">
//     <img src={returnCustomers} alt="Creative Campaign Design Skill" className="w-32 h-32 mx-auto mb-6 rounded-full shadow-lg" />
//     <h3 className="text-3xl font-bold text-[#E1EACD]">Creative Campaign Design</h3>
//     <p className="text-lg text-[#BAD8B6] mt-4">
//       Crafting engaging and innovative campaigns to attract and retain customers.
//     </p>
//     <button className="mt-6 px-6 py-2 text-lg font-semibold text-[#01352C] bg-[#E1EACD] rounded-full hover:bg-[#BAD8B6]">
//       Learn More
//     </button>
//   </div>

//   {/* Card 4 (New Card) */}
//   <div className="bg-gradient-to-r from-[#01352C] to-[#61B390] p-10 rounded-xl shadow-2xl text-center transform transition-transform hover:scale-105 hover:shadow-3xl">
//     <img src={fifth} alt="Innovative Growth Strategies" className="w-32 h-32 mx-auto mb-6 rounded-full shadow-lg" />
//     <h3 className="text-3xl font-bold text-[#E1EACD]">Innovative Growth Strategies</h3>
//     <p className="text-lg text-[#BAD8B6] mt-4">
//       Develop unique strategies to enhance business growth and customer retention.
//     </p>
//     <button className="mt-6 px-6 py-2 text-lg font-semibold text-[#01352C] bg-[#E1EACD] rounded-full hover:bg-[#BAD8B6]">
//       Learn More
//     </button>
//   </div>
// </div>

//           </div>
//         </section>

//         {/* About Us Section */}
//         <section className="relative py-12 px-20 bg-gradient-to-br from-[#01352C] to-[#000000]">
//           <h2 className="text-4xl text-[#ff4500] text-center mb-10 relative z-10">About Us</h2>

//           {/* Centerline (starts below heading) */}
//           <div className="absolute top-1 left-1/2 w-[10px]  h-[100%] bg-gray-300"></div>

//           <div className="relative flex flex-wrap gap-8">

//             {/* Card 1 (Left side) */}
//             <div className="relative flex w-full justify-end pr-[55%]">
//               <div className="flex items-center space-x-4">
//                 <div className="bg-[#01352C] p-10 rounded-lg shadow-lg w-[500px] h-[450px]">
//                   <img src={second} alt="Our Story" className="w-full h-40 object-cover mb-4 rounded" />
//                   <h3 className="text-2xl text-[#E1EACD] mb-4">Our Story</h3>
//                   <p className="text-[#BAD8B6] mb-4">
//                     Our journey began with a deep-rooted passion for structured learning and skill development, driven by the belief that education is the foundation for personal and professional growth...
//                   </p>
//                 </div>
//               </div>
//               <span className="absolute flex items-center text-[#61B390] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                 <FaRegCircle className="mr-2" /> 1
//               </span>
//             </div>

//             {/* Card 2 (Right side) */}
//             <div className="relative flex w-full justify-start pl-[55%]">
//               <span className="absolute flex items-center text-[#61B390] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                 <FaRegCircle className="mr-2" /> 2
//               </span>
//               <div className="flex items-center space-x-4">
//                 <div className="bg-[#01352C] p-10 rounded-lg shadow-lg w-[500px] h-[450px]">
//                   <img src={third} alt="Key Roadmap PDFs" className="w-full h-40 object-cover mb-4 rounded" />
//                   <h3 className="text-2xl text-[#E1EACD] mb-4">Key Roadmap PDFs</h3>
//                   <p className="text-[#BAD8B6] mb-4">
//                     We provide highly detailed roadmap PDFs for a wide range of skills, including Programming, Data Science, and Digital Marketing...
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Card 3 (Left side) */}
//             <div className="relative flex w-full justify-end pr-[55%]">
//               <div className="flex items-center space-x-4">
//                 <div className="bg-[#01352C] p-10 rounded-lg shadow-lg w-[500px] h-[450px]">
//                   <img src={fourth} alt="What is Skill Share" className="w-full h-40 object-cover mb-4 rounded" />
//                   <h3 className="text-2xl text-[#E1EACD] mb-4">What is Skill Share?</h3>
//                   <p className="text-[#BAD8B6] mb-4">
//                     Skill Share is a platform where you can learn and share skills with others...
//                   </p>
//                 </div>
//               </div>
//               <span className="absolute flex items-center text-[#61B390] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                 <FaRegCircle className="mr-2" /> 3
//               </span>
//             </div>

//             {/* Card 4 (Right side) */}
//             <div className="relative flex w-full justify-start pl-[55%]">
//               <span className="absolute flex items-center text-[#61B390] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                 <FaRegCircle className="mr-2" /> 4
//               </span>
//               <div className="flex items-center space-x-4">
//                 <div className="bg-[#01352C] p-10 rounded-lg shadow-lg w-[500px] h-[450px]">
//                   <img src={fifth} alt="How does it work" className="w-full h-40 object-cover mb-4 rounded" />
//                   <h3 className="text-2xl text-[#E1EACD] mb-4">How does it work?</h3>
//                   <p className="text-[#BAD8B6] mb-4">
//                     We connect learners with instructors and provide resources for skill development...
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="bg-gradient-to-br from-[#01352C] to-[#000000] py-10">
//   <div className="container mx-auto px-4">
//     <h2 className="text-3xl font-bold text-center text-white mb-8">Contact Us</h2>
    
//     <div className="flex justify-around flex-wrap">
//       {/* Contact Information */}
//       <div className="mb-6 w-full md:w-1/3 text-center">
//         <h3 className="text-xl font-semibold text-white mb-4">
//           <FaMapMarkerAlt className="inline-block mr-2" /> Our Office
//         </h3>
//         <p className="text-white">1234 Main Street</p>
//         <p className="text-white">City Name, ST 12345</p>
//         <p className="text-white">Country</p>
//       </div>
      
//       {/* Phone Number */}
//       <div className="mb-6 w-full md:w-1/3 text-center">
//         <h3 className="text-xl font-semibold text-white mb-4">
//           <FaPhoneAlt className="inline-block mr-2" /> Call Us
//         </h3>
//         <p className="text-white">+1 (555) 123-4567</p>
//         <p className="text-white">Mon - Fri: 9:00 AM - 5:00 PM</p>
//       </div>

//       {/* Email Address */}
//       <div className="mb-6 w-full md:w-1/3 text-center">
//         <h3 className="text-xl font-semibold text-white mb-4">
//           <FaEnvelope className="inline-block mr-2" /> Email Us
//         </h3>
//         <p className="text-white">info@yourdomain.com</p>
//         <p className="text-white">support@yourdomain.com</p>
//       </div>
//     </div>

//     {/* Social Media */}
//     <div className="text-center mt-8">
//       <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
//       <div className="flex justify-center space-x-6">
//         <a href="#facebook" className="text-white hover:underline">
//           <FaFacebook className="inline-block mr-2" /> Facebook
//         </a>
//         <a href="#twitter" className="text-white hover:underline">
//           <FaTwitter className="inline-block mr-2" /> Twitter
//         </a>
//         <a href="#instagram" className="text-white hover:underline">
//           <FaInstagram className="inline-block mr-2" /> Instagram
//         </a>
//         <a href="#linkedin" className="text-white hover:underline">
//           <FaLinkedin className="inline-block mr-2" /> LinkedIn
//         </a>
//       </div>
//     </div>

//   </div>
// </section>


//         {/* Footer Section */}
//         <footer className="bg-gradient-to-br from-[#01352C] to-[#000000] text-white py-10">
//   <div className="flex justify-center space-x-10 mb-5">
//     <a href="#link1" className="relative font-normal text-white transition duration-300 ease-in-out active:animate-bulb">Home</a>
//     <a href="#link2" className="relative font-normal text-white transition duration-300 ease-in-out active:animate-bulb">About</a>
//     <a href="#link3" className="relative font-normal text-white transition duration-300 ease-in-out active:animate-bulb">Services</a>
//     <a href="#link4" className="relative font-normal text-white transition duration-300 ease-in-out active:animate-bulb">Contact</a>
//     <a href="#link5" className="relative font-normal text-white transition duration-300 ease-in-out active:animate-bulb">FAQ</a>
//   </div>
//   <div className="text-center">
//     <p className="text-sm text-[#BAD8B6]">© 2024 Swap Smart. All rights reserved.</p>
//   </div>
// </footer>


//       </div>

//       {/* Popup Section */}
//       {showPopup && <Popup onClose={togglePopup} />}
//     </div>
//   );
// };

// export default Hero;

// // import React, { useState } from 'react';
// // // import googleAdsIcon from '../assets/maxresdefault.jpg';
// // // import twoPlusUsers from '../assets/PDF Summarizer (3).png';
// // // import returnCustomers from '../assets/0-roadmap-infographics___media_library_original_655_368.webp';
// // import second from '../assets/pexels-photo-814544.webp';
// // import third from '../assets/pexels-photo-814544.webp';
// // import fifth from '../assets/pexels-photo-3183197 (1).jpeg';
// // import combinedImage from '/home/ukijaffna/um/swapSmartFrontend/src/assets/DALL·E 2024-10-18 19.32.11 - A simple, full-screen road map image with clear points numbered from 1 to 10, each point representing a chapter or milestone. The road stretches from  (1).webp';

// // import heroImage from '/home/ukijaffna/um/swapSmartFrontend/src/assets/DALL·E 2024-10-18 19.58.47 - A layered image with two parts_ The first part is a smaller version of a roadmap image, similar to a diagram showing numbered points. The second image.webp'; // Replace with your full-screen image
// // import Popup from './Popup'; // Assuming you have the Popup component
// // import { FaRegCircle } from 'react-icons/fa'; // Importing an icon from react-icons
// // import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
// // import webDesignImage from '/home/ukijaffna/um/swapSmartFrontend/src/assets/DALL·E 2024-10-18 19.58.47 - A layered image with two parts_ The first part is a smaller version of a roadmap image, similar to a diagram showing numbered points. The second image.webp'; // Adjust the path as needed
// // import webScrapingImage from '/home/ukijaffna/um/swapSmartFrontend/src/assets/Best-Way-to-Master-Spring-Boot-A-Complete-Roadmap.png'; // Adjust the path as needed
// // import pythonDataScienceImage from '/home/ukijaffna/um/swapSmartFrontend/src/assets/Best-Way-to-Master-Spring-Boot-A-Complete-Roadmap.png'; // Adjust the path as needed

// // import fourth from '../assets/DALL·E 2024-10-12 08.42.43 - A visually engaging image illustrating the concept of a journey of learning and skill development through structured use of PDFs. The scene features a.webp';

// // const Hero = () => {
// //   const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
// //   const [activeCard, setActiveCard] = useState(null); // State for controlling card activity

// //   // Function to toggle the popup
// //   const togglePopup = () => {
// //     setShowPopup(!showPopup);
// //   };

// //   // Function to handle card click in AboutUsSection
// //   const handleCardClick = (card) => {
// //     setActiveCard(card === activeCard ? null : card); // Toggle active card
// //   };

// //   const isCardActive = (card) => activeCard === card || !activeCard;

// //   return (
// //     <div>
// //       {/* Conditionally apply blur to the background content when popup is active */}
// //       <div className={showPopup ? "content-blur" : ""}>
        
// //       <div className="w-full max-w-full overflow-x-hidden">

        

// //         {/* Hero Section */}
// //         <section className="relative min-h-screen flex flex-col justify-center items-center mt-20 px-5 py-10 bg-[#98DED9] text-white">
// //   {/* First Section */}
// //   <div className="flex flex-col items-center mt-[270rem] mb-20"> 
// //     <div className="relative w-screen h-screen rounded-lg overflow-hidden shadow-lg">
// //       <img 
// //         src={heroImage} 
// //         alt="Main hero" 
// //         className="absolute top-0 left-0 w-full h-full object-cover"
// //         style={{

// //           filter: "brightness(0.5) contrast(1.1)", // Darken the image and enhance contrast
// //         }}
// //       />
// //       <div className="absolute top-0 left-0 w-full h-full flex justify-start items-start p-20">
// //         <h1
// //           className="text-[#0B2F9F] text-8xl font-bold"
// //           style={{
// //             textShadow: "0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(0, 0, 0, 0.5)",
// //             filter: "drop-shadow(0 0 3px #000)",
// //           }}
// //         >
// //           SWAP SMART
// //         </h1>
// //       </div>
// //       <p className="text-xl mt-2 text-[#E1EACD]">
// //         Empowering Businesses Through Strategic Social Media Management
// //       </p>
// //     </div>
// //   </div>

// //   {/* Second Section */}
// //   <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B2F9F] to-[#C7FFD8] py-20 mt-20">
// //     {/* Full-Width Container */}
// //     <div className="w-full max-w-screen-2xl px-10 py-10">
      
// //       {/* Search Bar */}
// //       <div className="text-center mb-12">
// //   <h1 className="text-5xl font-bold text-white mb-8">Search Courses</h1>
// //   <div className="flex justify-center items-center">
// //     <input
// //       type="text"
// //       placeholder="Search for over 10k+ courses"
// //       className="p-2 rounded-l-md w-48 sm:w-64 text-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
// //     />
// //     <div className="ml-2">
// //       <button 
// //         className="p-2 bg-[#161D6F] text-white text-lg rounded-md hover:bg-blue-800 transition duration-300"
// //       >
// //         Search
// //       </button>
// //     </div>
// //   </div>
// // </div>


// //       {/* Benefits Section */}
// //       <div className="flex flex-col md:flex-row items-center justify-center mb-20">
// //         {/* Image Grid */}
// //         <div className="grid grid-cols-2 gap-8 md:mr-10">
// //         <div className="col-span-2">
// //   <img 
// //     src={combinedImage} 
// //     alt="Combined Image" 
// //     className="rounded-lg w-2/4 h-auto mx-auto" // Adjust the width to 75% and keep height auto
// //   />
// // </div>
// //     </div>

// //         {/* Benefit List */}
// //         <div className="flex justify-start mt-12 md:mt-0 md:mr-[25%] text-white">
// //   <div>
// //     <h2 className="text-3xl font-semibold mb-8 whitespace-nowrap">Benefits for swapsmart</h2>
// //     <ul className="list-none space-y-5 text-xl">
// //       <li className="flex items-center whitespace-nowrap">
// //         <span className="bg-[#161D6F] rounded-full h-10 w-10 flex items-center justify-center text-white mr-4 text-lg">🎓</span>
// //         Online modules
// //       </li>
// //       <li className="flex items-center whitespace-nowrap">
// //         <span className="bg-[#161D6F] rounded-full h-10 w-10 flex items-center justify-center text-white mr-4 text-lg">📚</span>
// //         Improve skills
// //       </li>
// //       <li className="flex items-center whitespace-nowrap">
// //         <span className="bg-[#161D6F] rounded-full h-10 w-10 flex items-center justify-center text-white mr-4 text-lg">👩‍🏫</span>
// //         Training From Experts
// //       </li>
// //       <li className="flex items-center whitespace-nowrap">
// //         <span className="bg-[#161D6F] rounded-full h-10 w-10 flex items-center justify-center text-white mr-4 text-lg">💵</span>
// //         Low & Free modules
// //       </li>
// //     </ul>
// //   </div>
// // </div>



// //       </div>

// //       {/* Popular Courses Section */}
// //       <div className="text-center mb-16">
// //         <h2 className="text-4xl font-bold text-white mb-6">Our Popular modules</h2>
// //         <p className="text-white mb-12 text-lg">
// //           Choose from our selection of highly rated modules and enhance your skills.
// //         </p>

// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
// //       {/* Course Card 1 */}
// //       <div className="bg-white p-6 rounded-lg shadow-lg">
// //         <img src={webDesignImage} alt="Web Design Course" className="rounded-t-lg w-full h-56 object-cover" />
// //         <h3 className="text-2xl font-semibold mt-4">Web Design & Development</h3>
// //         <p className="text-gray-600 mt-2 text-lg">$5.00</p>
// //       </div>

// //       {/* Course Card 2 */}
// //       <div className="bg-white p-6 rounded-lg shadow-lg">
// //         <img src={webScrapingImage} alt="Web Scraping Course" className="rounded-t-lg w-full h-56 object-cover" />
// //         <h3 className="text-2xl font-semibold mt-4">Web Scraping & Automation</h3>
// //         <p className="text-gray-600 mt-2 text-lg">$8.00</p>
// //       </div>

// //       {/* Course Card 3 */}
// //       <div className="bg-white p-6 rounded-lg shadow-lg">
// //         <img src={pythonDataScienceImage} alt="Python for Data Science" className="rounded-t-lg w-full h-56 object-cover" />
// //         <h3 className="text-2xl font-semibold mt-4">Python for Data Science</h3>
// //         <p className="text-gray-600 mt-2 text-lg">$10.00</p>
// //       </div>
// //     </div>
// //       </div>
// //     </div>
// //   </div>
// // </section>


// // <section className="relative py-12 px-20 bg-gradient-to-br bg-[#98DED9]">
// //   <h2 className="text-4xl text-[#ff4500] text-center mb-10 relative z-10">About Us</h2>

// //   <div className="relative flex flex-wrap gap-8">
// //     {/* Card 1 (Left side) */}
// //     <div className="relative flex w-full justify-end pr-[55%]">
// //       <div className="flex items-center space-x-4">
// //         <div className="bg-gradient-to-br from-[#0B2F9F] to-[#C7FFD8] p-10 rounded-lg shadow-lg w-[500px] h-[450px]">
// //           <img src={second} alt="Our Story" className="w-full h-40 object-cover mb-4 rounded" />
// //           <h3 className="text-2xl text-[#E1EACD] mb-4">Our Story</h3>
// //           <p className="text-[#BAD8B6] mb-4">
// //             Our journey began with a deep-rooted passion for creating meaningful connections through technology and innovation. What started as a small idea has now evolved into a thriving community focused on empowering individuals and businesses. Every step we take is driven by our commitment to growth, learning, and helping others succeed in a rapidly changing world.
// //           </p>
// //         </div>
// //       </div>
// //     </div>

// //     {/* Add more cards or elements here */}
// //   </div>
// // </section>


// //         <section className="bg-gradient-to-br from-[#01352C] to-[#000000] py-10">
// //           <div className="container mx-auto px-4">
// //             <h2 className="text-3xl font-bold text-center text-white mb-8">Contact Us</h2>
            
// //             <div className="flex justify-around flex-wrap">
// //               {/* Contact Information */}
// //               <div className="mb-6 w-full md:w-1/3 text-center">
// //                 <h3 className="text-xl font-semibold text-white mb-4">
// //                   <FaMapMarkerAlt className="inline-block mr-2" /> Our Office
// //                 </h3>
// //                 <p className="text-white">1234 Main Street</p>
// //                 <p className="text-white">City Name, ST 12345</p>
// //                 <p className="text-white">Country</p>
// //               </div>
              
// //               {/* Phone Number */}
// //               <div className="mb-6 w-full md:w-1/3 text-center">
// //                 <h3 className="text-xl font-semibold text-white mb-4">
// //                   <FaPhoneAlt className="inline-block mr-2" /> Call Us
// //                 </h3>
// //                 <p className="text-white">+1 (555) 123-4567</p>
// //                 <p className="text-white">Mon - Fri: 9:00 AM - 5:00 PM</p>
// //               </div>

// //               {/* Email Address */}
// //               <div className="mb-6 w-full md:w-1/3 text-center">
// //                 <h3 className="text-xl font-semibold text-white mb-4">
// //                   <FaEnvelope className="inline-block mr-2" /> Email Us
// //                 </h3>
// //                 <p className="text-white">info@yourdomain.com</p>
// //                 <p className="text-white">support@yourdomain.com</p>
// //               </div>
// //             </div>

// //             {/* Social Media */}
// //             <div className="text-center mt-8">
// //               <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
// //               <div className="flex justify-center space-x-6">
// //                 <a href="#facebook" className="text-white hover:underline">
// //                   <FaFacebook className="inline-block mr-2" /> Facebook
// //                 </a>
// //                 <a href="#twitter" className="text-white hover:underline">
// //                   <FaTwitter className="inline-block mr-2" /> Twitter
// //                 </a>
// //                 <a href="#instagram" className="text-white hover:underline">
// //                   <FaInstagram className="inline-block mr-2" /> Instagram
// //                 </a>
// //                 <a href="#linkedin" className="text-white hover:underline">
// //                   <FaLinkedin className="inline-block mr-2" /> LinkedIn
// //                 </a>
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Footer Section */}
// //         <footer className="bg-gradient-to-br from-[#01352C] to-[#000000] text-white py-10">
// //           <div className="flex justify-center space-x-10 mb-5">
// //             <a href="#link1" className="relative font-normal text-white transition duration-300 ease-in-out active:animate-bulb">Home</a>
// //             <a href="#link2" className="relative font-normal text-white transition duration-300 ease-in-out active:animate-bulb">About</a>
// //             <a href="#link3" className="relative font-normal text-white transition duration-300 ease-in-out active:animate-bulb">Services</a>
// //             <a href="#link4" className="relative font-normal text-white transition duration-300 ease-in-out active:animate-bulb">Contact</a>
// //             <a href="#link5" className="relative font-normal text-white transition duration-300 ease-in-out active:animate-bulb">FAQ</a>
// //           </div>
// //           <div className="text-center">
// //             <p className="text-sm text-[#BAD8B6]">© 2024 Swap Smart. All rights reserved.</p>
// //           </div>
// //         </footer>
// //       </div>
// //  </div>
// //       {/* Popup Section */}
// //       {showPopup && <Popup onClose={togglePopup} />}
// //     </div>
// //   );
// // };

// // export default Hero;
// import { useRef } from 'react';
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import Hero from "@/components/Hero"; // Importing the Hero component

// // Importing Images
// import heroImage from '/public/hero-image.svg'; 
// import courseImage from '/public/course-image.svg'; 
// import marketingImage from '/public/marketing-image.svg'; 
// import teacherImage1 from '/public/teacher-image1.svg';
// import teacherImage2 from '/public/teacher-image2.svg';

// export default function LandingPage() {
//   // Using useRef for dynamic interactions if needed
//   const heroRef = useRef(null);

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Hero Section */}
//       <Hero ref={heroRef} image={heroImage} /> {/* Passing image as prop and using ref */}

//       {/* Trusted Companies Section */}
//       <section className="bg-purple-600 py-8">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-center items-center space-x-8">
//             {['KPMG', 'Airbnb', 'Google'].map((company) => (
//               <div key={company} className="text-white font-bold text-xl">{company}</div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Bootcamp Section */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-4">Join a career-changing bootcamp</h2>
//           <p className="text-center text-gray-600 mb-12">20,000+ alumni. Full-time programs.</p>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {['Web Development', 'Data Science & AI', 'Data Engineering', 'Data Analytics'].map((course) => (
//               <Card key={course}>
//                 <CardHeader>
//                   <img src={courseImage} alt={course} className="w-full h-40 object-cover" />
//                 </CardHeader>
//                 <CardContent>
//                   <CardTitle>{course}</CardTitle>
//                 </CardContent>
//                 <CardFooter>
//                   <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">Learn More</Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Growth Marketing Promo */}
//       <section className="py-16 bg-gray-100">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden">
//             <div className="md:w-1/2 p-8">
//               <h2 className="text-3xl font-bold text-purple-600 mb-4">Introducing our Growth Marketing bootcamp!</h2>
//               <p className="text-gray-600 mb-6">Learn the latest strategies and tools to drive business growth in the digital age.</p>
//               <Button className="bg-purple-600 hover:bg-purple-700 text-white">Learn more</Button>
//             </div>
//             <div className="md:w-1/2">
//               <img src={marketingImage} alt="Growth Marketing" className="w-full h-full object-cover" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Ranked Tech Bootcamp */}
//       <section className="py-16">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-4">Join the 1st ranked tech bootcamp</h2>
//           <p className="text-gray-600 mb-8">Recognized for excellence in tech education</p>
//           <div className="flex justify-center space-x-4">
//             {['Badge 1', 'Badge 2', 'Badge 3'].map((badge) => (
//               <Badge key={badge} variant="secondary" className="text-purple-600 bg-purple-100 px-4 py-2">{badge}</Badge>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Supportive Teachers Section */}
//       <section className="py-16 bg-gray-100">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-4">Learn with supportive teachers and change your career in a few months</h2>
//           <p className="text-center text-gray-600 mb-12">Our experienced instructors are dedicated to your success</p>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {[1, 2].map((card, index) => (
//               <Card key={card}>
//                 <CardHeader>
//                   <img src={index === 0 ? teacherImage1 : teacherImage2} alt={`Teacher ${card}`} className="w-full h-40 object-cover" />
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-gray-600">Learn from industry experts who are passionate about teaching and mentoring.</p>
//                 </CardContent>
//                 <CardFooter>
//                   <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Learn More</Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
// import { useRef } from 'react';
// import { Link } from "react-router-dom";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import Hero from "@/components/Hero"; // Importing the Hero component

// // Importing Images
// import heroImage from '/public/hero-image.svg'; 
// import courseImage from '/public/course-image.svg'; 
// import marketingImage from '/public/marketing-image.svg'; 
// import teacherImage1 from '/public/teacher-image1.svg';
// import teacherImage2 from '/public/teacher-image2.svg';

// export default function LandingPage() {
//   // Using useRef for dynamic interactions if needed
//   const heroRef = useRef(null);

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Hero Section */}
//       <Hero ref={heroRef} image={heroImage} /> {/* Passing image as prop and using ref */}

//       {/* Trusted Companies Section */}
//       <section className="bg-purple-600 py-8">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-center items-center space-x-8">
//             {['KPMG', 'Airbnb', 'Google'].map((company) => (
//               <div key={company} className="text-white font-bold text-xl">{company}</div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Bootcamp Section */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-4">Join a career-changing bootcamp</h2>
//           <p className="text-center text-gray-600 mb-12">20,000+ alumni. Full-time programs.</p>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {['Web Development', 'Data Science & AI', 'Data Engineering', 'Data Analytics'].map((course) => (
//               <Card key={course}>
//                 <CardHeader>
//                   <img src={courseImage.src} alt={course} className="w-full h-40 object-cover" />
//                 </CardHeader>
//                 <CardContent>
//                   <CardTitle>{course}</CardTitle>
//                 </CardContent>
//                 <CardFooter>
//                   <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">Learn More</Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Growth Marketing Promo */}
//       <section className="py-16 bg-gray-100">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden">
//             <div className="md:w-1/2 p-8">
//               <h2 className="text-3xl font-bold text-purple-600 mb-4">Introducing our Growth Marketing bootcamp!</h2>
//               <p className="text-gray-600 mb-6">Learn the latest strategies and tools to drive business growth in the digital age.</p>
//               <Button className="bg-purple-600 hover:bg-purple-700 text-white">Learn more</Button>
//             </div>
//             <div className="md:w-1/2">
//               <img src={marketingImage.src} alt="Growth Marketing" className="w-full h-full object-cover" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Ranked Tech Bootcamp */}
//       <section className="py-16">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-4">Join the 1st ranked tech bootcamp</h2>
//           <p className="text-gray-600 mb-8">Recognized for excellence in tech education</p>
//           <div className="flex justify-center space-x-4">
//             {['Badge 1', 'Badge 2', 'Badge 3'].map((badge) => (
//               <Badge key={badge} variant="secondary" className="text-purple-600 bg-purple-100 px-4 py-2">{badge}</Badge>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Supportive Teachers Section */}
//       <section className="py-16 bg-gray-100">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-4">Learn with supportive teachers and change your career in a few months</h2>
//           <p className="text-center text-gray-600 mb-12">Our experienced instructors are dedicated to your success</p>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {[1, 2].map((card, index) => (
//               <Card key={card}>
//                 <CardHeader>
//                   <img src={index === 0 ? teacherImage1.src : teacherImage2.src} alt={`Teacher ${card}`} className="w-full h-40 object-cover" />
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-gray-600">Learn from industry experts who are passionate about teaching and mentoring.</p>
//                 </CardContent>
//                 <CardFooter>
//                   <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Learn More</Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import React from "react";

// Placeholder Button component using Tailwind classes
const Button = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`py-2 px-6 rounded-full ${className}`}
    >
      {children}
    </button>
  );
};

// Placeholder Card component structure
const Card = ({ children }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {children}
    </div>
  );
};

const CardHeader = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

const CardContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

const CardFooter = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

const CardTitle = ({ children }) => {
  return <h3 className="text-xl font-bold mb-2">{children}</h3>;
};

const Badge = ({ children, className }) => {
  return (
    <div className={`inline-block py-1 px-4 rounded-full ${className}`}>
      {children}
    </div>
  );
};

const Hero = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[600px] bg-cover bg-center mt-[4rem]"
        style={{ backgroundImage: "url('/placeholder.svg?height=600&width=1200')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-start">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Build your future.<br />Learn Tech & AI.
          </h1>
          <p className="text-xl text-white mb-8">Top tech companies hire our graduates.</p>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            Discover More
          </Button>
        </div>
      </section>

      {/* Trusted Companies Section */}
      <section className="bg-purple-600 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center space-x-8">
            {['KPMG', 'Airbnb', 'Google'].map((company) => (
              <div key={company} className="text-white font-bold text-xl">{company}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Bootcamp Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Join a career-changing bootcamp</h2>
          <p className="text-center text-gray-600 mb-12">20,000+ alumni. Full-time programs.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Web Development', 'Data Science & AI', 'Data Engineering', 'Data Analytics'].map((course) => (
              <Card key={course}>
                <CardHeader>
                  <img src="/placeholder.svg?height=200&width=300" alt={course} className="w-full h-40 object-cover" />
                </CardHeader>
                <CardContent>
                  <CardTitle>{course}</CardTitle>
                </CardContent>
                <CardFooter>
                  <Button className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Marketing Promo */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:w-1/2 p-8">
              <h2 className="text-3xl font-bold text-purple-600 mb-4">Introducing our Growth Marketing bootcamp!</h2>
              <p className="text-gray-600 mb-6">Learn the latest strategies and tools to drive business growth in the digital age.</p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Learn more</Button>
            </div>
            <div className="md:w-1/2">
              <img src="/placeholder.svg?height=400&width=600" alt="Growth Marketing" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Ranked Tech Bootcamp */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the 1st ranked tech bootcamp</h2>
          <p className="text-gray-600 mb-8">Recognized for excellence in tech education</p>
          <div className="flex justify-center space-x-4">
            {['Badge 1', 'Badge 2', 'Badge 3'].map((badge) => (
              <Badge key={badge} className="text-purple-600 bg-purple-100">
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100 lg:wr-[120%]">
  <div className="w-[90%] lg:w-[50%] mx-auto px-4"> {/* அகலம் 90% அல்லது 80% ஆக மாற்றப்பட்டுள்ளது */}
    <h2 className="text-3xl font-bold text-center mb-4">
      Learn with supportive teachers and change your career in a few months
    </h2>
    <p className="text-center text-gray-600 mb-12">
      Our experienced instructors are dedicated to your success
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[1, 2].map((card) => (
        <Card key={card}>
          <CardHeader>
            <img
              src="/placeholder.svg?height=200&width=300"
              alt={`Teacher ${card}`}
              className="w-full h-40 object-cover"
            />
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Learn from industry experts who are passionate about teaching and mentoring.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Learn More
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  </div>
</section>

      {/* Additional Sections */}
      {/* Top Section: Find the Right Financing Options */}
      <section className="py-16 px-4">
        <div className="container mx-auto md:flex items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Find the Right Financing Options for You</h2>
            <p className="text-gray-600 mb-6">
              Discover flexible payment plans and financing options tailored to your needs. Our goal is to make quality tech education accessible to everyone.
            </p>
            <Button className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white border">
              Explore Financing
            </Button>
          </div>
          <div className="md:w-1/2">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Financing Options"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Middle Section: Enterprise Looking for Tech Skills */}
      <section className="bg-purple-600 py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Enterprise Looking for Tech Skills?</h2>
          <Button className="border-white text-white hover:bg-white hover:text-purple-600 border">
            Learn More
          </Button>
        </div>
      </section>

      {/* Bottom Section: More Than a Bootcamp */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">More Than a Bootcamp</h2>
          <p className="text-gray-600 mb-12">We're committed to your success in the tech industry</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-4xl font-bold text-purple-600 mb-2">95%</p>
              <p className="text-gray-600">Employment rate</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-600 mb-2">1,500+</p>
              <p className="text-gray-600">Partner companies</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-600 mb-2">100k+</p>
              <p className="text-gray-600">Alumni worldwide</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Hero;
