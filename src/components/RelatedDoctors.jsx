import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './RelatedDoctors.css';

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="related-container">
      <h1 className="related-title">Related Doctors</h1>
      <p className="related-subtitle">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="related-grid">
        {relDoc.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="doctor-card"
          >
            <img className="doctor-image" src={item.image} alt={item.name} />
            <div className="doctor-info">
              <div
                className={`availability ${
                  item.available ? 'available' : 'not-available'
                }`}
              >
                <span
                  className={`status-dot ${
                    item.available ? 'green-dot' : 'gray-dot'
                  }`}
                ></span>
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
              <p className="doctor-name">{item.name}</p>
              <p className="doctor-speciality">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
