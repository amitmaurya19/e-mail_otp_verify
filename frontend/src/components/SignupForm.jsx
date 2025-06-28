// SignupForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './SignupForm.css';

const SignupForm = ({ setOtpSent, setEmail }) => {
  const [inputEmail, setInputEmail] = useState('');

  const handleSendOTP = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/send-otp', { email: inputEmail });
      Swal.fire('Success 🎉', res.data.message, 'success');
      setOtpSent(true);
      setEmail(inputEmail);
    } catch (err) {
      Swal.fire('Oops!', err.response?.data?.error || 'Error sending OTP', 'error');
    }
  };

  return (
    <div>
      <h2 className="signup-heading">Signup with Email OTP</h2>

      <label className="signup-label">Email Address</label>
      <input
        type="email"
        placeholder="you@example.com"
        className="signup-input"
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
      />

      <button className="signup-button purple" onClick={handleSendOTP}>
        Send OTP
      </button>
    </div>
  );
};

export default SignupForm;
