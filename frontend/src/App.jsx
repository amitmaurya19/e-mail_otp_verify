import React, { useState } from 'react';
import SignupForm from './components/SignupForm';
import OTPForm from './components/OTPForm';

function App() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      {!otpSent ? (
        <SignupForm setOtpSent={setOtpSent} setEmail={setEmail} />
      ) : (
        <OTPForm email={email} />
      )}
    </div>
  );
}

export default App;
