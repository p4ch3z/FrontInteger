import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Brigadas from './pages/Brigadas';
import Investigaciones from './pages/Investigaciones';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/brigadas" element={<Brigadas />} />
        <Route path="/investigaciones" element={<Investigaciones />} />
      </Routes>
    </div>
  );
};

export default App;
