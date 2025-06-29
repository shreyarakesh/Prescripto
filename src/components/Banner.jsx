import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import './Banner.css'; // Import the CSS file

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="banner-container">
      {/* Left Side */}
      <div className="banner-text">
        <div className="banner-title">
          <p>Book Appointment</p>
          <p>With 100+ Trusted Doctors</p>
        </div>
        <button
          className="banner-button"
          onClick={() => {
            navigate('/login');
            scrollTo(0, 0);
          }}
        >
          Create account
        </button>
      </div>

      {/* Right Side */}
      <div className="banner-image-container">
        <img
          className="banner-image"
          src={assets.appointment_img}
          alt="Appointment Illustration"
        />
      </div>
    </div>
  );
};

export default Banner;
