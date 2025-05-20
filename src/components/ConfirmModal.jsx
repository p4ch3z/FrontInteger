import React, { useEffect, useRef } from 'react';
import '../styles/FormInvestigacion.css';

const ConfirmModal = ({ mensaje, onConfirm, onCancel }) => {
  const modalRef = useRef();

  useEffect(() => {
    const escListener = (e) => e.key === 'Escape' && onCancel();
    window.addEventListener('keydown', escListener);
    return () => window.removeEventListener('keydown', escListener);
  }, [onCancel]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onCancel();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content" ref={modalRef}>
        <h2>Confirmar acción</h2>
        <p style={{ marginBottom: '20px' }}>{mensaje}</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button className="form-button" onClick={onConfirm}>Sí, eliminar</button>
          <button className="form-button cancel" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
