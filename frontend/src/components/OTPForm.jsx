// OTPForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './SignupForm.css'; // Reusing same styles

const OTPForm = ({ email }) => {
  const [otp, setOtp] = useState('');

  const handleVerifyOTP = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      if (res.data.success) {
        Swal.fire('✅ OTP Verified!', 'You are now signed in!', 'success');
      } else {
        Swal.fire('❌ Invalid OTP', res.data.error, 'error');
      }
    } catch (err) {
      Swal.fire('🚫 Error', err.response?.data?.error || 'Something went wrong', 'error');
    }
  };

  const isValidOTP = otp.length === 6 && /^\d+$/.test(otp); // 6 digits only

  return (
    <div>
      <h2 className="signup-heading">Enter Your OTP</h2>

      <label className="signup-label">OTP</label>
      <input
        type="text"
        maxLength="6"
        placeholder="Enter 6-digit OTP"
        className="signup-input"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
        className={`signup-button ${isValidOTP ? 'green' : 'disabled'}`}
        disabled={!isValidOTP}
        onClick={handleVerifyOTP}
      >
        Verify OTP
      </button>
    </div>
  );
};

export default OTPForm;
