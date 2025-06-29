import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

import './Contact.css';

const Contact = () => {
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_hz136jk', 'template_qpz4n06', form.current, '0nXK8m3Xm9Wh_0NrJ')
      .then(() => {
        setSubmitted(true);
        form.current.reset();
        setTimeout(() => setSubmitted(false), 5000); // Hide message after 5 sec
      })
      .catch((error) => {
        alert('Failed to send message. Try again later.');
        console.error(error);
      });
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Get in Touch</h1>
      <p className="contact-description">We'd love to hear from you!</p>

      <div className="contact-content">
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <div className="form-group floating">
            <input type="text" name="user_name" placeholder=" " required />
            <label>Your Name</label>
          </div>

          <div className="form-group floating">
            <input type="email" name="user_email" placeholder=" " required />
            <label>Your Email</label>
          </div>

          <div className="form-group floating">
            <textarea name="message" rows="5" placeholder=" " required></textarea>
            <label>Your Message</label>
          </div>

          <button type="submit" className="submit-button">Send Message</button>

          {submitted && <p className="success-message">Message sent successfully!</p>}
        </form>

        <div className="contact-info">
          <h3>Contact Info</h3>
          <p><strong>Email:</strong> contact@yourhealthsite.com</p>
          <p><strong>Phone:</strong> +1 (234) 567-8901</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
