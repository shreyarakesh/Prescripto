import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import './Footer.css';
import hospitalLogo from './download-1.png';
const Footer = () => {
  return (
    <div className="footer-container md:mx-10">
      <div className="footer-main flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        <div>
          <img className="w-40 mb-5 footer-logo" src={hospitalLogo} alt="Prescripto Logo" />
          <p className="w-full leading-6 text-gray-600 footer-desc md:w-2/3">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        <div>
          <p className="mb-5 text-xl font-medium footer-title">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600 footer-links">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/about" className="footer-link">About us</Link></li>
            <li><Link to="/delivery" className="footer-link">Delivery</Link></li>
            <li><Link to="/privacy-policy" className="footer-link">Privacy policy</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-5 text-xl font-medium footer-title">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>greatstackdev@gmail.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center footer-copyright">
          Copyright 2024 @ Prescripto.com - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
