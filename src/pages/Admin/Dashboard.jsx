import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

import './Dashboard.css'  // Import CSS styles

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  if (!dashData) return null

  return (
    <div className="dashboard-container">
      <div className="stats-cards">
        <div className="stat-card" tabIndex={0}>
          <img className="stat-icon" src={assets.doctor_icon} alt="Doctors" />
          <div>
            <p className="stat-number">{dashData.doctors}</p>
            <p className="stat-label">Doctors</p>
          </div>
        </div>

        <div className="stat-card" tabIndex={0}>
          <img className="stat-icon" src={assets.appointments_icon} alt="Appointments" />
          <div>
            <p className="stat-number">{dashData.appointments}</p>
            <p className="stat-label">Appointments</p>
          </div>
        </div>

        <div className="stat-card" tabIndex={0}>
          <img className="stat-icon" src={assets.patients_icon} alt="Patients" />
          <div>
            <p className="stat-number">{dashData.patients}</p>
            <p className="stat-label">Patients</p>
          </div>
        </div>
      </div>

      <section className="latest-bookings">
        <header className="latest-bookings-header">
          <img src={assets.list_icon} alt="Latest Bookings" />
          <h3>Latest Bookings</h3>
        </header>

        <div className="bookings-list">
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className="booking-item" key={item._id || index}>
              <img className="booking-avatar" src={item.docData.image} alt={item.docData.name} />
              <div className="booking-info">
                <p className="doctor-name">{item.docData.name}</p>
                <p className="booking-date">Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              <div className="booking-status">
                {item.cancelled ? (
                  <span className="status cancelled">Cancelled</span>
                ) : item.isCompleted ? (
                  <span className="status completed">Completed</span>
                ) : (
                  <img
                    src={assets.cancel_icon}
                    alt="Cancel"
                    className="cancel-icon"
                    onClick={() => cancelAppointment(item._id)}
                    title="Cancel Appointment"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
