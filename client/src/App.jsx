// client/src/App.jsx
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import ForgotPassword from './ForgotPassword'; // <--- Import
import ResetPassword from './ResetPassword';   // <--- Import

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar */}
        <nav className="navbar">
          {/* LEFT SIDE: Logo */}
          <Link to="/">
             <div className="nav-logo"></div>
          </Link>

          {/* RIGHT SIDE: Buttons */}
          <div className="nav-buttons">
             <Link to="/login" className="nav-link nav-link-cta">Login</Link>
             <Link to="/signup" className="nav-link nav-link-cta">Sign Up</Link>
          </div>
        </nav>

        {/* Page Content */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={
            <div style={{textAlign: 'center', marginTop: '50px'}}>
              <h1>Welcome to the Boilerplate</h1>
              <p>Build something amazing.</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}
export default App; 