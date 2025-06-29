import React from 'react';
import './Delivery.css';

const Delivery = () => {
  return (
    <div className="delivery-container">
      <h1 className="delivery-title">Delivery Information</h1>
      <p className="delivery-description">
        At Medico, we strive to ensure your healthcare products and prescriptions are delivered promptly and safely to your doorstep.
      </p>

      <section className="delivery-section">
        <h2>Shipping Options</h2>
        <ul>
          <li>Standard Delivery: Delivered within 5-7 business days.</li>
          <li>Express Delivery: Delivered within 2-3 business days.</li>
          <li>Same-Day Delivery: Available in select cities for orders placed before noon.</li>
        </ul>
      </section>

      <section className="delivery-section">
        <h2>Order Tracking</h2>
        <p>
          Once your order is shipped, you will receive a tracking number via email and SMS to monitor your delivery status.
        </p>
      </section>

      <section className="delivery-section">
        <h2>Return & Refund Policy</h2>
        <p>
          If you are not satisfied with your order, please contact our support team within 7 days for a refund or exchange.
        </p>
      </section>
    </div>
  );
};

export default Delivery;
