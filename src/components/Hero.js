import React from 'react';
import './Hero.css'; // Ensure the custom styles are loaded correctly
import mainPerson from '/home/ukijaffna/Documents/october5/swapSmartFrontend/src/assets/pexels-photo-3183197 (1).jpeg'
import googleAdsIcon from '/home/ukijaffna/Documents/october5/swapSmartFrontend/src/assets/maxresdefault.jpg';
import twoPlusUsers from '/home/ukijaffna/Documents/october5/swapSmartFrontend/src/assets/PDF Summarizer (3).png';
import returnCustomers from '/home/ukijaffna/Documents/october5/swapSmartFrontend/src/assets/0-roadmap-infographics___media_library_original_655_368.webp';
import second from "/home/ukijaffna/Documents/october5/swapSmartFrontend/src/assets/pexels-photo-814544.webp";
import third from "/home/ukijaffna/Documents/october5/swapSmartFrontend/src/assets/pexels-photo-814544.webp";
import fourth from '/home/ukijaffna/Documents/october5/swapSmartFrontend/src/assets/pexels-photo-3183197 (1).jpeg';

const Hero = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            SMART   <span className="highlight">Swap</span> 
          </h1>
          <p>
            We blend insights and strategy to create digital products for forward-thinking organisations.
          </p>
          <button className="cta-button">GET STARTED NOW</button>
          <p className="swap-smart-caption">
            Explore the future of business with Swap Smart – an innovative solution designed for managing your digital world efficiently.
          </p>
        </div>
        <div className="hero-images">
          <div className="main-image animated-image">
            <img src={mainPerson} alt="Main person" />
            <p className="main-caption">
              Empowering Businesses Through Strategic Social Media Management
            </p>
          </div>
          <div className="secondary-images">
            <div className="card skills-card">
              <img src={googleAdsIcon} alt="Google Ads Skill" />
              <p>Expert in Social Media Strategy</p>
              <p className="card-caption">
                Maximize your social presence with effective Google Ads management.
              </p>
            </div>
            <div className="card skills-card">
              <img src={twoPlusUsers} alt="Data-Driven Marketing Skill" />
              <p>Data-Driven Marketing</p>
              <p className="card-caption">
                Leverage insights to drive impactful and measurable marketing strategies.
              </p>
            </div>
            <div className="card skills-card">
              <img src={returnCustomers} alt="Creative Campaign Design Skill" />
              <p>Creative Campaign Design</p>
              <p className="card-caption">
                Crafting engaging and innovative campaigns to attract and retain customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About Us</h2>
        <div className="qa-container">
          <div className="qa-item">
            <h3>What is Skill Share?</h3>
            <p>
              Skill Share is a platform where you can learn and share skills with others.
              <img src={second} alt="Skill 1" className="skill-image" />
            </p>
          </div>
          <div className="qa-item">
            <h3>How does it work?</h3>
            <p>
              We connect learners with instructors and provide resources for skill development.
              <img src={third} alt="Skill 2" className="skill-image" />
            </p>
          </div>
          <div className="qa-item">
            <h3>Who can join?</h3>
            <p>
              Anyone with a passion for learning and teaching can join and benefit from Skill Share.
              <img src={fourth} alt="Skill 3" className="skill-image" />
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer>
        <div className="footer-links">
          <div className="links-column">
            <a href="#link1">Home</a>
            <a href="#link2">About</a>
            <a href="#link3">Services</a>
            <a href="#link4">Contact</a>
            <a href="#link5">FAQ</a>
          </div>
          <div className="links-column">
            <a href="#link6">Blog</a>
            <a href="#link7">Careers</a>
            <a href="#link8">Privacy Policy</a>
            <a href="#link9">Terms of Service</a>
            <a href="#link10">Support</a>
          </div>
          <div className="links-column">
            <a href="#link11">Community</a>
            <a href="#link12">Events</a>
            <a href="#link13">Resources</a>
            <a href="#link14">Partners</a>
            <a href="#link15">News</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Swap Smart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Hero;