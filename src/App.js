import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { SkillProvider } from './context/SkillContext'; // Import SkillProvider
import UpdateInfo from './components/UpdateInfo'; 
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';
import Blank from './components/Blank';
import SkillForm from './components/SkillForm';
import SkillList from './components/SkillList';
import AdditionalInformation from './components/AdditionalInformation';
import DisplayData from './components/DisplayData';
// import PayPalButton from './components/PayPalButton';
// import PaymentSuccess from './components/PaymentSuccess'; 
import FormDataDetails from './components/FormDataDetails'; 
import FileDisplay from './components/FileDisplay';  // Import FileDisplay from components folder
import UserDashboard from './components/UserDashboard';




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for handling login status

  return (
    <SkillProvider>
      {/* <PayPalScriptProvider options={{ "client-id": "YOUR_CLIENT_ID", currency: "USD" }}> */}
        <Router>
          {/* Pass isLoggedIn and setIsLoggedIn to Navbar */}
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/update-info/:id" element={<UpdateInfo />} />
            <Route path="/register" element={<RegisterPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/skill-form" element={<SkillForm />} />
            <Route path="/additionalInformation" element={<AdditionalInformation />} />
            <Route path="/list" element={<SkillList />} />
            <Route path="/display-data/:id" element={<DisplayData />} />
            <Route path="/file-display" element={<FileDisplay />} />
            
            {/* <Route path="/paypal-button" element={<PayPalButton />} /> */}
            {/* <Route path="/payment-success" element={<PaymentSuccess />} /> */}
            <Route path="/formdata/:id" component={<FormDataDetails/>} />

            <Route path="/user-dashboard" element={<UserDashboard />} />

          </Routes>
        </Router>
      {/* </PayPalScriptProvider> */}
    </SkillProvider>
  );
}

export default App;
