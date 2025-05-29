import React, { useEffect, useRef } from 'react';
import '../styles/FormularioTarea.css';

const ModalEstado = ({ estadoActual, onSeleccion, onCancelar }) => {
  const ref = useRef();
  const opciones = ['Pendiente', 'En curso', 'Completada'];

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onCancelar();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onCancelar]);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      onCancelar();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content estado-modal" ref={ref}>
        <h2>Cambiar Estado</h2>
        <div className="estado-opciones">
          {opciones.map((op) => (
            <button
              key={op}
              className={`estado-opcion ${op === estadoActual ? 'activo' : ''}`}
              onClick={() => onSeleccion(op)}
              disabled={op === estadoActual}
            >
              {op} {op === estadoActual && '✔️'}
            </button>
          ))}
        </div>
        <button className="form-button cancel" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ModalEstado;
