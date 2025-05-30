import React from 'react';
import '../styles/Investigaciones.css'; // asegúrate de que este archivo exista
import Navbarjefe from '../components/Navbarjefe';
import TarjetaInvestigacion from '../components/TarjetaInvestigacion';
import defaultImagen from '../assets/react.svg'; // usa una imagen representativa de investigación

// Lista de investigaciones (puedes reemplazar con datos reales)
const investigaciones = [
  { nombre: 'Amazonas Norte', descripcion: 'Estudio de biodiversidad y clima.' },
  { nombre: 'Ciénaga de Zapatosa', descripcion: 'Investigación en ecosistemas acuáticos.' },
  { nombre: 'Paramo de Santurbán', descripcion: 'Evaluación de flora endémica.' },
  { nombre: 'Serranía de la Macarena', descripcion: 'Diversidad genética de especies.' }
];

const Investigaciones = () => {
  return (
    <div className='nav'>
      <Navbarjefe />
      <div className="investigaciones-container">
        <h2 className="investigaciones-title">Investigaciones</h2>
        <div className="investigaciones-grid">
          {investigaciones.map((inv, i) => (
            <TarjetaInvestigacion
              key={i}
              nombre={inv.nombre}
              descripcion={inv.descripcion}
              imagen={defaultImagen}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Investigaciones;

