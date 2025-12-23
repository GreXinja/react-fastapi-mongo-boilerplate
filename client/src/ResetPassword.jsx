// client/src/ResetPassword.jsx
import { useState } from 'react';
import api from './api';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './Auth.css';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [searchParams] = useSearchParams(); // Grabs ?token=... from URL
  const navigate = useNavigate();
  
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await api.post('/reset-password', {
        token: token,
        new_password: newPassword
      });
      
      alert("Password Reset Successful! Please Login.");
      navigate('/login');
      
    } catch (err) {
      console.error(err);
      alert("Error: Token expired or invalid.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">New Password</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              className="auth-input"
              type="password" 
              placeholder="New Password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)} 
              required
            />
          </div>
          <div className="form-group">
            <input 
              className="auth-input"
              type="password" 
              placeholder="Confirm New Password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;