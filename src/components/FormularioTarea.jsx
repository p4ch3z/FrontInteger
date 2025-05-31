import React, { useEffect, useRef, useState } from 'react';
import '../styles/FormularioTarea.css';

const FormularioTarea = ({
  modo = 'asignar',
  datosIniciales = {},
  onGuardar,
  onCancelar,
  listaExpertos = [] // Debes pasar esta lista desde el padre
}) => {
  console.log(datosIniciales);
  

  const safeData = datosIniciales || {};
  console.log(safeData);
  
  const [nombre, setNombre] = useState(safeData.nombre || '');
  const [descripcion, setDescripcion] = useState(safeData.descripcion || '');
  const [experto, setExperto] = useState(safeData.experto || ''); // Nuevo estado
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar({ nombre, descripcion, experto });
  };

  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div className="modal-content" ref={modalRef}>
        <h2>{modo === 'editar' ? 'EDITAR TAREA' : 'ASIGNAR TAREA'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre de tarea</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label>Descripción</label>
          <textarea
            rows="4"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />

          <label>Asignar experto</label>
          <select value={experto} onChange={(e) => setExperto(e.target.value)} required>
            <option value="" disabled>Seleccione un experto</option>
            {listaExpertos.map((exp) => (
              <option key={exp.cc} value={exp.cc}>
                {exp.nombre} ({exp.cc})
              </option>
            ))}
          </select>

          <button type="submit" className="form-button">
            {modo === 'editar' ? 'EDITAR' : 'ASIGNAR'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioTarea;
