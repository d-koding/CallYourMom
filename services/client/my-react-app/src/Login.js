
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './App.css'; // Import the app.css file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Initialize useNavigate hook
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'example@example.com' && password === 'password') {
      setIsLoggedIn(true);
      alert('Login successful!');
      navigate('/tolerance');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="login-container"> {/* Add the login-container class here */}
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Name:
          <input type="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
