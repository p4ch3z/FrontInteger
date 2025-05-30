import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TarjetaExperto.css';
import defaultAvatar from '../assets/react.svg';

const TarjetaExperto = ({ rol, nombre, avatar, expertoCc }) => {
  const navigate = useNavigate();

  console.log(expertoCc);
  

  const irATareas = () => {
    const rolSlug = rol.toLowerCase().replace(/\s+/g, '-'); // ejemplo: "JEFE DE BRIGADA" -> "jefe-de-brigada"
    navigate(`/tareas/${rolSlug}/${expertoCc}`);
  };

  return (
    <div className="expert-card">
      <img src={avatar || defaultAvatar} alt="avatar" className="expert-avatar" />
      <h4 className="expert-rol">{rol}</h4>
      <p className="expert-nombre">{nombre}</p>
      <button className="tarea-btn" onClick={irATareas}>
        VER TAREAS
      </button>
    </div>
  );
};

export default TarjetaExperto;
