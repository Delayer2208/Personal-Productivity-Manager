import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the registration URL to match the backend
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
      });
      console.log(response.data);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error(error); // Log the full error for debugging
      setErrorMessage(error.response?.data?.message || 'Failed to register. Please try again.');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Register</h2>
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
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
