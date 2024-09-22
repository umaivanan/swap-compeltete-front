import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook for navigation
import './PaypalButton.css';  // Assuming you have a CSS file for styling

const PayPalButton = () => {
    const [loading, setLoading] = useState(false);  // Loading state to manage order creation
    const navigate = useNavigate();  // React Router's useNavigate hook

    const createOrder = (data, actions) => {
        setLoading(true);  // Set loading state when creating the order
        // Make a request to your backend PayPal API endpoint
        return axios.post('http://localhost:8700/api/paypal/pay')  // Replace with your backend URL
            .then(response => {
                setLoading(false);  // Reset loading state after order creation
                return response.data.orderID;  // Return order ID from backend
            })
            .catch(error => {
                setLoading(false);  // Reset loading state on error
                console.error('Error creating PayPal order:', error);
                alert('There was an issue creating the order. Please try again.');
                return null;
            });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            alert("Transaction completed by " + details.payer.name.given_name);
            // After successful payment, navigate to PaymentSuccess page
            navigate('/payment-success');  // Redirect to the payment success page
        }).catch(error => {
            console.error('Error capturing the order:', error);
            alert('There was an issue completing the transaction.');
        });
    };

    return (
        <PayPalScriptProvider options={{ "client-id": "AdlRdq2-MwJR3ReJYwBHkEZAUqS1yiEEpU3nzmn1jO9-C9JK_t810a2QAp6vCK8Kkt06Zbpzdjhp1XxS" }}>
            <div className="paypal-container">
                {loading && <div className="loading-message">Processing... Please wait.</div>}  {/* Show loading message if loading */}
                <PayPalButtons
                    disabled={loading}  // Disable the button while loading
                    style={{ layout: 'vertical' }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                />
            </div>
        </PayPalScriptProvider>
    );
};

export default PayPalButton;
