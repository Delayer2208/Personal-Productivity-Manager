// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, token }) => {
  // If there's a token, render the children; otherwise, redirect to login
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
