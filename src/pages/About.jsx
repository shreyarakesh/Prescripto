import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className="about-container">

      {/* Hero Section */}
      <section className="about-hero">
        <img
          className="about-hero-img"
          src="https://images.unsplash.com/photo-1588776814546-b624b5d6b1e8?auto=format&fit=crop&w=1600&q=80"
          alt="Healthcare Technology"
        />
        <div className="about-hero-text">
          <h1>About <span>Medico</span></h1>
          <p>Revolutionizing your healthcare experience with seamless appointment booking and smart records management.</p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section">
        <div className="about-image">
          <img src="https://images.unsplash.com/photo-1588776814600-1bf9b55d8f5e?auto=format&fit=crop&w=800&q=80" alt="Doctors working" />
        </div>
        <div className="about-text">
          <h2>Welcome to Medico</h2>
          <p>
            At Medico, we simplify healthcare for everyone. Whether you're scheduling a consultation or tracking your appointments, our platform puts you in control. We believe accessing medical care should be fast, easy, and secure.
          </p>
          <p>
            Our mission is to bridge the gap between patients and healthcare providers using intuitive, modern technology.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose <span>MEDICO</span>?</h2>
        <div className="features">
          <div className="feature">
            <img src="https://cdn-icons-png.flaticon.com/512/3208/3208725.png" alt="Efficiency" />
            <h3>Efficiency</h3>
            <p>Book appointments in seconds and get reminders without the hassle.</p>
          </div>
          <div className="feature">
            <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Convenience" />
            <h3>Convenience</h3>
            <p>Access trusted healthcare professionals near you — anytime, anywhere.</p>
          </div>
          <div className="feature">
            <img src="https://cdn-icons-png.flaticon.com/512/4205/4205977.png" alt="Personalization" />
            <h3>Personalization</h3>
            <p>Receive health tips, reminders, and recommendations tailored just for you.</p>
          </div>
        </div>
      </section>

    </div>
  )
}

export default About
