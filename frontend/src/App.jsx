import React, { useState } from 'react';
import SignupForm from './components/SignupForm';
import OTPForm from './components/OTPForm';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="app-container">
      <div className="card-wrapper">
        {!otpSent ? (
          <SignupForm setOtpSent={setOtpSent} setEmail={setEmail} />
        ) : (
          <OTPForm email={email} />
        )}
      </div>
    </div>
  );
}

export default App;
