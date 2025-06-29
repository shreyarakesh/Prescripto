import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import './Doctors.css'

const SPECIALITIES = [
  'General physician',
  'Gynecologist',
  'Dermatologist',
  'Pediatricians',
  'Neurologist',
  'Gastroenterologist',
]

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className="doctors-container">
      <h2 className="doctors-title">Browse Specialist Doctors</h2>
      <p className="doctors-subtitle">
        Simply browse through our extensive list of trusted doctors and specialists.
      </p>

      <button
        className={`filter-toggle ${showFilter ? 'active' : ''}`}
        onClick={() => setShowFilter(!showFilter)}
      >
        {showFilter ? 'Hide Filters' : 'Show Filters'}
      </button>

      <div className="doctors-content">
        {/* Filters */}
        <div className={`filters ${showFilter ? 'show' : ''}`}>
          {SPECIALITIES.map((spec) => {
            const isActive = speciality === spec
            return (
              <p
                key={spec}
                className={`filter-item ${isActive ? 'active' : ''}`}
                onClick={() => (isActive ? navigate('/doctors') : navigate(`/doctors/${spec}`))}
              >
                {spec}
              </p>
            )
          })}
        </div>

        {/* Doctor Cards */}
        <div className="doctor-cards">
          {filterDoc.length === 0 ? (
            <p className="no-doctors">No doctors found for this speciality.</p>
          ) : (
            filterDoc.map((doc) => (
              <div
                key={doc._id}
                className="doctor-card"
                onClick={() => {
                  navigate(`/appointment/${doc._id}`)
                  scrollTo(0, 0)
                }}
              >
                <img className="doctor-image" src={doc.image} alt={doc.name} />
                <div className="doctor-info">
                  <div className={`availability ${doc.available ? 'available' : 'unavailable'}`}>
                    <span className="availability-indicator"></span>
                    <p>{doc.available ? 'Available' : 'Not Available'}</p>
                  </div>
                  <p className="doctor-name">{doc.name}</p>
                  <p className="doctor-speciality">{doc.speciality}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors
