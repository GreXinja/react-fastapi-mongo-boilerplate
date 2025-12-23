// client/src/Navbar.jsx
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Auth.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // This makes the Navbar update when the URL changes

  // Simple check: Do we have a token?
  const isLoggedIn = !!localStorage.getItem('token'); 

  const handleLogout = () => {
    localStorage.removeItem('token'); // Delete the "Key Card"
    navigate('/login'); // Send user back to Login
  };

  return (
    <nav className="navbar">
      {/* LEFT SIDE: Logo */}
      <Link to="/">
         <div className="nav-logo"></div>
      </Link>

      {/* RIGHT SIDE: Buttons */}
      <div className="nav-buttons">
        {/* 1. HOME (Always Visible) */}
        <Link to="/" className="nav-link nav-link-cta">Home</Link>

        {isLoggedIn ? (
            // --- IF LOGGED IN, SHOW THESE: ---
            <>
                <Link to="/dashboard" className="nav-link nav-link-cta">Dashboard</Link>
                <Link to="/about" className="nav-link nav-link-cta">About Us</Link>
                {/* Logout is a button, not a Link, so we can run code */}
                <button 
                  onClick={handleLogout} 
                  className="nav-link nav-link-cta"
                  style={{border: 'none', cursor: 'pointer', fontSize: '1rem'}}
                >
                  Logout
                </button>
            </>
        ) : (
            // --- IF LOGGED OUT, SHOW THESE: ---
            <>
                <Link to="/login" className="nav-link nav-link-cta">Login</Link>
                <Link to="/signup" className="nav-link nav-link-cta">Sign Up</Link>
            </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;