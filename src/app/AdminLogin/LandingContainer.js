import React from 'react';
import './LandingContainer.css';  // اگر نیاز به استایل‌های خاص دارید

const LandingContainer = ({ children }) => {
  return (
    <div className="landing-container">
      {children}
    </div>
  );
};

export default LandingContainer;
