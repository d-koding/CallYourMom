import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./tolerance.css"; // Import your CSS file

function Tolerance() {
  const [tolerance, setTolerance] = useState(5); // This can be removed if not needed
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [results, setResults] = useState(null);  // To store and display results

  const navigate = useNavigate();

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
      // navigate('/summary'); // Navigate to a summary or thank you page if needed
    } catch (error) {
      console.error('Processing failed:', error);
      alert('Processing failed. Please try again later.');
    }
  };

  return (
    <div className="survey-container">
      <h2 className="survey-title">Alcohol Tolerance Survey</h2>
      <form className="survey-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="weight" className="form-label">Weight (kg):</label>
          <input 
            type="number" 
            id="weight" 
            className="form-input" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)} 
            placeholder="Enter your weight" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="height" className="form-label">Height (cm):</label>
          <input 
            type="number" 
            id="height" 
            className="form-input" 
            value={height} 
            onChange={(e) => setHeight(e.target.value)} 
            placeholder="Enter your height" 
            required 
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {results && (
        <div className="results">
          <p className="results-message">{results.message}</p>  {/* Display any message or result from the backend */}
        </div>
      )}
    </div>
  );
}

export default Tolerance;
