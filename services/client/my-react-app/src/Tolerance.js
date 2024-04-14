import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './tolerance.css';

function Tolerance() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [results, setResults] = useState(null); // To store and display results
  const [submitted, setSubmitted] = useState(false); // State to control form display

  const navigate = useNavigate();

  const resultMessageStyle = {
    color: '#643A99', // Use a contrasting color if needed
    fontSize: '32px', // Significantly larger font size
    fontWeight: 'bold', // Optional: make it bold for better visibility
    padding: '20px', // Provide some padding if necessary
    wordBreak: 'break-word' // Ensure long words do not overflow the container
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!weight && !height) {
      alert('Please enter at least weight or height to proceed.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/process-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ weight, height })
      });

      if (!response.ok) throw new Error('Failed to process data');
      
      const resultData = await response.json();
      setResults(resultData);
      setSubmitted(true); // Update state to indicate form has been processed
    } catch (error) {
      console.error('Processing failed:', error);
      alert('Processing failed. Please try again later.');
    }
  };

  const handleNextClick = () => {
    navigate('/main'); // Navigate to the /main route on button click
  };
const resultStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#643A99', // Assuming this is the purple background color from the image
    color: 'white',
    fontSize: '24px',
    fontFamily: 'sans-serif', // Change as per your font
    textAlign: 'center',
    padding: '20px'
  };

  const resultBoxStyle = {
    width: '80%', // Adjust as needed
    height: '100px', // Adjust as needed
    backgroundColor: 'white',
    margin: '20px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px' // Adjust as needed for rounded corners
  };

  const nextButtonStyle = {
    padding: '10px 25px',
    fontSize: '20px',
    color: '#643A99',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer'
  };

  if (submitted) {
    return (
      <div style={resultStyle}>
        <p>your recommended drink maximum is:</p>
        <div style={resultBoxStyle}>
          {results && <p style={resultMessageStyle}>{results.message}</p>} {/* Ensure this line is correct */}
        </div>
        <button style={nextButtonStyle} onClick={handleNextClick}>
          &gt;
        </button>
      </div>
    );
  }

  return (
    <div className="survey-container">
      <h2>Biological data can also help us calculate safe drinking practices</h2>
      <form className="survey-form" onSubmit={handleSubmit}>
        {/* Removed Age and Race inputs as per your request */}
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight..."
            required
          />
        </label>
        <label>
          Height (cm):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter your height..."
            required
          />
        </label>
        <button type="submit">&gt;</button>
      </form>
    </div>
  );
}

export default Tolerance;
