import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import TolerancePage from './Tolerance';
import LoginPage from './Login';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import ContactsPage from './ContactsPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LoginPage />} /> {/* Default route */}
          <Route path="/Tolerance" element={<TolerancePage />} />
          <Route path="/Contacts" element={<ContactsPage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} /> {/* This route will be matched for any other route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

