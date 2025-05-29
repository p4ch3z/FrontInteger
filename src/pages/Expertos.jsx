import React from 'react';
import '../styles/Expertos.css';
import avatar from '../assets/react.svg'; // Cambia por tu imagen real
import Navbarjefe from '../components/Navbarjefe';
import TarjetaExperto from '../components/TarjetaExperto';

const expertos = [
  { rol: 'JEFE DE BRIGADA', nombre: 'Paola Balaguera' },
  { rol: 'AUXILIAR TECNICO', nombre: 'Paola Balaguera' },
  { rol: 'BOTANICO', nombre: 'Paola Balaguera' },
  { rol: 'CO-INVESTIGADORES', nombre: 'Paola Balaguera' },
  { rol: 'CO-INVESTIGADORES', nombre: 'Paola Balaguera' }
];

const Expertos = () => {
  return (
    <div className='nav'>
    <Navbarjefe />
     <div className="expertos-container">
      <h2 className="expertos-title">Expertos</h2>
      <div className="expertos-grid">
        {expertos.map((exp, i) => (
          <TarjetaExperto
            key={i}
            rol={exp.rol}
            nombre={exp.nombre}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Expertos;
