import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'; // PayPalScriptProvider for PayPal integration
import { SkillProvider } from './context/SkillContext'; // Import SkillProvider

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
import PayPalButton from './components/PayPalButton';
import PaymentSuccess from './components/PaymentSuccess'; // Import the success component

function App() {
  // State for handling login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SkillProvider>
      {/* Wrap your app with PayPalScriptProvider */}
      <PayPalScriptProvider options={{ "client-id": "AdlRdq2-MwJR3ReJYwBHkEZAUqS1yiEEpU3nzmn1jO9-C9JK_t810a2QAp6vCK8Kkt06Zbpzdjhp1XxS", currency: "USD" }}>
        <Router>
          {/* Pass isLoggedIn and setIsLoggedIn to Navbar */}
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          
          <Routes>
            {/* Main route to Hero page */}
            <Route path="/" element={<Hero />} />
            
            {/* Register and Login pages - passing setIsLoggedIn */}
            <Route path="/register" element={<RegisterPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />

            {/* Admin dashboard and other pages */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/skill-form" element={<SkillForm />} />
            <Route path="/additionalInformation" element={<AdditionalInformation />} />

            {/* Routes for SkillList and DisplayData wrapped with SkillProvider */}
            <Route path="/list" element={<SkillList />} />
            <Route path="/display-data/:id" element={<DisplayData />} />
            
            {/* PayPal routes */}
            <Route path="/paypal-button" element={<PayPalButton />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />  {/* PaymentSuccess route */}
          </Routes>
        </Router>
      </PayPalScriptProvider>
    </SkillProvider>
  );
}

export default App;
