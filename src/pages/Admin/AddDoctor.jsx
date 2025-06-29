import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

import './AddDoctor.css'  // New CSS file

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl } = useContext(AppContext)
  const { aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (!docImg) {
        return toast.error('Image Not Selected')
      }
      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="add-doctor-form">
      <h2 className="form-title">Add Doctor</h2>

      <div className="form-container">
        <div className="image-upload-section">
          <label htmlFor="doc-img" className="image-label">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Doctor"
              className="doctor-image"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p className="upload-text">Upload doctor <br /> picture</p>
        </div>

        <div className="fields-wrapper">
          <div className="field-group">
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="email">Doctor Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="password">Set Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="experience">Experience</label>
            <select
              id="experience"
              value={experience}
              onChange={e => setExperience(e.target.value)}
            >
              <option>1 Year</option>
              <option>2 Years</option>
              <option>3 Years</option>
              <option>4 Years</option>
              <option>5 Years</option>
              <option>6 Years</option>
              <option>8 Years</option>
              <option>9 Years</option>
              <option>10 Years</option>
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="fees">Fees</label>
            <input
              id="fees"
              type="number"
              placeholder="Doctor fees"
              value={fees}
              onChange={e => setFees(e.target.value)}
              required
              min="0"
            />
          </div>
        </div>

        <div className="fields-wrapper">
          <div className="field-group">
            <label htmlFor="speciality">Speciality</label>
            <select
              id="speciality"
              value={speciality}
              onChange={e => setSpeciality(e.target.value)}
            >
              <option>General physician</option>
              <option>Gynecologist</option>
              <option>Dermatologist</option>
              <option>Pediatricians</option>
              <option>Neurologist</option>
              <option>Gastroenterologist</option>
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="degree">Degree</label>
            <input
              id="degree"
              type="text"
              placeholder="Degree"
              value={degree}
              onChange={e => setDegree(e.target.value)}
              required
            />
          </div>

          <div className="field-group address-group">
            <label>Address</label>
            <input
              type="text"
              placeholder="Address 1"
              value={address1}
              onChange={e => setAddress1(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Address 2"
              value={address2}
              onChange={e => setAddress2(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="about-section">
        <label htmlFor="about">About Doctor</label>
        <textarea
          id="about"
          rows={5}
          placeholder="Write about doctor"
          value={about}
          onChange={e => setAbout(e.target.value)}
        />
      </div>

      <button type="submit" className="submit-btn">Add doctor</button>
    </form>
  )
}

export default AddDoctor
