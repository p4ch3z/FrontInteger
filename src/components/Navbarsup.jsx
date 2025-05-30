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
        <NavLink to="/dashboardsup" className={({ isActive }) => isActive ? "tab active" : "tab"}>Inicio</NavLink>
        <NavLink to="/brigadas" className={({ isActive }) => isActive ? "tab active" : "tab"}>Brigadas</NavLink>
        <NavLink to="/investigaciones" className={({ isActive }) => isActive ? "tab active" : "tab"}>Investigaciones</NavLink>
      </div>

      <div className="user-info">
        <div className="avatar"></div>
        <span className="username">Supervisor</span>
        <button className="logout-btn" onClick={handleLogout}>🔒 Salir</button>
      </div>
    </div>
  );
};

export default Navbar;
