import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
    <div className="tabs">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "tab active" : "tab"}>Dashboard</NavLink>
        <NavLink to="/brigadas" className={({ isActive }) => isActive ? "tab active" : "tab"}>Brigadas</NavLink>
        <NavLink to="/investigaciones" className={({ isActive }) => isActive ? "tab active" : "tab"}>Investigaciones</NavLink>
    </div>
    <div className="user-info">
        <div className="avatar"></div>
        <span className="username">Paola Balaguera</span>
    </div>
    </div>
  );
};

export default Navbar;
