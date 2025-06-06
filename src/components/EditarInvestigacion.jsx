import React, { useState, useEffect, useRef } from 'react';
import '../styles/FormInvestigacion.css';

import { UPDATE_INVESTIGATION } from '../graphql/mutations/investigationTask/updateInvestigation';
import { useMutation } from '@apollo/client';

import { investiTaskClient } from '../graphql/apolloClient';

const EditarInvestigacion = ({ data, onUpdate, onCancel }) => {
  const [form, setForm] = useState({ ...data });
  const modalRef = useRef();

  const [updateInvestigation] = useMutation(UPDATE_INVESTIGATION, {
      client: investiTaskClient,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    const variables = {
      fechaInicio: form.fechaInicio,
      fechaFin: form.fechaFin,
      coordenadasGeograficas: form.ubicacion,
      nombre: form.nombre,
      investigacionId: Number(form.id),
    };
    
    try {
      const { data } = await updateInvestigation({ variables });
      console.log('Investigación creada:', data);
      onUpdate(data.updateInvestigation.investigacion);
    } catch (error) {
      console.error('GraphQL error:', error.graphQLErrors);
      console.error('Network error:', error.networkError);
      alert('Error al editar la investigación. Revisa los datos e intenta nuevamente.');
    }

  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onCancel();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content" ref={modalRef}>
        <h2>EDITAR INVESTIGACION</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre de la investigacion</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required />

          <label>Fecha inicio</label>
          <input type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} required 
          max={form.fechaFin || ''}
          min={new Date().toISOString().split('T')[0]}
          />

          <label>Fecha fin</label>
          <input type="date" name="fechaFin" value={form.fechaFin} onChange={handleChange} required 
          min={form.fechaInicio || ''}
          max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]}
          />

          <label>Ubicacion (X, Y)</label>
          <input name="ubicacion" value={form.ubicacion} onChange={handleChange} required />

          <button type="submit" className="form-button">EDITAR</button>
          <button type="button" className="form-button cancel" onClick={onCancel}>CANCELAR</button>
        </form>
      </div>
    </div>
  );
};

export default EditarInvestigacion;
