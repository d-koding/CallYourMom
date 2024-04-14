import React from 'react';
import { useNavigate } from 'react-router-dom';
import './drinking.css'; // Make sure this is the correct path to your CSS file

function Drinking() {
    const navigate = useNavigate();

    const handleStart = () => {
        // Define what happens when the user clicks on "Start Drinking"
        navigate('/drinking'); // Navigate to the 'start-drinking' route or whatever is appropriate
    };
    
    return (

    );
    }
    
    export default StartDrinking;