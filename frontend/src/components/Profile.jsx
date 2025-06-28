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
      setName(username.charAt(0).toUpperCase() + username.slice(1));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img
          src={`https://ui-avatars.com/api/?name=${name}&background=7e22ce&color=fff&rounded=true&size=100`}
          alt="Avatar"
          className="avatar"
        />
        <h2 className="profile-name">{name}</h2>
        <p className="profile-email">{email}</p>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
