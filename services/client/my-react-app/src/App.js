import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Login';
import TolerancePage from './Tolerance';
import NotFoundPage from './NotFoundPage';
import Register from './register';
import Main from './main';
import StartDrinking from './startDrinking';
import './App.css';

function App() {
  

  return (
    
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/tolerance" element={<TolerancePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/startDrinking" element={<StartDrinking />} />
          <Route path="/drinking" element={<Drinking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
