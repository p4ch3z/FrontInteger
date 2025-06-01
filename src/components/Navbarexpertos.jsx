import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes limpiar tokens, sesión, etc.
    localStorage.clear(); // si usas tokens ahí
    navigate('/login');  // redirige al login
  };

  return (
    <div className="navbar">
      <div className="tabs">
      </div>

      <div className="user-info">
        <div className="avatar"></div>
        <span className="username">Experto</span>
        <button className="logout-btn" onClick={handleLogout}>🔒 Salir</button>
      </div>
    </div>
  );
};

export default Navbar;
