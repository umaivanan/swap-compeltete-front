// import React, { useState } from 'react';
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate hook for navigation
// import './PaypalButton.css';  // Assuming you have a CSS file for styling

// const PayPalButton = () => {
//     const [loading, setLoading] = useState(false);  // Loading state to manage order creation
//     const navigate = useNavigate();  // React Router's useNavigate hook

//     // Function to handle successful payment, navigate to success page with orderID
//     const handlePaymentSuccess = (orderID) => {
//         navigate(`/payment-success?orderID=${orderID}`);
//     };

//     // Function to create the PayPal order
//     const createOrder = async (data, actions) => {
//         setLoading(true);  // Set loading state when creating the order

//         // Retrieve or set the user email into session storage
//         let userEmail = sessionStorage.getItem('userEmail');  
//         if (!userEmail) {
//             userEmail = "testuser@example.com";  // Set a default email or retrieve it from somewhere else
//             sessionStorage.setItem('userEmail', userEmail);  // Store the email in session storage
//         }

//         try {
//             // Make a request to your backend PayPal API endpoint and include the user email
//             const response = await axios.post('http://localhost:8703/api/paypal/pay', { email: userEmail });  // Pass the email along with the request

//             setLoading(false);  // Reset loading state after order creation
//             return response.data.orderID;  // Return order ID from backend
//         } catch (error) {
//             setLoading(false);  // Reset loading state on error
//             console.error('Error creating PayPal order:', error);
//             alert('There was an issue creating the order. Please try again.');
//             return null;
//         }
//     };

//     // Function to handle PayPal approval and capture the order
//     const onApprove = (data, actions) => {
//         return actions.order.capture().then((details) => {
//             alert("Transaction completed by " + details.payer.name.given_name);
    
//             // Retrieve the user email from session storage
//             const userEmail = sessionStorage.getItem('userEmail');  
    
//             // After successful payment, send the details to backend for saving
//             axios.post('http://localhost:8703/api/paypal/success', {
//                 email: userEmail,  // Include the user's email
//                 paymentDetails: details,  // Include payment details from PayPal
//             }).then(() => {
//                 console.log('Payment details saved successfully');
    
//                 // After successful payment, navigate to the PaymentSuccess page with orderID
//                 console.log('Navigating to /payment-success with orderID:', data.orderID);  // Add a log before navigation
//                 handlePaymentSuccess(data.orderID);  // Navigate with the orderID
//             }).catch(error => {
//                 console.error('Error saving payment details:', error);
//             });
//         }).catch(error => {
//             console.error('Error capturing the order:', error);
//             setLoading(false);  // Reset loading state on error
//             alert('There was an issue completing the transaction.');
//         });
//     };

//     return (
//         <PayPalScriptProvider options={{ "client-id": "AdlRdq2-MwJR3ReJYwBHkEZAUqS1yiEEpU3nzmn1jO9-C9JK_t810a2QAp6vCK8Kkt06Zbpzdjhp1XxS" }}>
//             <div className="paypal-container">
//                 {loading && <div className="loading-message">Processing... Please wait.</div>}  {/* Show loading message if loading */}
//                 <PayPalButtons
//                     disabled={loading}  // Disable the button while loading
//                     style={{ layout: 'vertical' }}
//                     createOrder={createOrder}  // Create order with session email
//                     onApprove={onApprove}  // Handle successful payment
//                 />
//             </div>
//         </PayPalScriptProvider>
//     );
// };

// export default PayPalButton;
