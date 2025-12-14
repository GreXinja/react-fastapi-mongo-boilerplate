// client/src/Dashboard.jsx
import { useEffect, useState } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        // 1. Get token from storage
        const token = localStorage.getItem('token');
        
        // 2. If no token, kick user back to login
        if (!token) {
          navigate('/login');
          return;
        }

        // 3. Make API call WITH the token in the Header
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${token}` // This is the "Key Card"
          }
        });

        // 4. Show success data
        setMessage(response.data.message);
        setEmail(response.data.your_email);

      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Session expired or invalid token. Please login again.");
        navigate('/login');
      }
    };

    fetchProtectedData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Destroy the key card
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard (Protected)</h1>
      <div style={{ border: '1px solid green', padding: '20px', borderRadius: '8px' }}>
        <p><strong>Server Message:</strong> {message}</p>
        <p><strong>Your Email:</strong> {email}</p>
      </div>
      
      <button 
        onClick={handleLogout} 
        style={{ marginTop: '20px', padding: '10px 20px', background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;