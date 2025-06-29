import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import './DoctorDashboard.css'

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  if (!dashData) return null

  return (
    <div className="dashboard-container">
      <div className="stats-cards">
        <div className="card">
          <img src={assets.earning_icon} alt="Earnings" className="card-icon" />
          <div>
            <p className="card-value">{currency} {dashData.earnings}</p>
            <p className="card-label">Earnings</p>
          </div>
        </div>
        <div className="card">
          <img src={assets.appointments_icon} alt="Appointments" className="card-icon" />
          <div>
            <p className="card-value">{dashData.appointments}</p>
            <p className="card-label">Appointments</p>
          </div>
        </div>
        <div className="card">
          <img src={assets.patients_icon} alt="Patients" className="card-icon" />
          <div>
            <p className="card-value">{dashData.patients}</p>
            <p className="card-label">Patients</p>
          </div>
        </div>
      </div>

      <div className="latest-bookings">
        <div className="latest-bookings-header">
          <img src={assets.list_icon} alt="Latest Bookings" />
          <p className="header-title">Latest Bookings</p>
        </div>

        <div className="bookings-list">
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className="booking-item" key={item._id || index}>
              <img src={item.userData.image} alt={item.userData.name} className="booking-user-img" />
              <div className="booking-info">
                <p className="booking-user-name">{item.userData.name}</p>
                <p className="booking-date">Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              <div className="booking-status">
                {item.cancelled ? (
                  <p className="status cancelled">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="status completed">Completed</p>
                ) : (
                  <div className="actions">
                    <img
                      src={assets.cancel_icon}
                      alt="Cancel"
                      className="action-icon"
                      onClick={() => cancelAppointment(item._id)}
                      title="Cancel Appointment"
                    />
                    <img
                      src={assets.tick_icon}
                      alt="Complete"
                      className="action-icon"
                      onClick={() => completeAppointment(item._id)}
                      title="Mark as Completed"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
