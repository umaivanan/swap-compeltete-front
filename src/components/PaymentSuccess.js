import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const orderID = searchParams.get('orderID');  // Get orderID from the URL query params
    const [loading, setLoading] = useState(true);  // Loading state for UI feedback
    const [status, setStatus] = useState('Processing your payment...');
    const [paymentDetails, setPaymentDetails] = useState(null);  // For detailed payment information
    const [errorMessage, setErrorMessage] = useState('');  // For error handling
    

    const navigate = useNavigate();  // Hook for navigation

    useEffect(() => {
        if (orderID) {
            // Capture the payment by sending the orderID to the backend
            axios.get(`http://localhost:8702/api/paypal/capture/${orderID}`)  // Pass orderID as a URL parameter
                .then(response => {
                    console.log('Payment successful:', response.data);
                    setStatus('Payment successful!');
                    setPaymentDetails(response.data);  // Set payment details for display
                    setErrorMessage('');  // Clear error message
                    setLoading(false);  // Stop loading after successful capture
                })
                .catch(error => {
                    console.error('Error capturing payment:', error);
                    setStatus('Payment capture failed. Please contact support.');
                    setErrorMessage('There was an issue capturing your payment. Please try again.');
                    setLoading(false);  // Stop loading if there's an error
                });
        } else {
            setStatus('No orderID found.');
            setLoading(false);
        }
    }, [orderID]);

    // Handle navigation to SkillForm
    const handleSkip = () => {
        navigate('/skill-form');  // Navigate to the SkillForm page
    };

    if (loading) {
        return <p>Processing your payment... Please wait.</p>;
    }

    return (
        <div>
            <h2>{status}</h2>
            {errorMessage && <h2>{errorMessage}</h2>}
            {paymentDetails && (
                <div>
                    <h3>Transaction Details</h3>
                    <p>Order ID: {paymentDetails.id}</p>
                    <p>Status: {paymentDetails.status}</p>
                    <p>Amount: {paymentDetails.purchase_units[0].amount.value} {paymentDetails.purchase_units[0].amount.currency_code}</p>
                    <p>Payer Name: {paymentDetails.payer.name.given_name} {paymentDetails.payer.name.surname}</p>
                    <p>Payer Email: {paymentDetails.payer.email_address}</p>
                </div>
            )}
            <button onClick={handleSkip} style={{ marginTop: '20px', padding: '10px', fontSize: '16px' }}>
                Skip and Go to Skill Form
            </button>
        </div>
    );
};

export default PaymentSuccess;
