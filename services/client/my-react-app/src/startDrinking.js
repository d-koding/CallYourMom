import React from 'react';
import { useNavigate } from 'react-router-dom';
import './startDrinking.css'; // Make sure this is the correct path to your CSS file
import logo from './logo.png';

function StartDrinking() {
  const navigate = useNavigate();

  const handleStart = () => {
    // Define what happens when the user clicks on "Start Drinking"
    navigate('/start-drinking'); // Navigate to the 'start-drinking' route or whatever is appropriate
  };

  return (
    <div className="start-page-container">
      <div className="beverage-icon-container">
        {/* Replace "beverage-icon.png" with the actual path to your image */}
        <img src={logo} alt="Beverage" className="beverage-icon" />
      </div>
      <button onClick={handleStart} className="start-button">Start Drinking</button>
      <div className="navigation-bar">
        {/* Replace icon paths with the actual paths to your images */}
        
      </div>
    </div>
  );
}

export default StartDrinking;
