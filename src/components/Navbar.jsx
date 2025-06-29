import React, { useContext } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import hospitalLogo from './download-1.png'; // ✅ Correct relative import

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext);
  const { aToken, setAToken } = useContext(AdminContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    if (dToken) {
      setDToken('');
      localStorage.removeItem('dToken');
    }
    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate('/')}>
        <img 
          className="navbar-logo"
          src={hospitalLogo}
          alt="Hospital Logo"
        />
        <span className="navbar-role">{aToken ? 'Admin' : 'Doctor'}</span>
      </div>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
