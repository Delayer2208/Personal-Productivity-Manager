// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Login component handles user authentication
const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

   // Handles form submission and user login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      // Send login request to the server
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      setToken(response.data.token); // Store the token in the parent component
      navigate('/tasks'); // Redirect to tasks after successful login
    } catch (error) {
      console.error(error);
      // Error message if login fails
      setErrorMessage(error.response?.data?.message || 'Failed to login. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
