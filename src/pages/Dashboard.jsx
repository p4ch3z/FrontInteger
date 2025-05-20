import React from 'react';
import '../styles/Dashboard.css';
import avatar from '../assets/react.svg'; // Usa tu imagen real o avatar placeholder

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard supervisor</h2>

      <div className="dashboard-columns">
        <div className="dashboard-card">
          <h3 className="card-title">Tareas activas</h3>
          <div className="card-content">
            {/* Aquí van las tareas activas */}
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="card-title">Expertos</h3>
          <div className="card-content">
            <div className="expert-item">
              <img src={avatar} alt="avatar" className="avatar" />
              <div className="expert-info">
                <span className="rol">Jefe de brigada</span>
                <span className="nombre">Paola Balaguera</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="card-title">Novedades</h3>
          <div className="card-content">
            {/* Aquí van novedades */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
