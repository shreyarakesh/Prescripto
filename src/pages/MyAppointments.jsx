import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import './MyAppointments.css';
const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [showUpiFor, setShowUpiFor] = useState(null);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });
      setAppointments(data.appointments.reverse());
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="myappointments-container">
      <h2 className="myappointments-title">My Appointments</h2>

      {appointments.length === 0 && <p className="no-appointments">No appointments found.</p>}

      <div className="appointments-list">
        {appointments.map((item) => (
          <div key={item._id} className="appointment-card">
            <div className="doctor-image-wrapper">
              <img src={item.docData.image} alt={item.docData.name} className="doctor-image" />
            </div>

            <div className="appointment-details">
              <p className="doctor-name">{item.docData.name}</p>
              <p className="doctor-speciality">{item.docData.speciality}</p>

              <p className="address-label">Address:</p>
              <p>{item.docData.address.line1}</p>
              <p>{item.docData.address.line2}</p>

              <p className="date-time">
                <span className="label">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            <div className="appointment-actions">
              {!item.cancelled && !item.payment && !item.isCompleted && showUpiFor !== item._id && (
                <button
                  onClick={() => setShowUpiFor(item._id)}
                  className="btn btn-show-upi"
                >
                  Pay via UPI
                </button>
              )}

              {showUpiFor === item._id && (
                <div className="upi-section">
                  <p><strong>UPI ID:</strong> your-upi-id@bank</p>
                  <button onClick={() => setShowUpiFor(null)} className="btn btn-close-upi">Close</button>
                </div>
              )}

              {!item.cancelled && item.payment && !item.isCompleted && (
                <button className="btn btn-paid" disabled>Paid</button>
              )}

              {item.isCompleted && (
                <button className="btn btn-completed" disabled>Completed</button>
              )}

              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="btn btn-cancel"
                >
                  Cancel Appointment
                </button>
              )}

              {item.cancelled && !item.isCompleted && (
                <button className="btn btn-cancelled" disabled>Appointment Cancelled</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;
