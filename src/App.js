import './App.css';
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
import PaymentSuccess from './components/PaymentSuccess';  // Import the success component

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'; // Import PayPalScriptProvider globally

function App() {
  // State for handling login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <PayPalScriptProvider options={{ "client-id": "AdlRdq2-MwJR3ReJYwBHkEZAUqS1yiEEpU3nzmn1jO9-C9JK_t810a2QAp6vCK8Kkt06Zbpzdjhp1XxS", currency: "USD" }}>
      {/* Wrap your app with PayPalScriptProvider */}
      <Router>
        {/* Pass isLoggedIn and setIsLoggedIn to Navbar */}
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Hero />} />
          
          {/* Pass setIsLoggedIn to RegisterPage and LoginPage */}
          <Route path="/register" element={<RegisterPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/blank" element={<Blank />} />
          <Route path="/skill-form" element={<SkillForm />} />
          <Route path="/List" element={<SkillList />} />
          <Route path="/additionalInformation" element={<AdditionalInformation />} />
          {/* Route for the PayPal button page */}
          <Route path="/paypal-button" element={<PayPalButton />} />
          {/* Route for displaying data with a dynamic ID */}
          <Route path="/display-data/:id" element={<DisplayData />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />  {/* Route for PaymentSuccess */}
        </Routes>
      </Router>
    </PayPalScriptProvider>
  );
}

export default App;
