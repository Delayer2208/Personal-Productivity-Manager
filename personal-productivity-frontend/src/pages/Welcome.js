import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', backgroundColor: 'lightgrey' }}>
      <h1 style={{ color: 'black' }}>Welcome to Personal Productivity App</h1>
      <Link to="/login">
        <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Login</button>
      </Link>
      <Link to="/register">
        <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Register</button>
      </Link>
    </div>
  );
};

export default Welcome;
