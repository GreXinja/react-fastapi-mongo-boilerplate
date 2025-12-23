// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; // <--- Import the new component
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import About from './About'; // <--- Import About page

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* The Navbar handles its own logic now! */}
        <Navbar />

        {/* Page Content */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
          
          <Route path="/" element={
            <div style={{textAlign: 'center', marginTop: '10px'}}>
               {/* You can add a nice Hero Image here later */}
               <div style={{
                  padding: '50px', 
                  background: 'white', 
                  margin: '20px auto', 
                  maxWidth: '800px', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
               }}>
                  <h1 style={{color: '#333', marginBottom: '10px'}}>Welcome Home</h1>
                  <p style={{color: '#666'}}>
                    This page is visible to everyone, logged in or not.
                  </p>
               </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;