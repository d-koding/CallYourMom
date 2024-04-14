import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './startDrinking.css'; // Make sure this is the correct path to your CSS file
import logo from './logo.png';

function StartDrinking() {
  const navigate = useNavigate();
  const [showBubble, setShowBubble] = useState(false);

  const handleStart = () => {
    navigate('/drinking'); // Navigate to the 'start-drinking' route or whatever is appropriate
    setShowBubble(true); // Trigger the bubble to show up when the button is clicked
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 1000); // delay the bubble appearance by 1000 milliseconds after page load
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="start-page-container">
      <div className="beverage-icon-container">
        <img src={logo} alt="Beverage" className="beverage-icon" />
      </div>
      <button onClick={handleStart} className="start-button">Start Drinking</button>
      <div className="navigation-bar">
        {/* Navigation icons or elements */}
      </div>
      {showBubble && (
        <div className="slide-in-bubble">
          All done! <br />
          {/* Additional text can go here */}
          Remember to drink responsibly and with friends!
        </div>
      )}
    </div>
  );
}

export default StartDrinking;
