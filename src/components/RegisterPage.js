import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = ({ setIsLoggedIn }) => {  // Accept setIsLoggedIn as a prop
    const initialStateErrors = {
        email: { required: false },
        name: { required: false },
        password: { required: false },
        custom_error: null,
    };

    const [errors, setErrors] = useState(initialStateErrors);
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    // Handle input changes
    const handleInput = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevent form reload
        let errors = { ...initialStateErrors };  // Reset errors state
        let hasError = false;
    
        // Check for empty fields
        if (inputs.name === "") {
            errors.name.required = true;  // Mark name as required
            hasError = true;
        }
        if (inputs.email === "") {
            errors.email.required = true;  // Mark email as required
            hasError = true;
        }
        if (inputs.password === "") {
            errors.password.required = true;  // Mark password as required
            hasError = true;
        }
    
        if (hasError) {
            setErrors(errors);  // Display errors for required fields
            return;  // Stop form submission if there are errors
        }
    
        setLoading(true);  // Set loading state to true while making API request

        try {
            const response = await fetch('http://localhost:8702/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs),  // Send the input data in JSON format
            });

            const data = await response.json();

            if (response.ok) {
                // Save token to localStorage
                localStorage.setItem('token', data.token);
                
                // Update isLoggedIn state in Navbar
                setIsLoggedIn(true);

                // **New Code**: Store user's email in sessionStorage after registration
                sessionStorage.setItem('userEmail', inputs.email);

                // Redirect to SkillList page after successful registration
                navigate('/list');
            } else {
                setErrors({ ...errors, custom_error: data.error || 'Something went wrong' });
            }
        } catch (error) {
            console.error("Error occurred:", error);
            setErrors({ ...errors, custom_error: 'An unexpected error occurred' });
        } finally {
            setLoading(false);  // Set loading state to false after API response
        }
    };

    return (
        <section className="register-block">
            <div className="container">
                <div className="row">
                    <div className="col register-sec">
                        <h2 className="text-center">Register</h2>
                        <form className="register-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name" className="text-uppercase">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={handleInput}
                                    name="name"
                                    id="name"
                                    value={inputs.name}  // Bind input value to state
                                />
                                {errors.name.required && <span className="text-danger">Name is required.</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="text-uppercase">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    onChange={handleInput}
                                    name="email"
                                    id="email"
                                    value={inputs.email}  // Bind input value to state
                                />
                                {errors.email.required && <span className="text-danger">Email is required.</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="text-uppercase">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    onChange={handleInput}
                                    name="password"
                                    id="password"
                                    value={inputs.password}  // Bind input value to state
                                />
                                {errors.password.required && <span className="text-danger">Password is required.</span>}
                            </div>
                            <div className="form-group">
                                {errors.custom_error && <span className="text-danger"><p>{errors.custom_error}</p></span>}
                                {loading && <div className="text-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>}
                                <input
                                    type="submit"
                                    className="btn btn-login float-right"
                                    disabled={loading}  // Disable button while loading
                                    value="Register"
                                />
                            </div>
                            <div className="clearfix"></div>
                            <div className="form-group">
                                Already have an account? Please <a href="/login">Login</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;
