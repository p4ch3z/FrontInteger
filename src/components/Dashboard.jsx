import React from 'react';
import '../styles/Dashboard.css';
import avatar from '../assets/react.svg'; // Cambia por un avatar real si tienes

const Dashboard = ({ titulo, expertoNombre, expertoRol, tarjetas }) => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">¡Bienvenidos!</h2>

      {/* <div className="dashboard-columns">
        {tarjetas.map((tarjeta, i) => (
          <div className="dashboard-card" key={i}>
            <h3 className="card-title">{tarjeta.titulo}</h3>
            <div className="card-content">{tarjeta.contenido}</div>
          </div>
        ))}

        {expertoNombre && (
          <div className="dashboard-card">
            <h3 className="card-title">Expertos</h3>
            <div className="card-content">
              <div className="expert-item">
                <img src={avatar} alt="avatar" className="avatar" />
                <div className="expert-info">
                  <span className="rol">{expertoRol}</span>
                  <span className="nombre">{expertoNombre}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Dashboard;
