import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './SignupForm.css';

const SignupForm = ({ setOtpSent, setEmail }) => {
  const [inputEmail, setInputEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus(); // Auto focus on mount
  }, []);

  const handleSendOTP = async () => {
    if (!inputEmail) return;
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/send-otp`, {
        email: inputEmail
      });
      Swal.fire('✅ OTP Sent!', res.data.message, 'success');
      setOtpSent(true);
      setEmail(inputEmail);
    } catch (err) {
      Swal.fire('❌ Error', err.response?.data?.error || 'Failed to send OTP', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSendOTP();
  };

  return (
    <div>
      <h2 className="signup-heading">Signup with Email OTP</h2>
      <label className="signup-label">Email Address</label>
      <input
        ref={inputRef}
        type="email"
        placeholder="you@example.com"
        className="signup-input"
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
        onKeyDown={handleKeyDown}
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
