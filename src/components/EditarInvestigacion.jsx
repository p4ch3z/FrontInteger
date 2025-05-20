import React, { useState } from 'react';
import '../styles/FormInvestigacion.css';

const EditarInvestigacion = ({ data, onUpdate, onCancel }) => {
  const [form, setForm] = useState({ ...data });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
  };

  return (
    <div className="form-card">
      <h2>EDITAR INVESTIGACION</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre de la investigacion</label>
        <input name="nombre" value={form.nombre} onChange={handleChange} required />

        <label>Fecha inicio</label>
        <input type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} required />

        <label>Fecha fin</label>
        <input type="date" name="fechaFin" value={form.fechaFin} onChange={handleChange} required />

        <label>Ubicacion (X, Y)</label>
        <input name="ubicacion" value={form.ubicacion} onChange={handleChange} required />

        <button type="submit" className="form-button">EDITAR</button>
        <button type="button" className="form-button cancel" onClick={onCancel}>CANCELAR</button>
      </form>
    </div>
  );
};

export default EditarInvestigacion;
