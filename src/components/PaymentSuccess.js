import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const orderID = searchParams.get('orderID');  // Extract orderID from the URL
    const [loading, setLoading] = useState(true);  // UI loading state
    const [status, setStatus] = useState('Processing your payment...');  // Payment status
    const [paymentDetails, setPaymentDetails] = useState(null);  // Payment information
    const [errorMessage, setErrorMessage] = useState('');  // Error handling

    const navigate = useNavigate();  // To navigate to other pages

    useEffect(() => {
        console.log("Order ID:", orderID); // Debugging purpose to check the orderID
        if (orderID) {
            axios.get(`http://localhost:8702/api/paypal/capture/${orderID}`)
                .then(response => {
                    console.log('Payment successful:', response.data);
                    setStatus('Payment successful!');
                    setPaymentDetails(response.data);  // Store payment details
                    setErrorMessage('');
                    setLoading(false);  // Stop loading
                })
                .catch(error => {
                    console.error('Error capturing payment:', error);
                    setStatus('Payment capture failed. Please contact support.');  // Update status message
                    setErrorMessage('There was an issue capturing your payment. Please try again.');
                    setLoading(false);  // Stop loading
                });
        } else {
            setStatus('No orderID found.');
            setLoading(false);  // Stop loading
        }
    }, [orderID]);

    // Navigate to SkillForm page
    const handleSkip = () => {
        navigate('/skill-form');
    };

    if (loading) {
        return <p>Processing your payment... Please wait.</p>;  // Loading message
    }

    // Ensure paymentDetails and nested data are available before rendering details
    const purchaseUnit = paymentDetails?.purchase_units?.[0];
    const payer = paymentDetails?.payer;

    return (
        <div>
            <h2>{status}</h2>  {/* Display payment status */}
            {errorMessage && <h2>{errorMessage}</h2>}  {/* Display error message if available */}
            {paymentDetails && purchaseUnit && payer && (  // Conditionally render payment details
                <div>
                    <h3>Transaction Details</h3>
                    <p>Order ID: {paymentDetails.id}</p>
                    <p>Status: {paymentDetails.status}</p>
                    <p>Amount: {purchaseUnit.amount.value} {purchaseUnit.amount.currency_code}</p>
                    <p>Payer Name: {payer.name.given_name} {payer.name.surname}</p>
                    <p>Payer Email: {payer.email_address}</p>
                </div>
            )}
            {!paymentDetails && <p>Unable to fetch payment details.</p>}  {/* Fallback message */}
            <button onClick={handleSkip} style={{ marginTop: '20px', padding: '10px', fontSize: '16px' }}>
                Skip and Go to Skill Form
            </button>
        </div>
    );
};

export default PaymentSuccess;
