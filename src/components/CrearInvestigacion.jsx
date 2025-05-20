import React, { useState, useEffect, useRef } from 'react';
import '../styles/FormInvestigacion.css';

const CrearInvestigacion = ({ onCreate, onCancel }) => {
  const [form, setForm] = useState({
    nombre: '',
    brigada: '',
    fechaInicio: '',
    fechaFin: '',
    ubicacion: '',
  });

  const modalRef = useRef();

  const brigadas = ['12312312', '345345', '123123', '345345345', '34534', '234234'];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(form);
  };

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  // Cerrar al hacer clic fuera del modal
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onCancel();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content" ref={modalRef}>
        <h2>CREAR INVESTIGACION</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre de la investigacion</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required />

          <label>Brigada</label>
          <select name="brigada" value={form.brigada} onChange={handleChange} required>
            <option value="">Seleccionar</option>
            {brigadas.map((b, i) => (
              <option key={i} value={b}>{b}</option>
            ))}
          </select>

          <label>Fecha inicio</label>
          <input type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} required />

          <label>Fecha fin</label>
          <input type="date" name="fechaFin" value={form.fechaFin} onChange={handleChange} required />

          <label>Ubicacion (X, Y)</label>
          <input name="ubicacion" value={form.ubicacion} onChange={handleChange} required />

          <button type="submit" className="form-button">CREAR</button>
          <button type="button" className="form-button cancel" onClick={onCancel}>CANCELAR</button>
        </form>
      </div>
    </div>
  );
};

export default CrearInvestigacion;
