// SignupForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './SignupForm.css';

const SignupForm = ({ setOtpSent, setEmail }) => {
  const [inputEmail, setInputEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/send-otp', { email: inputEmail });
      Swal.fire('✅ OTP Sent!', res.data.message, 'success');
      setOtpSent(true);
      setEmail(inputEmail);
    } catch (err) {
      Swal.fire('❌ Error', err.response?.data?.error || 'Failed to send OTP', 'error');
    } finally {
      setLoading(false);
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
        disabled={loading}
      />

      <button
        className={`signup-button purple ${loading ? 'disabled' : ''}`}
        onClick={handleSendOTP}
        disabled={loading}
      >
        {loading ? <div className="spinner"></div> : 'Send OTP'}
      </button>
    </div>
  );
};

export default SignupForm;
