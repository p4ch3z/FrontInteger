import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TarjetaInvestigacion.css'; // asegúrate de crear o renombrar este archivo si es necesario
import defaultAvatar from '../assets/react.svg'; 

const TarjetaInvestigacion = ({ nombre, descripcion, imagen }) => {
  const navigate = useNavigate();

  const irATareas = () => {
    const nombreSlug = nombre.toLowerCase().replace(/\s+/g, '-'); 
    navigate(`/tareas/${nombreSlug}`);
  };

  return (
    <div className="investigacion-card">
      <img src={imagen || defaultAvatar} alt="imagen investigacion" className="investigacion-avatar" />
      <h4 className="investigacion-nombre">{nombre}</h4>
      <p className="investigacion-descripcion">{descripcion}</p>
      <button className="tarea-btn" onClick={irATareas}>
        VER TAREAS
      </button>
    </div>
  );
};

export default TarjetaInvestigacion;