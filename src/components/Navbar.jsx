import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './Navbar.css';
import hospitalLogo from './download-1.png'; // Make sure the file is in the same folder

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(false);
    navigate('/login');
  };

  return (
    <div className="navbar-container">
    <img
  onClick={() => navigate('/')}
  className="navbar-logo"
  src={hospitalLogo}
  alt="Hospital Logo"
/>

      <ul className="navbar-menu desktop-menu">
        <NavLink to="/">
          <li className="navbar-item">HOME</li>
          <hr className="navbar-underline" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="navbar-item">ALL DOCTORS</li>
          <hr className="navbar-underline" />
        </NavLink>
        <NavLink to="/about">
          <li className="navbar-item">ABOUT</li>
          <hr className="navbar-underline" />
        </NavLink>
        <NavLink to="/contact">
          <li className="navbar-item">CONTACT</li>
          <hr className="navbar-underline" />
        </NavLink>
      </ul>

      <div className="navbar-right">
        {token && userData ? (
          <div className="user-menu group">
            <img className="user-avatar" src={userData.image} alt="profile" />
            <img className="dropdown-icon" src={assets.dropdown_icon} alt="dropdown" />
            <div className="dropdown-menu">
              <p onClick={() => navigate('/my-profile')} className="dropdown-item">
                My Profile
              </p>
              <p onClick={() => navigate('/my-appointments')} className="dropdown-item">
                My Appointments
              </p>
              <p onClick={logout} className="dropdown-item">
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className="btn-create-account desktop-only">
            Create account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="menu-icon mobile-only"
          src={assets.menu_icon}
          alt="menu"
        />

        {/* Mobile Menu */}
        <div className={`mobile-menu ${showMenu ? 'show' : ''}`}>
          <div className="mobile-menu-header">
            <img src={assets.logo} className="mobile-menu-logo" alt="logo" />
            <img
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              className="mobile-menu-close"
              alt="close"
            />
          </div>
          <ul className="mobile-menu-list">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="mobile-menu-item">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="mobile-menu-item">ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="mobile-menu-item">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="mobile-menu-item">CONTACT</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
