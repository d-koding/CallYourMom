// TODO: style the tolerance survey page
// TODO: Create a summary page to display user input after submission
// TODO: Enhance user input fields with more interactive elements

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './App.css'; // Import the app.css file

function Tolerance() {
  const [tolerance, setTolerance] = useState(5); // Default the slider to a mid-value of 5
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [ethnicity, setEthnicity] = useState('');

  // Initialize useNavigate hook
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement validation and backend integration
    alert(`Submitted with Tolerance: ${tolerance}, Weight: ${weight}, Height: ${height}, Age: ${age}, Ethnicity: ${ethnicity}`);
    // TODO: Navigate to a summary or thank you page
  };

  return (
    <div className="survey-container"> {/* Add survey-container class for styling */}
      <h2>Alcohol Tolerance Survey</h2>
      <form className="survey-form" onSubmit={handleSubmit}>
        <label>
          How would you rate your alcohol tolerance?
          <input type="range" min="1" max="10" value={tolerance} onChange={(e) => setTolerance(e.target.value)} />
          <span>{tolerance}</span>/10
        </label>
        <br />
        <label>
          Weight (kg):
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Enter your weight (optional)" />
        </label>
        <br />
        <label>
          Height (cm):
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Enter your height (optional)" />
        </label>
        <br />
        <label>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter your age (optional)" />
        </label>
        <br />
        <label>
          Ethnicity:
          <input type="text" value={ethnicity} onChange={(e) => setEthnicity(e.target.value)} placeholder="Enter your ethnicity (optional)" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Tolerance;
