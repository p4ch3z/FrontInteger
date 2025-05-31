import React, { useState } from 'react';
import '../styles/GestionNovedades.css';
import FormularioNovedad from '../components/FormularioNovedad';
import Navbarjefe from '../components/Navbarjefe';

const GestionNovedades = () => {
  const [novedades, setNovedades] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [modo, setModo] = useState('crear');
  const [datosNovedad, setDatosNovedad] = useState(null);

  const handleGuardarNovedad = (nuevaNovedad) => {
    const novedadConFecha = {
      ...nuevaNovedad,
      fecha: new Date().toLocaleDateString()
    };

    if (modo === 'editar' && datosNovedad?.index !== undefined) {
      const nuevas = [...novedades];
      nuevas[datosNovedad.index] = { ...nuevas[datosNovedad.index], ...novedadConFecha };
      setNovedades(nuevas);
    } else {
      setNovedades([...novedades, novedadConFecha]);
    }

    setFormVisible(false);
  };

  const handleEliminarNovedad = (index) => {
    const nuevas = novedades.filter((_, i) => i !== index);
    setNovedades(nuevas);
  };

  return (
    <div className='nav'>
      <Navbarjefe />
      <div className="gestion-container">
        <h2>Novedades</h2>

        <div className="table-wrapper">
          <div className="table-controls">
            <button
              onClick={() => {
                setModo('crear');
                setDatosNovedad(null);
                setFormVisible(true);
              }}
              className="icon-button"
            >
              ➕
            </button>
          </div>

          <table className="novedades-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Investigación</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th>Comentarios</th> 
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {novedades.map((n, i) => (
                <tr key={i}>
                  <td>{n.nombre}</td>
                  <td>{n.investigacion || '—'}</td> 
                  <td>{n.tipo}</td>
                  <td>{n.descripcion}</td>
                  <td>{n.fecha}</td>
                  <td>{n.comentarios}</td>
                  <td>
                    <button
                      className="estado-btn"
                      onClick={() => {
                        setModo('editar');
                        setDatosNovedad({ ...n, index: i });
                        setFormVisible(true);
                      }}
                    >✏️</button>
                    <button
                      className="estado-btn"
                      onClick={() => handleEliminarNovedad(i)}
                    >🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {formVisible && (
          <FormularioNovedad
            modo={modo}
            datosIniciales={datosNovedad}
            onGuardar={handleGuardarNovedad}
            onCancelar={() => setFormVisible(false)}
          />
        )}
      </div>
    </div>
  );
};

export default GestionNovedades;
