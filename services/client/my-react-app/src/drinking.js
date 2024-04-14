import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './drinking.css'; // Ensure this is the correct path to your CSS file
// import report from './report.png';
// import emergencyContactLogo from './emergencyContactLogo.png'

function Drinking() {
    const navigate = useNavigate();
    const [drinkCount, setDrinkCount] = useState(0); // Initial drink count set to 0

    const handleIncrement = () => {
        setDrinkCount(prevCount => prevCount + 1); // Increment the drink count
    };

    const handleDecrement = () => {
        if (drinkCount > 0) {
            setDrinkCount(prevCount => prevCount - 1); // Decrement the drink count
        }
    };

    const handleStart = () => {
        // This might start some process or timer related to drinking
        navigate('/startDrinking'); // Navigate to the 'drinking' route
    };

    const contactRideShare = () => {
        console.log("Ride Share Services Requested"); // Placeholder for rideshare API
    };

    const contactEmergency = () => {
        console.log("Emergency Contacts Requested"); // Placeholder for emergency contact information pop-up
    };

    return (
        <div className="drinking-container">
            <h1>Drink Counter</h1>
            <div>
                <button className="button" onClick={handleIncrement}>+</button>
                <span className="drink-count">{drinkCount}</span>
                <button className="button" onClick={handleDecrement}>-</button>
            </div>
            <button onClick={handleStart} class="stop-button">Stop Drinking</button>
            <a href="https://www.uber.com/" className="corner-button right" onClick={contactEmergency}>Contact Ride Share</a>

            <button className="corner-button left" onClick={contactRideShare}>Emergency Contact</button>
        </div>
    );
}

export default Drinking;
