import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './SignupForm.css';
import { useNavigate } from 'react-router-dom';

const OTPForm = ({ email }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const isValidOTP = otp.length === 6 && /^\d+$/.test(otp);

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/verify-otp`, { email, otp });
      if (res.data.success) {
        Swal.fire('🎉 Verified', 'OTP matched successfully!', 'success');
        localStorage.setItem('userEmail', email);
        navigate('/profile');
      } else {
        Swal.fire('Invalid OTP ❌', res.data.error, 'error');
      }
    } catch (err) {
      Swal.fire('Error', err.response?.data?.error || 'Try again later', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && isValidOTP) handleVerifyOTP();
  };

  return (
    <div>
      <h2 className="signup-heading">Enter Your OTP</h2>
      <label className="signup-label">OTP</label>
      <input
        ref={inputRef}
        type="text"
        maxLength="6"
        placeholder="Enter 6-digit OTP"
        className="signup-input"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <button
        className={`signup-button green ${!isValidOTP || loading ? 'disabled' : ''}`}
        disabled={!isValidOTP || loading}
        onClick={handleVerifyOTP}
      >
        {loading ? <div className="spinner"></div> : 'Verify OTP'}
      </button>
    </div>
  );
};

export default OTPForm;
