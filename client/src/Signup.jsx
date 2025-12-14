// client/src/Signup.jsx
import { useState } from 'react';
import api from './api'; // Import our central API helper

function Signup() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page from reloading
    try {
      const response = await api.post('/signup', formData);
      alert('Signup Successful! User ID: ' + response.data.id);
    } catch (error) {
      console.error(error);
      alert('Signup Failed: ' + (error.response?.data?.detail || 'Unknown Error'));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" 
            name="fullname" 
            placeholder="Full Name" 
            onChange={handleChange} 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
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
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;