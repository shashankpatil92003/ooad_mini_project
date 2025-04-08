import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';

import electricalImg from '../images/electrical.jpg';
import plumberImg from '../images/carpenter.jpg'; // assuming this is plumbing-related
import cleaningImg from '../images/cleaning.jpg';
import beautyImg from '../images/beauty.webp';
import otherServicesImg from '../images/otherservices.jpg';

import '../styles/CustomerDashboard.css';

const CustomerDashboard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAccountInfo, setShowAccountInfo] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleAccountInfo = () => {
    setShowAccountInfo(true);
    setShowDropdown(false);
  };
  const closeAccountInfo = () => setShowAccountInfo(false);

  return (
    <div className="customer-dashboard">
      {/* Header with logo and profile */}
      <div className="dashboard-header">
        <div className="dashboard-logo">
          <p>Your one-stop solution for all household services!</p>
        </div>
        <div className="profile-section">
          <button onClick={toggleDropdown} className="profile-btn">
            <FontAwesomeIcon icon={faUser} /> <FontAwesomeIcon icon={faChevronDown} />
          </button>

          {showDropdown && (
            <div className="profile-dropdown">
              <button onClick={toggleAccountInfo}>Account</button>
              <button>My Bookings</button>
              <button>Help Center</button>
              <button>Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* Account Details Modal */}
      {showAccountInfo && (
        <div className="modal-overlay" onClick={closeAccountInfo}>
          <div className="account-info-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeAccountInfo}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>Account Details</h3>
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Phone:</strong> 9876543210</p>
            <p><strong>Address:</strong> 123, Blue Street, CityName</p>
            <button className="edit-btn">Edit</button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-text">
          <h1>Welcome to <span className="highlight">Urban-Connect</span></h1>
          <button className="book-btn">Book a Service</button>
        </div>
        <div className="hero-image">
          <img src={cleaningImg} alt="Hero" />
        </div>
      </div>

      {/* Services Section */}
      <div className="services-section">
        <h2>Our Services</h2>
        <div className="service-cards">
          <div className="service-card">
            <img src={electricalImg} alt="Electrical" className="service-img" />
            <p><strong>Electrical Services</strong></p>
          </div>
          <div className="service-card">
            <img src={plumberImg} alt="Plumbing" className="service-img" />
            <p><strong>Plumbing Services</strong></p>
          </div>
          <div className="service-card">
            <img src={cleaningImg} alt="Cleaning" className="service-img" />
            <p><strong>Cleaning Services</strong></p>
          </div>
          <div className="service-card">
            <img src={beautyImg} alt="Beauty" className="service-img" />
            <p><strong>Beauty Services</strong></p>
          </div>
          <div className="service-card">
            <img src={otherServicesImg} alt="Other" className="service-img" />
            <p><strong>Other Services</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;