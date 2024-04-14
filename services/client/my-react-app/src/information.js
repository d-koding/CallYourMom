import React from 'react';
import { useNavigate } from 'react-router-dom';
// import "./information.css";

function Information() {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/tolerance'); // Navigate to the 'tolerance' route
    };

    return (
        <div className="drinking-container">
            <h1>Informational Disclosure</h1>
            <p>
                One drink, as defined by the <b>National Institute of Alcohol Abuse and Alcoholism</b>, can look like:
                <br />
                <br />
                - One 12 fl oz of 5% beer
                <br />
                <br />
                - One 5 fl oz of 12% wine
                <br />
                <br />
                - One 1.5 fl oz shot of 40% liquor
                <br />
            </p>
            <button onClick={handleStart}>
                Next Page
            </button>
        </div>
    );
}

export default Information;
