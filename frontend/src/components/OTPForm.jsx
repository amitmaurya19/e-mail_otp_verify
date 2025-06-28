import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function OTPForm({ email }) {
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/verify-otp`, {
        email,
        otp,
      });

      if (res.data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'OTP Verified Successfully 🎉',
          icon: 'success',
          confirmButtonText: 'Continue',
        });
        // Optional: Redirect or do something here
      }
    } catch (err) {
      Swal.fire({
        title: 'Invalid OTP 😢',
        text: 'Please try again.',
        icon: 'error',
        confirmButtonText: 'Retry',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Verify OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />
      <button type="submit">Verify</button>
    </form>
  );
}

export default OTPForm;
