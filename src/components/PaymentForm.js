// import React, { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import './PaymentForm.css';

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [errorMessage, setErrorMessage] = useState('');
//   const [paymentSuccessful, setPaymentSuccessful] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     // Example for creating a payment intent on the backend
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     });

//     if (error) {
//       setErrorMessage(error.message);
//     } else {
//       // Send paymentMethod.id to your backend for payment processing
//       console.log('PaymentMethod:', paymentMethod);
//       setPaymentSuccessful(true);
//     }
//   };

//   return (
//     <div className="payment-form-container">
//       <h1>Payment</h1>
//       {!paymentSuccessful ? (
//         <form onSubmit={handleSubmit}>
//           <CardElement />
//           <button className="btn" type="submit" disabled={!stripe}>
//             Pay Now
//           </button>
//           {errorMessage && <p className="error">{errorMessage}</p>}
//         </form>
//       ) : (
//         <p>Payment successful! You can now create your profile.</p>
//       )}
//     </div>
//   );
// };

// export default PaymentForm;
