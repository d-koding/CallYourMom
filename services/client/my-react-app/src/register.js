import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!name || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }
        if (!email.includes('@')) {
            alert('Please enter a valid email.');
            return;
        }
        if (password.length < 6) {
            alert('Password should be at least 6 characters long.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            if (!response.ok) throw new Error('Failed to register');
            const result = await response.json();
            alert(result.message);
            navigate('/'); // Redirect to login page after registration
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed: ' + error.message);
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Register</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label htmlFor="name" className="form-label">
                        Name:
                    </label>
                    <input 
                        type="text" 
                        id="name" 
                        className="form-input" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input 
                        type="email" 
                        id="email" 
                        className="form-input" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">
                        Password:
                    </label>
                    <input 
                        type="password" 
                        id="password" 
                        className="form-input" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
}

export default Register;
