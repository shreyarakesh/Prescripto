import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import './DoctorAppointments.css'  // Import CSS file

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className="appointments-container">
      <h2 className="appointments-title">All Appointments</h2>
      <div className="appointments-table">
        <div className="table-header">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div className="table-row" key={item._id || index}>
            <p className="hide-mobile">{index + 1}</p>
            <div className="patient-info">
              <img src={item.userData.image} alt={item.userData.name} className="patient-img" />
              <span>{item.userData.name}</span>
            </div>
            <p className={`payment-badge ${item.payment ? 'online' : 'cash'}`}>
              {item.payment ? 'Online' : 'CASH'}
            </p>
            <p className="hide-mobile">{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <p>{currency}{item.amount}</p>
            <div className="actions">
              {item.cancelled ? (
                <p className="status cancelled">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="status completed">Completed</p>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorAppointments
