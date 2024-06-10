import React, { useState } from 'react';
import './login.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import { login } from './api/auth/authAPI'
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to handle errors
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { token, userRole } = await login(username, password);
            console.log('Login successful, JWT Token:', token);
            setError('');

            // Navigate based on user role
            if (userRole === 'Admin' || userRole === 'SuperAdmin') {
                navigate('/home');
            } else if (userRole === 'User') {
                navigate('/homeUser');
            } else {
                setError('Unrecognized user role');
            }
        } catch (error) {
            setError('Invalid username or password');
        }
    };


    return (
        <div className="login-page">
            <div className="login-container">
                <img src="/keycard.png" alt="Logo" className="logo" />
                <form onSubmit={ handleSubmit }>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={ username }
                            onChange={ handleUsernameChange }
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={ password }
                            onChange={ handlePasswordChange }
                            required
                        />
                    </div>
                    { error && <div className="error-message">{ error }</div> } {/* Display error message */ }
                    <button type="submit" className='LoginButton'>Login</button>
                </form>
            </div>
            <img src="/etf_logo.png" alt="Logo" className="logo2" />
        </div>
    );
};

export default LoginPage;
