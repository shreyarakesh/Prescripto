import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>
      <p>
        At Prescripto, we value your privacy. This Privacy Policy outlines how we collect, use,
        and protect your personal information.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We may collect personal data such as your name, email address, and medical history when
        you register or use our services.
      </p>

      <h2>How We Use Your Information</h2>
      <p>
        Your information helps us provide better healthcare services, communicate with you, and
        ensure compliance with medical regulations.
      </p>

      <h2>Data Security</h2>
      <p>
        We use industry-standard measures to protect your personal data against unauthorized access,
        alteration, or disclosure.
      </p>

      <h2>Your Rights</h2>
      <p>
        You have the right to access, update, or delete your personal information at any time.
        Contact us for any privacy concerns.
      </p>

      <h2>Changes to this Policy</h2>
      <p>
        We may update this policy periodically. Please review it regularly to stay informed about
        how we are protecting your data.
      </p>

      <p className="privacy-footer">
        If you have any questions about this Privacy Policy, please contact us at support@prescripto.com.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
