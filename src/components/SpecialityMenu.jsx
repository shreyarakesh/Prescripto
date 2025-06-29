import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';
import './SpecialityMenu.css';

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="speciality-container">
      <h1 className="speciality-title">Find by Speciality</h1>
      <p className="speciality-subtitle">
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>

      <div className="speciality-list">
        {specialityData.map((item, index) => (
          <Link
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            key={index}
            className="speciality-item"
          >
            <img className="speciality-img" src={item.image} alt={item.speciality} />
            <p className="speciality-text">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
