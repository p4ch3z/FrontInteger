import React, { useEffect, useRef, useState } from 'react';
import '../styles/FormularioTarea.css';

// const investigacionesMock = [
//   'Amazonía Verde',
//   'Bosques Andinos',
//   'Agua y Clima',
//   'Diversidad Faunística'
// ];

import { useQuery } from '@apollo/client';
import { GET_INVESTIGATIONS } from '../graphql/queries/investigacionTask/allInvestigation';

import { investiTaskClient } from '../graphql/apolloClient';

const FormularioNovedad = ({ modo = 'crear', datosIniciales = {}, onGuardar, onCancelar }) => {
  const { data: investigationData, loading, error } = useQuery(GET_INVESTIGATIONS, {
      client: investiTaskClient,
  });

  const [investigacionesMock, setInvestigacionesMock] = useState([]);

  useEffect(() => {
      if (investigationData && investigationData.allInvestigations) {
  
        const mapped = investigationData.allInvestigations.map(inv => ({
          id: inv.investigacionId,
          nombre: inv.nombre,
          brigada: 'N/A',
          fechaInicio: inv.fechaInicio,
          fechaFin: inv.fechaFin,
          ubicacion: inv.coordenadasGeograficas,
          informeUrl: "#",
          descripcion: "",
          defaultImagen: ""
        }));
        setInvestigacionesMock(mapped);
      }
  
    }, [investigationData]);
  

  const safeData = datosIniciales || {};
  const [nombre, setNombre] = useState(safeData.nombre || '');
  const [tipo, setTipo] = useState(safeData.tipo || '');
  // const [descripcion, setDescripcion] = useState(safeData.descripcion || '');
  const [comentario, setComentario] = useState(safeData.comentario || '');
  const [investigacion, setInvestigacion] = useState(safeData.investigacion || '');
  // const [archivos, setArchivos] = useState([]);
  // const [vistasPrevias, setVistasPrevias] = useState([]);
  const modalRef = useRef();

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onCancelar();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onCancelar]);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onCancelar();
    }
  };

  const handleArchivosChange = (e) => {
    const files = Array.from(e.target.files);
    setArchivos(files);

    const nuevasVistas = [];
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          nuevasVistas.push({ name: file.name, url: reader.result });
          if (nuevasVistas.length === files.filter(f => f.type.startsWith('image/')).length) {
            setVistasPrevias(nuevasVistas);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const eliminarArchivo = (nombreArchivo) => {
    setArchivos(prev => prev.filter(file => file.name !== nombreArchivo));
    setVistasPrevias(prev => prev.filter(img => img.name !== nombreArchivo));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(investigacion);
    const nuevaNovedad = {
      nombre,
      comentario,
      investigacionId: investigacion,
    };

    onGuardar(nuevaNovedad);
  };

  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div className="modal-content" ref={modalRef}>
        <h2>{modo === 'editar' ? 'EDITAR NOVEDAD' : 'CREAR NOVEDAD'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre de la novedad</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
{/* 
          <label>Tipo</label>
          <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} required /> */}

          {/* <label>Descripción</label>
          <textarea rows="3" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required /> */}

          <label>Comentarios</label>
          <textarea rows="2" value={comentario} onChange={(e) => setComentario(e.target.value)} />

          <label>Investigación</label>
          <select value={investigacion} onChange={(e) => setInvestigacion(e.target.value)} required>
            <option value="">-- Selecciona una investigación --</option>
            {investigacionesMock.map((inv, i) => (
              <option key={i} value={inv.id}>{inv.nombre}</option>
            ))}
          </select>

          {/* <label>Archivos multimedia</label>
          <input type="file" multiple accept="image/*,application/pdf,video/*" onChange={handleArchivosChange} /> */}

          {/* {vistasPrevias.length > 0 && (
            <div className="imagenes-grid">
              {vistasPrevias.map((img, i) => (
                <div key={i} className="imagen-item">
                  <img src={img.url} alt={img.name} />
                  <span>{img.name}</span>
                  <button type="button" className="archivo-eliminar" onClick={() => eliminarArchivo(img.name)}>❌</button>
                </div>
              ))}
            </div>
          )} */}

          {/* {archivos.length > 0 && (
            <ul className="archivo-lista">
              {archivos
                .filter(file => !file.type.startsWith('image/'))
                .map((file, i) => (
                  <li key={i}>
                    {file.name}
                    <button type="button" className="archivo-eliminar" onClick={() => eliminarArchivo(file.name)}>❌</button>
                  </li>
              ))}
            </ul>
          )} */}

          <button type="submit" className="form-button">
            {modo === 'editar' ? 'EDITAR' : 'CREAR'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioNovedad;
