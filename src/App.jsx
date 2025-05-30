import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboardsup from './pages/DashboardSup';
import Dashboardjefe from './pages/Dashboardjefe';
import Brigadas from './pages/Brigadas';
import Investigaciones from './pages/Investigaciones';
import Login from './pages/login';
import Expertos from './pages/Expertos';
import GestionTareas from './pages/GestionTareas';
import GestionNovedades from './pages/GestionNovedades';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboardjefe" element={<Dashboardjefe />} />
        <Route path="/dashboardsup" element={<Dashboardsup />} />
        <Route path="/brigadas" element={<Brigadas />} />
        <Route path="/expertos" element={<Expertos />} />
        <Route path="/novedades" element={<GestionNovedades />} />
        <Route path="/investigaciones" element={<Investigaciones />} />
        <Route path="/tareas/:rol/:expertoCc" element={<GestionTareas />} />
      </Routes>
    </div>
  );
};

export default App;
