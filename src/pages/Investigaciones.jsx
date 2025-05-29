import React, { useState } from 'react';
import CrearInvestigacion from '../components/CrearInvestigacion';
import EditarInvestigacion from '../components/EditarInvestigacion';
import ModalConfirmacion from '../components/ConfirmModal';
import Navbarsup from '../components/Navbarsup';
import '../styles/Investigaciones.css';

const Investigaciones = () => {
  const [investigaciones, setInvestigaciones] = useState([
    {
      id: '1',
      nombre: "Hiato",
      fechaInicio: "3 de febrero 2025",
      fechaFin: "3 de mayo 2025",
      ubicacion: "6.674080638971185, -70.94430822381189",
      informeUrl: "#"
    }
  ]);

  const [crearVisible, setCrearVisible] = useState(false);
  const [editarVisible, setEditarVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const [eliminarVisible, setEliminarVisible] = useState(false);
  const [idEliminar, setIdEliminar] = useState(null);

  const handleCrear = (nueva) => {
    setInvestigaciones([...investigaciones, { ...nueva, id: Date.now().toString() }]);
    setCrearVisible(false);
  };

  const handleEditar = (editada) => {
    setInvestigaciones(investigaciones.map(i => i.id === editData.id ? { ...i, ...editada } : i));
    setEditarVisible(false);
  };

  const handleEliminar = () => {
    setInvestigaciones(prev => prev.filter(i => i.id !== idEliminar));
    setEliminarVisible(false);
  };

  return (
    <div className='nav'>
    <Navbarsup />
    <div className="investigaciones-container">
      <h2 className="title">Gestión de Investigaciones</h2>

      <div className="table-wrapper">
        <div className="table-controls">
          <button className="icon-button" onClick={() => setCrearVisible(true)}>➕</button>
        </div>

        <table className="investigaciones-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha inicio</th>
              <th>Fecha fin</th>
              <th>Ubicación</th>
              <th>Informe</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {investigaciones.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.nombre}</td>
                <td>{inv.fechaInicio}</td>
                <td>{inv.fechaFin}</td>
                <td>{inv.ubicacion}</td>
                <td>
                  <a href={inv.informeUrl} className="informe-button" target="_blank" rel="noreferrer">
                    Ver informe
                  </a>
                </td>
                <td>
                  <button
                    className="estado-btn"
                    onClick={() => {
                      setEditData(inv);
                      setEditarVisible(true);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="estado-btn"
                    onClick={() => {
                      setIdEliminar(inv.id);
                      setEliminarVisible(true);
                    }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {crearVisible && (
        <CrearInvestigacion
          onCreate={handleCrear}
          onCancel={() => setCrearVisible(false)}
        />
      )}

      {editarVisible && editData && (
        <EditarInvestigacion
          data={editData}
          onUpdate={handleEditar}
          onCancel={() => setEditarVisible(false)}
        />
      )}

      {eliminarVisible && (
        <ModalConfirmacion
          mensaje="¿Estás seguro de eliminar esta investigación?"
          onConfirm={handleEliminar}
          onCancel={() => setEliminarVisible(false)}
        />
      )}
    </div>
    </div>
  );
};

export default Investigaciones;
