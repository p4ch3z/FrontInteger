import React, { useState } from 'react';
import CrearBrigada from '../components/CrearBrigada';
import EditarBrigada from '../components/EditarBrigada';
import '../styles/Brigadas.css';

const Brigadas = () => {
  const [brigadas, setBrigadas] = useState([
    {
      id: '1231231',
      jefe: 'Paola',
      botanico: 'Pache',
      auxiliar: 'Diego',
      coinvestigadores: ['Arley', 'Ricardo']
    }
  ]);

  const [crearVisible, setCrearVisible] = useState(false);
  const [editarVisible, setEditarVisible] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleCrear = (nueva) => {
    setBrigadas([...brigadas, { ...nueva, id: Date.now().toString() }]);
    setCrearVisible(false);
  };

  const handleEditar = (editada) => {
    setBrigadas(brigadas.map(b => b.id === editData.id ? editada : b));
    setEditarVisible(false);
  };

  return (
    <div className="brigadas-container">
      <h2 className="title">Gestión de Brigadas</h2>
    <div className='table-wrapper'>
    <div className="table-controls">
        <button onClick={() => setCrearVisible(true)} className="icon-button">➕</button>
    </div>

      <table className="brigadas-table">
        <thead>
          <tr>
            <th>ID</th>
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
    </div>
    </div>
  );
};

export default Brigadas;
