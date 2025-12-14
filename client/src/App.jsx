// client/src/App.jsx
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        {/* Navigation Bar */}
        <nav style={{ padding: '20px', background: '#f0f0f0', marginBottom: '20px' }}>
          <Link to="/signup" style={{ marginRight: '20px' }}>Signup</Link>
          <Link to="/login">Login</Link>
        </nav>

        {/* This part changes based on the URL */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<div style={{padding: '20px'}}>Welcome! Click Login or Signup above.</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;