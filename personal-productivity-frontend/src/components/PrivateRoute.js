// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute component to restrict access to certain routes
// Only allows access to the component's children if the user is authenticated
const PrivateRoute = ({ children, token }) => {
  // If there's a token, render the children; otherwise, redirect to login
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
