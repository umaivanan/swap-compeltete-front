import React, { useState } from 'react';
import googleAdsIcon from '/home/ukijaffna/Documents/october14/swapSmartFrontend/src/assets/maxresdefault.jpg';
import twoPlusUsers from '/home/ukijaffna/Documents/october14/swapSmartFrontend/src/assets/PDF Summarizer (3).png';
import returnCustomers from '/home/ukijaffna/Documents/october14/swapSmartFrontend/src/assets/0-roadmap-infographics___media_library_original_655_368.webp';
import second from '/home/ukijaffna/Documents/october14/swapSmartFrontend/src/assets/pexels-photo-814544.webp';
import third from '/home/ukijaffna/Documents/october14/swapSmartFrontend/src/assets/pexels-photo-814544.webp';
import fifth from '/home/ukijaffna/Documents/october14/swapSmartFrontend/src/assets/pexels-photo-3183197 (1).jpeg';
import video from '/home/ukijaffna/Documents/october14/swapSmartFrontend/src/assets/Untitled (2).mp4';
import Popup from './Popup'; // Assuming you have the Popup component
import { FaRegCircle } from 'react-icons/fa'; // Importing an icon from react-icons
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

import fourth from '/home/ukijaffna/Documents/october14/swapSmartFrontend/src/assets/DALL·E 2024-10-12 08.42.43 - A visually engaging image illustrating the concept of a journey of learning and skill development through structured use of PDFs. The scene features a.webp';

