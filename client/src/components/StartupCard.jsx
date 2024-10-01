import React from 'react';
import '../styles/startupCard.css';

const StartupCard = ({ startup }) => {
  return (
    <div className="startup-card">
      <h3 className="startup-name">{startup.name}</h3>
      <p className="startup-category">Category: {startup.ayushCategory}</p>
      <p className="startup-description">{startup.businessDescription}</p>
    </div>
  );
};

export default StartupCard;