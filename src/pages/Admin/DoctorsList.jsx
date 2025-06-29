import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import './DoctorsList.css'  // Import CSS styles

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className="doctors-list-container">
      <h1 className="doctors-list-title">All Doctors</h1>
      <div className="doctors-grid">
        {doctors.map((item, index) => (
          <div className="doctor-card" key={item._id || index} tabIndex={0}>
            <img className="doctor-image" src={item.image} alt={item.name} />
            <div className="doctor-info">
              <p className="doctor-name">{item.name}</p>
              <p className="doctor-speciality">{item.speciality}</p>
              <label className="availability-label">
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={() => changeAvailability(item._id)}
                />
                <span>Available</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
