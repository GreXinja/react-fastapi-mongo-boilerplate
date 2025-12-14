// client/src/Login.jsx
import { useState } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom'; // Hook to move between pages

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Send data to backend
      const response = await api.post('/login', formData);
      
      // 2. Extract the token from the response
      const token = response.data.access_token;
      
      // 3. Save it in the browser's "safe"
      localStorage.setItem('token', token);
      
      alert('Login Successful! Token saved.');
      console.log("Your Access Token:", token);
      
      // Optional: Redirect to a dashboard or home page
      // navigate('/dashboard'); 
      
    } catch (error) {
      console.error(error);
      alert('Login Failed: ' + (error.response?.data?.detail || 'Invalid credentials'));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="email" 
            name="email" 
            placeholder="Email Address" 
            onChange={handleChange} 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;