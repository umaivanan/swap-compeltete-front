import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const orderID = searchParams.get('orderID');  // URL இல் இருந்து orderID ஐ பெறுகிறோம்
    const [loading, setLoading] = useState(true);  // UI யில் loading message காட்ட
    const [status, setStatus] = useState('Processing your payment...');  // நிலையை கையாள
    const [paymentDetails, setPaymentDetails] = useState(null);  // payment பற்றிய தகவல்கள்
    const [errorMessage, setErrorMessage] = useState('');  // பிழைகளை கையாள

    const navigate = useNavigate();  // React Router மூலம் வழிமுறை

    useEffect(() => {
        if (orderID) {
            // Backend க்கு orderID ஐ அனுப்பி payment capture செய்கிறோம்
            axios.get(`http://localhost:8702/api/paypal/capture/${orderID}`)  // backend API க்கு orderID அனுப்புகிறோம்
                .then(response => {
                    console.log('Payment successful:', response.data);
                    setStatus('Payment successful!');  // நிலையை 'Payment successful!' என்று மாற்றுகிறோம்
                    setPaymentDetails(response.data);  // payment தகவல்களை state இல் சேமிக்கிறோம்
                    setErrorMessage('');  // பிழை இல்லை என்பதால் இப்போது empty message
                    setLoading(false);  // loading முடிந்தது
                })
                .catch(error => {
                    console.error('Error capturing payment:', error);
                    setStatus('Payment capture failed. Please contact support.');  // பிழை இருந்தால்
                    setErrorMessage('There was an issue capturing your payment. Please try again.');  // பிழை தகவலைக் காட்டுங்கள்
                    setLoading(false);  // loading முடிந்தது
                });
        } else {
            setStatus('No orderID found.');
            setLoading(false);
        }
    }, [orderID]);

    // SkillForm பக்கம் செல்ல handleSkip method
    const handleSkip = () => {
        navigate('/skill-form');  // SkillForm பக்கத்திற்கு வழிமாற்றம் செய்க
    };

    if (loading) {
        return <p>Processing your payment... Please wait.</p>;  // loading சமயத்தில் message
    }

    return (
        <div>
            <h2>{status}</h2>  {/* Payment status */}
            {errorMessage && <h2>{errorMessage}</h2>}  {/* Error message */}
            {paymentDetails && (  // Payment details
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
