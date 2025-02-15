import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SmartSidurPage from './components/SmartSidurPage';

const App = () => {
  return (
    <Router>
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/smartsidur" element={<SmartSidurPage />} />
  </Routes>
</Router>
  );
};

export default App;
