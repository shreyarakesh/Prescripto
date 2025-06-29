import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import './Login.css'  // Import the CSS here

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
          toast.success('Admin logged in successfully!')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
          toast.success('Doctor logged in successfully!')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
      console.error(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="login-form">
      <div className="login-container">
        <h2><span>{state}</span> Login</h2>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <button type="submit">Login</button>

        <p className="toggle-login">
          {state === 'Admin' ? (
            <>Doctor Login? <span onClick={() => setState('Doctor')}>Click here</span></>
          ) : (
            <>Admin Login? <span onClick={() => setState('Admin')}>Click here</span></>
          )}
        </p>
      </div>
    </form>
  )
}

export default Login