const Hero = () => {
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [activeCard, setActiveCard] = useState(null); // State for controlling card activity

  // Function to toggle the popup
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Function to handle card click in AboutUsSection
  const handleCardClick = (card) => {
    setActiveCard(card === activeCard ? null : card); // Toggle active card
  };

  const isCardActive = (card) => activeCard === card || !activeCard;

  return (
    <div>
      {/* Conditionally apply blur to the background content when popup is active */}
      <div className={showPopup ? "content-blur" : ""}>
        
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center items-center mt-20 px-5 py-10 bg-gradient-to-br from-[#01352C] to-[#000000] text-white">

          <div className="flex flex-col items-center mt-[-50rem]">
            <div className="relative w-screen h-screen mt-[250rem] mb-[5rem] rounded-lg overflow-hidden shadow-lg">
            <video 
  className="absolute top-0 left-0 w-full h-full object-cover" 
  autoPlay 
  loop 
  muted 
  src={video} 
  alt="Main video"
  style={{
    filter: "brightness(0.5) contrast(1.1)", // Darken the video and enhance contrast
  }}
/>
               <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center group">
  <h1
    className="text-[#BAD8B6] text-9xl font-bold opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-in-out"
    style={{
      textShadow: "0 0 10px rgba(255, 255, 0, 0.8), 0 0 20px rgba(0, 255, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.9)",
      filter: "drop-shadow(0 0 5px #000)",
    }}
  >
    SWAP SMART
  </h1>
</div>
              <p className="text-xl mt-2 text-[#E1EACD]">Empowering Businesses Through Strategic Social Media Management</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
  {/* Card 1 */}
  <div className="bg-gradient-to-r from-[#01352C] to-[#61B390] p-10 rounded-xl shadow-2xl text-center transform transition-transform hover:scale-105 hover:shadow-3xl">
    <img src={googleAdsIcon} alt="Google Ads Skill" className="w-32 h-32 mx-auto mb-6 rounded-full shadow-lg" />
    <h3 className="text-3xl font-bold text-[#E1EACD]">Expert in Social Media Strategy</h3>
    <p className="text-lg text-[#BAD8B6] mt-4">
      Maximize your social presence with effective Google Ads management.
    </p>
    <button className="mt-6 px-6 py-2 text-lg font-semibold text-[#01352C] bg-[#E1EACD] rounded-full hover:bg-[#BAD8B6]">
      Learn More
    </button>
  </div>

  {/* Card 2 */}
  <div className="bg-gradient-to-r from-[#01352C] to-[#61B390] p-10 rounded-xl shadow-2xl text-center transform transition-transform hover:scale-105 hover:shadow-3xl">
    <img src={twoPlusUsers} alt="Data-Driven Marketing Skill" className="w-32 h-32 mx-auto mb-6 rounded-full shadow-lg" />
    <h3 className="text-3xl font-bold text-[#E1EACD]">Data-Driven Marketing</h3>
    <p className="text-lg text-[#BAD8B6] mt-4">
      Leverage insights to drive impactful and measurable marketing strategies.
    </p>
    <button className="mt-6 px-6 py-2 text-lg font-semibold text-[#01352C] bg-[#E1EACD] rounded-full hover:bg-[#BAD8B6]">
      Learn More
    </button>
  </div>

  {/* Card 3 */}
  <div className="bg-gradient-to-r from-[#01352C] to-[#61B390] p-10 rounded-xl shadow-2xl text-center transform transition-transform hover:scale-105 hover:shadow-3xl">
    <img src={returnCustomers} alt="Creative Campaign Design Skill" className="w-32 h-32 mx-auto mb-6 rounded-full shadow-lg" />
    <h3 className="text-3xl font-bold text-[#E1EACD]">Creative Campaign Design</h3>
    <p className="text-lg text-[#BAD8B6] mt-4">
      Crafting engaging and innovative campaigns to attract and retain customers.
    </p>
    <button className="mt-6 px-6 py-2 text-lg font-semibold text-[#01352C] bg-[#E1EACD] rounded-full hover:bg-[#BAD8B6]">
      Learn More
    </button>
  </div>

  {/* Card 4 (New Card) */}
  <div className="bg-gradient-to-r from-[#01352C] to-[#61B390] p-10 rounded-xl shadow-2xl text-center transform transition-transform hover:scale-105 hover:shadow-3xl">
    <img src={fifth} alt="Innovative Growth Strategies" className="w-32 h-32 mx-auto mb-6 rounded-full shadow-lg" />
    <h3 className="text-3xl font-bold text-[#E1EACD]">Innovative Growth Strategies</h3>
    <p className="text-lg text-[#BAD8B6] mt-4">
      Develop unique strategies to enhance business growth and customer retention.
    </p>
    <button className="mt-6 px-6 py-2 text-lg font-semibold text-[#01352C] bg-[#E1EACD] rounded-full hover:bg-[#BAD8B6]">
      Learn More
    </button>
  </div>
</div>

          </div>
        </section>

        {/* About Us Section */}
        <section className="relative py-12 px-20 bg-gradient-to-br from-[#01352C] to-[#000000]">
          <h2 className="text-4xl text-[#ff4500] text-center mb-10 relative z-10">About Us</h2>

          {/* Centerline (starts below heading) */}
          <div className="absolute top-1 left-1/2 w-[10px]  h-[100%] bg-gray-300"></div>

          <div className="relative flex flex-wrap gap-8">

            {/* Card 1 (Left side) */}
            <div className="relative flex w-full justify-end pr-[55%]">
              <div className="flex items-center space-x-4">
                <div className="bg-[#01352C] p-10 rounded-lg shadow-lg w-[500px] h-[450px]">
                  <img src={second} alt="Our Story" className="w-full h-40 object-cover mb-4 rounded" />
                  <h3 className="text-2xl text-[#E1EACD] mb-4">Our Story</h3>
                  <p className="text-[#BAD8B6] mb-4">
                    Our journey began with a deep-rooted passion for structured learning and skill development, driven by the belief that education is the foundation for personal and professional growth...
                  </p>
                </div>
              </div>
              <span className="absolute flex items-center text-[#61B390] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <FaRegCircle className="mr-2" /> 1
              </span>
            </div>

            {/* Card 2 (Right side) */}
            <div className="relative flex w-full justify-start pl-[55%]">
              <span className="absolute flex items-center text-[#61B390] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <FaRegCircle className="mr-2" /> 2
              </span>
              <div className="flex items-center space-x-4">
                <div className="bg-[#01352C] p-10 rounded-lg shadow-lg w-[500px] h-[450px]">
                  <img src={third} alt="Key Roadmap PDFs" className="w-full h-40 object-cover mb-4 rounded" />
                  <h3 className="text-2xl text-[#E1EACD] mb-4">Key Roadmap PDFs</h3>
                  <p className="text-[#BAD8B6] mb-4">
                    We provide highly detailed roadmap PDFs for a wide range of skills, including Programming, Data Science, and Digital Marketing...
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 (Left side) */}
            <div className="relative flex w-full justify-end pr-[55%]">
              <div className="flex items-center space-x-4">
                <div className="bg-[#01352C] p-10 rounded-lg shadow-lg w-[500px] h-[450px]">
                  <img src={fourth} alt="What is Skill Share" className="w-full h-40 object-cover mb-4 rounded" />
                  <h3 className="text-2xl text-[#E1EACD] mb-4">What is Skill Share?</h3>
                  <p className="text-[#BAD8B6] mb-4">
                    Skill Share is a platform where you can learn and share skills with others...
                  </p>
                </div>
              </div>
              <span className="absolute flex items-center text-[#61B390] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <FaRegCircle className="mr-2" /> 3
              </span>
            </div>

            {/* Card 4 (Right side) */}
            <div className="relative flex w-full justify-start pl-[55%]">
              <span className="absolute flex items-center text-[#61B390] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <FaRegCircle className="mr-2" /> 4
              </span>
              <div className="flex items-center space-x-4">
                <div className="bg-[#01352C] p-10 rounded-lg shadow-lg w-[500px] h-[450px]">
                  <img src={fifth} alt="How does it work" className="w-full h-40 object-cover mb-4 rounded" />
                  <h3 className="text-2xl text-[#E1EACD] mb-4">How does it work?</h3>
                  <p className="text-[#BAD8B6] mb-4">
                    We connect learners with instructors and provide resources for skill development...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-[#01352C] to-[#000000] py-10">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center text-white mb-8">Contact Us</h2>
    
    <div className="flex justify-around flex-wrap">
      {/* Contact Information */}
      <div className="mb-6 w-full md:w-1/3 text-center">
        <h3 className="text-xl font-semibold text-white mb-4">
          <FaMapMarkerAlt className="inline-block mr-2" /> Our Office
        </h3>
        <p className="text-white">1234 Main Street</p>
        <p className="text-white">City Name, ST 12345</p>
        <p className="text-white">Country</p>
      </div>
      
      {/* Phone Number */}
      <div className="mb-6 w-full md:w-1/3 text-center">
        <h3 className="text-xl font-semibold text-white mb-4">
          <FaPhoneAlt className="inline-block mr-2" /> Call Us
        </h3>
        <p className="text-white">+1 (555) 123-4567</p>
        <p className="text-white">Mon - Fri: 9:00 AM - 5:00 PM</p>
      </div>

      {/* Email Address */}
      <div className="mb-6 w-full md:w-1/3 text-center">
        <h3 className="text-xl font-semibold text-white mb-4">
          <FaEnvelope className="inline-block mr-2" /> Email Us
        </h3>
        <p className="text-white">info@yourdomain.com</p>
        <p className="text-white">support@yourdomain.com</p>
      </div>
    </div>

    {/* Social Media */}
    <div className="text-center mt-8">
      <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
      <div className="flex justify-center space-x-6">
        <a href="#facebook" className="text-white hover:underline">
          <FaFacebook className="inline-block mr-2" /> Facebook
        </a>
        <a href="#twitter" className="text-white hover:underline">
          <FaTwitter className="inline-block mr-2" /> Twitter
        </a>
        <a href="#instagram" className="text-white hover:underline">
          <FaInstagram className="inline-block mr-2" /> Instagram
        </a>
        <a href="#linkedin" className="text-white hover:underline">
          <FaLinkedin className="inline-block mr-2" /> LinkedIn
        </a>
      </div>
    </div>

  </div>
</section>


        {/* Footer Section */}
        <footer className="bg-gradient-to-br from-[#01352C] to-[#000000] text-white py-10">
  <div className="flex justify-center space-x-10 mb-5">
    <a href="#link1" className="relative font-normal text-white transition duration-300 ease-in-out active:animate-bulb">Home</a>
    <a href="#link2" className="relative font-normal text-white transition duration-300 ease-in-out active:animate-bulb">About</a>
    <a href="#link3" className="relative font-normal text-white transition duration-300 ease-in-out active:animate-bulb">Services</a>
    <a href="#link4" className="relative font-normal text-white transition duration-300 ease-in-out active:animate-bulb">Contact</a>
    <a href="#link5" className="relative font-normal text-white transition duration-300 ease-in-out active:animate-bulb">FAQ</a>
  </div>
  <div className="text-center">
    <p className="text-sm text-[#BAD8B6]">© 2024 Swap Smart. All rights reserved.</p>
  </div>
</footer>


      </div>

      {/* Popup Section */}
      {showPopup && <Popup onClose={togglePopup} />}
    </div>
  );
};

export default Hero;