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
    <div className="container my-4">
      <h2 className="text-center mb-4">Login</h2>
      {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
