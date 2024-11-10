// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import Expenses from './pages/Expenses';
import Welcome from './pages/Welcome';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute for protected routes

const App = () => {
  // State to manage authentication token, initially set from local storage
  const [token, setToken] = useState(localStorage.getItem('token')); // Get token from local storage

  // Update token in local storage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);  // Handle user logout by clearing the token
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />

        {/* Wrap the protected routes with PrivateRoute */}
        <Route
          path="/tasks"
          element={
            <PrivateRoute token={token}>
              <Tasks token={token} handleLogout={handleLogout} /> {/* Pass handleLogout */}
            </PrivateRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <PrivateRoute token={token}>
              <Expenses token={token} handleLogout={handleLogout} /> {/* Pass handleLogout */}
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
