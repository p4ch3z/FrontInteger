import React from 'react';
import '../styles/Dashboard.css';
import avatar from '../assets/react.svg'; // Usa tu imagen real o avatar placeholder
import Navbarsup from '../components/Navbarsup';
const Dashboard = () => {
  
  return (
    <div className='nav'>
    <Navbarsup />
    <div className="dashboard-container">
      <h2 className="dashboard-title">¡Bienvenidos!</h2>

      {/* <div className="dashboard-columns">
        <div className="dashboard-card">
          <h3 className="card-title">Tareas activas</h3>
          <div className="card-content">
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
          </div>
        </div>
      </div> */}
    </div>
    </div>
  );
};

export default Dashboard;
