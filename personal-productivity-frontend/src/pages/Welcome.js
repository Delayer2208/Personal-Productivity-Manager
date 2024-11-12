import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', backgroundColor: '#f0f0f0', padding: '50px' }}>
      <h1 style={{ color: '#333', fontSize: '2.5rem', marginBottom: '20px' }}>
        Welcome to Personal Productivity App
      </h1>
      <div>
        <Link to="/login">
          <button
            style={{
              margin: '10px',
              padding: '12px 25px',
              fontSize: '18px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
          >
            Login
          </button>
        </Link>
        <Link to="/register">
          <button
            style={{
              margin: '10px',
              padding: '12px 25px',
              fontSize: '18px',
              backgroundColor: '#008CBA',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#007bb5')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#008CBA')}
          >
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
