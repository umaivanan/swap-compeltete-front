import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';  // Ensure that your CSS file is styled properly
import BackgroundImage from  '/home/ukijaffna/Documents/october 1/swapSmartFrontend/src/assets/our-first-word-puzzle-game-on-ios-v0-zCOlv9_kElzL6cCchIIj0uZhloFvsvSr3IiMaf7RqaY.webp';  // Import the image

const RegisterPage = ({ setIsLoggedIn }) => {
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

    const handleInput = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let errors = { ...initialStateErrors };
        let hasError = false;

        if (inputs.name === "") {
            errors.name.required = true;
            hasError = true;
        }
        if (inputs.email === "") {
            errors.email.required = true;
            hasError = true;
        }
        if (inputs.password === "") {
            errors.password.required = true;
            hasError = true;
        }

        if (hasError) {
            setErrors(errors);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:8703/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setIsLoggedIn(true);
                sessionStorage.setItem('userEmail', inputs.email);
                navigate('/list');
            } else {
                setErrors({ ...errors, custom_error: data.error || 'Something went wrong' });
            }
        } catch (error) {
            setErrors({ ...errors, custom_error: 'An unexpected error occurred' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="register-section">
            {/* Left half for the image */}
            <div className="left-half">
                <img src={BackgroundImage} alt="Background" className="bg-image" />
            </div>

            {/* Right half for the form */}
            <div className="right-half">
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
                            value={inputs.name}
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
                            value={inputs.email}
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
                            value={inputs.password}
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
                            disabled={loading}
                            value="Register"
                        />
                    </div>
                    <div className="clearfix"></div>
                    <div className="form-group">
                        Already have an account? Please <a href="/login">Login</a>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default RegisterPage;
