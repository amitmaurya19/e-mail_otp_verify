import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function SignupForm({ setOtpSent, setEmail }) {
  const [inputEmail, setInputEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/send-otp`, {
        email: inputEmail,
      });
      setEmail(inputEmail);
      setOtpSent(true);

      Swal.fire({
        title: 'OTP Sent!',
        text: `OTP has been sent to ${inputEmail}`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to send OTP. Please try again.',
        icon: 'error',
        confirmButtonText: 'Retry',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
        required
      />
      <button type="submit">Send OTP</button>
    </form>
  );
}

export default SignupForm;
