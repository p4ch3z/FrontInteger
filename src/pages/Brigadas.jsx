import React, { useState } from 'react';
import CrearBrigada from '../components/CrearBrigada';
import EditarBrigada from '../components/EditarBrigada';
import ConfirmModal from '../components/ConfirmModal';
import Navbarsup from '../components/Navbarsup';
import '../styles/Brigadas.css';

const Brigadas = () => {
  const [brigadas, setBrigadas] = useState([
    {
      id: '1231231',
      investigacion: 'investigacion 1',
      jefe: 'Paola',
      botanico: 'Pache',
      auxiliar: 'Diego',
      coinvestigadores: ['Arley', 'Ricardo']
    }
  ]);

  const [crearVisible, setCrearVisible] = useState(false);
  const [editarVisible, setEditarVisible] = useState(false);
  const [editData, setEditData] = useState(null);

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const handleCrear = (nueva) => {
    setBrigadas([...brigadas, { ...nueva, id: Date.now().toString() }]);
    setCrearVisible(false);
  };

  const handleEditar = (editada) => {
    setBrigadas(brigadas.map(b => b.id === editData.id ? editada : b));
    setEditarVisible(false);
  };

  const handleEliminar = (id) => {
    setToDeleteId(id);
    setConfirmVisible(true);
  };

  const confirmarEliminar = () => {
    setBrigadas(prev => prev.filter(b => b.id !== toDeleteId));
    setToDeleteId(null);
    setConfirmVisible(false);
  };

  return (
    <div className='nav'>
    <Navbarsup />
    <div className="brigadas-container">
      <h2 className="title">Gestión de Brigadas</h2>
      <div className="table-wrapper">
        <div className="table-controls">
          <button onClick={() => setCrearVisible(true)} className="add-button">➕</button>
        </div>
        <table className="brigadas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Investigacion</th>
              <th>Jefe de brigada</th>
              <th>Botanico</th>
              <th>Auxiliar</th>
              <th>Co-investigadores</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {brigadas.map((b, i) => (
              <tr key={i}>
                <td>{b.id}</td>
                <td>{b.investigacion}</td>
                <td>{b.jefe}</td>
                <td>{b.botanico}</td>
                <td>{b.auxiliar}</td>
                <td>{b.coinvestigadores.join(', ')}</td>
                <td className="acciones">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditData(b);
                      setEditarVisible(true);
                    }}
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleEliminar(b.id)}
                    title="Eliminar"
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
        <CrearBrigada
          onCreate={handleCrear}
          onCancel={() => setCrearVisible(false)}
        />
      )}

      {editarVisible && editData && (
        <EditarBrigada
          data={editData}
          onUpdate={handleEditar}
          onCancel={() => setEditarVisible(false)}
        />
      )}

      {confirmVisible && (
        <ConfirmModal
          mensaje="¿Estás seguro de que deseas eliminar esta brigada?"
          onConfirm={confirmarEliminar}
          onCancel={() => {
            setConfirmVisible(false);
            setToDeleteId(null);
          }}
        />
      )}
    </div>
    </div>
  );
};

export default Brigadas;
