import { useState } from 'react';
import api from './api';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css'; // <--- Import the styling

function Signup() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '' // New Field
  });
  const [error, setError] = useState(''); // Local error state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear errors when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Validation Logic
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (formData.password.length < 5) {
      setError("Password must be at least 5 characters long.");
      return;
    }

    try {
      // 2. Send only the necessary data (exclude confirmPassword)
      const { confirmPassword, ...dataToSend } = formData;
      
      const response = await api.post('/signup', dataToSend);
      alert('Signup Successful! Redirecting to Login...');
      navigate('/login');
      
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.detail || 'Signup Failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              className="auth-input"
              type="text" 
              name="fullname" 
              placeholder="Full Name" 
              onChange={handleChange} 
              required
            />
          </div>
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
          <div className="form-group">
            <input 
              className="auth-input"
              type="password" 
              name="confirmPassword" 
              placeholder="Confirm Password" 
              onChange={handleChange} 
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="auth-button">
            Sign Up
          </button>
        </form>

        <div className="auth-links">
          <span>Already have an account? </span>
          <Link to="/login" className="link-text">Log In</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;