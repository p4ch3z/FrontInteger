import React from 'react';
import Dashboard from '../components/Dashboard';
import Navbarjefe from '../components/Navbarjefe';

const DashboardJefe = () => {
  const tarjetas = [
    { titulo: 'Mis tareas', contenido: <p>3 tareas asignadas</p> },
    { titulo: 'Notas de campo', contenido: <p>2 actualizadas</p> }
  ];

  return (
    <div className="nav">
      <Navbarjefe />
      <Dashboard
        titulo="Dashboard Jefe de Brigada"
        expertoNombre="Juan Pérez"
        expertoRol="Jefe"
        tarjetas={tarjetas}
      />
    </div>
  );
};

export default DashboardJefe;
