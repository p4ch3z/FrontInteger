import React, { useState } from 'react';
import CrearInvestigacion from '../components/CrearInvestigacion';
import EditarInvestigacion from '../components/EditarInvestigacion';
import ConfirmModal from '../components/ConfirmModal';
import '../styles/Investigaciones.css';

const Investigaciones = () => {
  const [investigaciones, setInvestigaciones] = useState([
    {
      nombre: "Hiato",
      brigada: "123123",
      fechaInicio: "2025-02-03",
      fechaFin: "2025-05-03",
      ubicacion: "6.674080638971185, -70.94430822381189",
      informeUrl: "#"
    }
  ]);

  const [crearVisible, setCrearVisible] = useState(false);
  const [editarVisible, setEditarVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const handleCreate = (nueva) => {
    setInvestigaciones([...investigaciones, nueva]);
    setCrearVisible(false);
  };

  const handleEdit = (editada) => {
    const actualizadas = investigaciones.map(inv =>
      inv.nombre === editData.nombre ? editada : inv
    );
    setInvestigaciones(actualizadas);
    setEditarVisible(false);
  };

  const handleDeleteConfirm = () => {
    setInvestigaciones(investigaciones.filter(inv => inv.nombre !== toDelete.nombre));
    setConfirmVisible(false);
    setToDelete(null);
  };

  return (
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
              <th>Brigada</th>
              <th>Fecha inicio</th>
              <th>Fecha Fin</th>
              <th>Ubicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {investigaciones.map((inv, index) => (
              <tr key={index}>
                <td>{inv.nombre}</td>
                <td>{inv.brigada}</td>
                <td>{inv.fechaInicio}</td>
                <td>{inv.fechaFin}</td>
                <td>{inv.ubicacion}</td>
                <td className="acciones-fila">
                  <a href={inv.informeUrl} className="informe-button">Informe</a>
                  <button
                    className="edit-button"
                    onClick={() => {
                      setEditData(inv);
                      setEditarVisible(true);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => {
                      setToDelete(inv);
                      setConfirmVisible(true);
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
          onCreate={handleCreate}
          onCancel={() => setCrearVisible(false)}
        />
      )}

      {editarVisible && editData && (
        <EditarInvestigacion
          data={editData}
          onUpdate={handleEdit}
          onCancel={() => setEditarVisible(false)}
        />
      )}

      {confirmVisible && toDelete && (
        <ConfirmModal
          mensaje={`¿Estás seguro de que deseas eliminar "${toDelete.nombre}"?`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => {
            setConfirmVisible(false);
            setToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default Investigaciones;
