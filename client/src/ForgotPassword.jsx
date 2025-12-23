// client/src/ForgotPassword.jsx
import { useState } from 'react';
import api from './api';
import { Link } from 'react-router-dom';
import './Auth.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    try {
      // Send the email to backend
      const response = await api.post('/forgot-password', { email });
      setMessage(response.data.message);
    } catch (err) {
      console.error(err);
      setError("User not found or server error.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Reset Password</h2>
        <p style={{marginBottom: '20px', color: '#666'}}>
          Enter your email to receive a reset link.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              className="auth-input"
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>

          {message && <p style={{color: 'green', marginTop: '10px'}}>{message}</p>}
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="auth-button">
            Send Link
          </button>
        </form>

        <div className="auth-links">
          <Link to="/login" className="link-text">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;