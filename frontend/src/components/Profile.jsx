import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      navigate('/');
    } else {
      setEmail(userEmail);
      const [username] = userEmail.split('@');
      const formatted = username
        .replace(/[^a-zA-Z]/g, ' ')
        .split(' ')
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setName(formatted || username);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="letter-avatar">
          {email?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <h2 className="profile-name">{name}</h2>
        <p className="profile-email">{email}</p>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
