import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import './Sidebar.css';

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  const activeClassName = "sidebar-link active";
  const inactiveClassName = "sidebar-link";

  return (
    <div className="sidebar">
      {aToken && (
        <ul className="sidebar-list">
          <li>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}
            >
              <img src={assets.home_icon} alt="Dashboard" className="sidebar-icon" />
              <span className="sidebar-text">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-appointments"
              className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}
            >
              <img src={assets.appointment_icon} alt="Appointments" className="sidebar-icon" />
              <span className="sidebar-text">Appointments</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-doctor"
              className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}
            >
              <img src={assets.add_icon} alt="Add Doctor" className="sidebar-icon" />
              <span className="sidebar-text">Add Doctor</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doctor-list"
              className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}
            >
              <img src={assets.people_icon} alt="Doctors List" className="sidebar-icon" />
              <span className="sidebar-text">Doctors List</span>
            </NavLink>
          </li>
        </ul>
      )}

      {dToken && (
        <ul className="sidebar-list">
          <li>
            <NavLink
              to="/doctor-dashboard"
              className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}
            >
              <img src={assets.home_icon} alt="Dashboard" className="sidebar-icon" />
              <span className="sidebar-text">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doctor-appointments"
              className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}
            >
              <img src={assets.appointment_icon} alt="Appointments" className="sidebar-icon" />
              <span className="sidebar-text">Appointments</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doctor-profile"
              className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}
            >
              <img src={assets.people_icon} alt="Profile" className="sidebar-icon" />
              <span className="sidebar-text">Profile</span>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
