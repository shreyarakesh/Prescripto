import React, { useEffect, useContext } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

import './AllAppointments.css'  // import the new CSS file

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className="appointments-container">
      <h2 className="appointments-title">All Appointments</h2>

      <div className="appointments-table-wrapper">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Patient</th>
              <th className="hide-sm">Age</th>
              <th>Date & Time</th>
              <th>Doctor</th>
              <th>Fees</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((item, index) => (
              <tr key={item._id || index} className="appointment-row">
                <td className="hide-xs">{index + 1}</td>
                <td className="patient-info">
                  <img src={item.userData.image} alt={item.userData.name} className="avatar" />
                  <span>{item.userData.name}</span>
                </td>
                <td className="hide-sm">{calculateAge(item.userData.dob)}</td>
                <td>{slotDateFormat(item.slotDate)}, {item.slotTime}</td>
                <td className="doctor-info">
                  <img src={item.docData.image} alt={item.docData.name} className="avatar" />
                  <span>{item.docData.name}</span>
                </td>
                <td>{currency}{item.amount}</td>
                <td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllAppointments
