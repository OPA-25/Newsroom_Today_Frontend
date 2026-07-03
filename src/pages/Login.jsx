import React, { useState } from 'react';
import './Login.css';

// Login Component: Provides authentication interface for operators, reporters, and administrators.
export default function Login({ onLoginSuccess }) {
  // State elements to capture tracking inputs and form feedback strings
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handles form validation and dispatches credentials securely to the backend authentications cluster
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      // API ROUTING ENDPOINT: Dispatches a authentication request to verify user role claims
      // CONFIGURATION KEY: Change 'http://localhost:9090' to match your live domain or operational proxy address
      const response = await fetch('http://localhost:9090/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Access denied. Invalid profile credentials.');
      }

      const userData = await response.json();
      
      // STORAGE CONFIGURATION: Commits validated session token structures directly to the user browser storage layer
      localStorage.setItem('newsroom_session', JSON.stringify(userData));
      
      // Fires upstream state trigger handlers to alert parental application wrappers
      if (onLoginSuccess) onLoginSuccess(userData);
      
      alert(`Welcome back, user role recognized: ${userData.role}`);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        {/* Branding header metadata blocks */}
        <div className="login-header">
          <h2>Newsroom Today</h2>
          <p>Control Desk Administration Terminal</p>
        </div>

        {/* Conditionally renders server authentication error feedback states */}
        {errorMessage && <div className="error-alert">{errorMessage}</div>}

        <form onSubmit={handleFormSubmit}>
          <div className="form-field">
            <label>Username</label>
            <input 
              type="text" 
              required 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button type="submit" className="login-submit-button">
            Authenticate Access
          </button>
        </form>
      </div>
    </div>
  );
}