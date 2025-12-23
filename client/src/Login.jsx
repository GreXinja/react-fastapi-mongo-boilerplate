// client/src/Login.jsx
import { useState } from 'react';
import api from './api';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css'; // <--- CRITICAL: Imports the styles

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', formData);
      localStorage.setItem('token', response.data.access_token);
      navigate('/dashboard'); 
    } catch (error) {
      console.error(error);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              className="auth-input"
              type="email" 
              name="email" 
              placeholder="Email Address" 
              onChange={handleChange} 
              required
            />
          </div>
          <div className="form-group">
            <input 
              className="auth-input"
              type="password" 
              name="password" 
              placeholder="Password" 
              onChange={handleChange} 
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="auth-button">
            Log In
          </button>
        </form>

        <div className="auth-links">
          <p>
            <Link to="/forgot-password" className="link-text">Forgot Password?</Link>
          </p>
          <p style={{ marginTop: '10px' }}>
            <span>Don't have an account? </span>
            <Link to="/signup" className="link-text">Register Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;