// client/src/About.jsx
import './Auth.css';

function About() {
  return (
    <div className="auth-container">
      <div className="auth-card" style={{maxWidth: '600px'}}>
        <h2 className="auth-title">About Us</h2>
        <p style={{lineHeight: '1.6', color: '#555'}}>
          Welcome to our Boilerplate Application. We provide secure authentication 
          and a robust Full-Stack architecture using React, FastAPI, and MongoDB.
        </p>
      </div>
    </div>
  );
}

export default About;