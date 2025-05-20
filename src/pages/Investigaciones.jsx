import React, { useState } from 'react';
import CrearInvestigacion from '../components/CrearInvestigacion';
import EditarInvestigacion from '../components/EditarInvestigacion';
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

  return (
    <div className="investigaciones-container">
      <h2 className="title">Gestión de Investigaciones</h2>

      <div className="table-wrapper">
        <div className="table-controls">
          <button className="icon-button" onClick={() => setCrearVisible(true)}>➕</button>
          <button
            className="icon-button"
            onClick={() => {
              setEditData(investigaciones[0]); // puedes cambiar por el seleccionado
              setEditarVisible(true);
            }}
          >
            ✏️
          </button>
        </div>

        <table className="investigaciones-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Brigada</th>
              <th>Fecha inicio</th>
              <th>Fecha Fin</th>
              <th>Ubicación</th>
              <th>Informe</th>
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
                <td>
                  <a href={inv.informeUrl} className="informe-button">Informe</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formularios */}
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
    </div>
  );
};

export default Investigaciones;
