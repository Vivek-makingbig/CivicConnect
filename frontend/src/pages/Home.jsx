import React from "react";

import { Link } from 'react-router-dom';

import "../styles/home.css";
import logo from '../assets/logo.jpg';

function Home() {
  return (
    <div className="landing">

      {/* Navbar */}

      <nav className="navbar">
        {/* <img src={logo} id="logo" alt="Logo" ></img> */}

        <div id="logo">
          Civic<span>Connect</span>
        </div>
        {/* <ul className="Navbar-items">
          <li>How it works</li>
        </ul> */}


        <ul className="Navbar-items">
          <li>
            <Link to="/HowItWorks">How It Works</Link>
          </li>
        </ul>

        <div className="nav-links">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </nav>


      {/* Hero Section */}

      <section className="hero">

        <div id="hero-container-writing">
          <h1>Report Disasters. Save Lives.</h1>

          <p>
            A platform where citizens can report disasters and rescue teams
            respond quickly to emergencies.
          </p>
        </div>

        <div className="hero-buttons">
          <a href="/register" className="primary-btn">Report Disaster</a>
          <a href="/login" className="secondary-btn">Login</a>
        </div>

      </section>



      {/* Dashboard section  */}
      <section className="dashboard-section">

        {/* Community Promotion */}
        <div className="dashboard-box community-box">

          <div className="community-content">
            <h2>Make Your Community Better</h2>

            <p>
              Every problem deserves attention. Report local disasters
              and issues in your area, support verified reports, and
              help authorities take action.
            </p>

            <h3>Your Voice Can Make a Difference!</h3>

            <button onClick={() => navigate('/report')}>
              Report a Problem
            </button>
          </div>

        </div>


        {/* Platform Statistics */}
        <div className="dashboard-box">

          <h2>Platform Statistics</h2>

          <div className="stats-container">

            <div className="stat-card total">
              <h3>Total Reports</h3>
              <p>120</p>
            </div>

            <div className="stat-card solved">
              <h3>Solved Reports</h3>
              <p>85</p>
            </div>

            <div className="stat-card pending">
              <h3>Pending Reports</h3>
              <p>35</p>
            </div>

          </div>

        </div>

      </section>

      {/* Emergency  */}

      <section className="emergency">

        <div className="emergency-header">
          <h2>Emergency Helplines</h2>

          <p className="emergency-desc">
            For immediate assistance, contact the appropriate emergency service.
          </p>
        </div>

        <div className="helpline-grid">

          <div className="helpline-card police">
            <div className="helpline-info">
              <span className="helpline-label">EMERGENCY SERVICE</span>
              <h3>Police</h3>
              <p className="number">100</p>
            </div>

            <a href="tel:100" className="call-btn">
              Call Police
            </a>
          </div>

          <div className="helpline-card fire">
            <div className="helpline-info">
              <span className="helpline-label">EMERGENCY SERVICE</span>
              <h3>Fire Brigade</h3>
              <p className="number">101</p>
            </div>

            <a href="tel:101" className="call-btn">
              Call Fire Service
            </a>
          </div>

          <div className="helpline-card ambulance">
            <div className="helpline-info">
              <span className="helpline-label">MEDICAL EMERGENCY</span>
              <h3>Ambulance</h3>
              <p className="number">102</p>
            </div>

            <a href="tel:102" className="call-btn">
              Call Ambulance
            </a>
          </div>

          <div className="helpline-card disaster">
            <div className="helpline-info">
              <span className="helpline-label">DISASTER RESPONSE</span>
              <h3>Disaster Helpline</h3>
              <p className="number">108</p>
            </div>

            <a href="tel:108" className="call-btn">
              Call Helpline
            </a>
          </div>

        </div>

        <p className="emergency-note">
          In an emergency, provide your exact location and a clear description
          of the situation.
        </p>

      </section>


      {/* Footer */}

      {/* <footer className="landing-footer">
        <p>Disaster Management System © 2026</p>
      </footer> */}
      <footer className="landing-footer">
        <div className="footer-content">

          <div className="footer-left">
            <h3>Disaster Management</h3>
            <p>Helping people report disasters and get help quickly.</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Report</a></li>
              <li><a href="#">Resources</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p>Email: support@dms.com</p>
            <p>Helpline: 108</p>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 Disaster Management System</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;