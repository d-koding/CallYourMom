import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './Login';
import TolerancePage from './Tolerance';
import NotFoundPage from './NotFoundPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LoginPage />} /> {/* Default route */}
          <Route exact path="/Tolerance" element={<TolerancePage />} /> {/* Initial Logins Route Here */}
          <Route path="*" element={<NotFoundPage />} /> {/* This route will be matched for any other route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

