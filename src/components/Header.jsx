import React from 'react';
import { assets } from '../assets/assets';
import './Header.css';

const Header = () => {
  return (
    <div className="header-container">

      {/* --------- Header Left --------- */}
      <div className="header-left">
        <p className="header-title">
          Book Appointment <br /> With Trusted Doctors
        </p>

        <div className="header-info">
          <img className="group-profiles" src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted doctors, <br className="line-break" /> schedule your appointment hassle-free.
          </p>
        </div>

        <a href="#speciality" className="book-btn">
          Book appointment <img className="arrow-icon" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* --------- Header Right --------- */}
      <div className="header-right">
        <img className="header-image" src={assets.header_img} alt="" />
      </div>

    </div>
  );
};

export default Header;
