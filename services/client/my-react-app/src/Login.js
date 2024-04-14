import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.css";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Send POST request to Flask backend
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                alert('Login successful!');
                // Optionally fetch more user data here if needed
                navigate('/tolerance'); // Navigate to a profile or dashboard page
            } else {
                alert('Invalid email or password');
            }
        } catch (error) {
            alert('Login failed. Please try again later.');
            console.error('There was an error!', error);
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="form-input" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="form-input" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
                <button type="button" className="register-button" onClick={() => navigate('/register')}>Register</button>
            </form>
        </div>
    );
}

export default Login;
