import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Login';
import TolerancePage from './Tolerance';
import NotFoundPage from './NotFoundPage';

function App() {
  const [data, setData] = useState([]); // Start with an empty array

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => {
        if (res.ok) {
          return res.json(); // Parse JSON only if response is ok
        }
        throw new Error('Network response was not ok.'); // Throw error on bad response
      })
      .then(data => {
        setData(data.users); // Update state with fetched users
        console.log(data.users);
      })
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }, []); // Empty dependency array means this effect will only run once after the initial render

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/tolerance" element={<TolerancePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
