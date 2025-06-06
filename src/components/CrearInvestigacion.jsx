import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_INVESTIGATION } from '../graphql/mutations/investigationTask/createInvestigation';
import '../styles/FormInvestigacion.css';

import { investiTaskClient, expertsTeamClient } from '../graphql/apolloClient';
import { useQuery } from '@apollo/client';
import { GET_TEAMS } from '../graphql/queries/teams/allTeams';

const CrearInvestigacion = ({ onCreate, onCancel }) => {
  const { data: teamsData } = useQuery(GET_TEAMS, {
    client: expertsTeamClient,
  });
  
  const [form, setForm] = useState({
    nombre: '',
    fechaInicio: '',
    fechaFin: '',
    ubicacion: '',
  });

  useEffect(() => {
      if (teamsData && teamsData.allTeam) {

        const brigadas = teamsData.allTeam.map(team => team.brigadaId);
        
        setBrigadas([...brigadas]);
      }
  }, [teamsData]);

  const modalRef = useRef();
  const [brigadas, setBrigadas] = useState([]);
  const [createInvestigation] = useMutation(CREATE_INVESTIGATION, {
    client: investiTaskClient,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const coordenadasRegex = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/;
    if (!coordenadasRegex.test(form.ubicacion.trim())) {
      alert('Ubicación inválida. Usa formato: latitud, longitud (ej: 6.25, -73.56)');
      return;
    }

    if (!form.fechaInicio || !form.fechaFin) {
      alert('Debes seleccionar fechas válidas');
      return;
    }

    const variables = {
      fechaInicio: form.fechaInicio,
      fechaFin: form.fechaFin,
      coordenadasGeograficas: form.ubicacion,
      nombre: form.nombre,
    };

    console.log("Variables a enviar:", variables);

    try {
      const { data } = await createInvestigation({ variables });
      console.log('Investigación creada:', data);
      onCreate(data.createInvestigation.investigacion);
    } catch (error) {
      console.error('GraphQL error:', error.graphQLErrors);
      console.error('Network error:', error.networkError);
      alert('Error al crear la investigación. Revisa los datos e intenta nuevamente.');
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) onCancel();
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content" ref={modalRef}>
        <h2>CREAR INVESTIGACIÓN</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre de la investigación</label>
          <input
            name="nombre"
            value={form.nombre || ''}
            onChange={handleChange}
            required
          />

          <label>Fecha inicio</label>
          <input
            type="date"
            name="fechaInicio"
            value={form.fechaInicio || ''}
            onChange={handleChange}
            max={form.fechaFin || ''}
            min={new Date().toISOString().split('T')[0]}
            required
          />

          <label>Fecha fin</label>
          <input
            type="date"
            name="fechaFin"
            value={form.fechaFin || ''}
            min={form.fechaInicio || new Date().toISOString().split('T')[0]}
            max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]}
            onChange={handleChange}
            required
          />

          <label>Ubicación (latitud, longitud)</label>
          <input
            name="ubicacion"
            value={form.ubicacion || ''}
            onChange={handleChange}
            placeholder="Ej: 6.25, -73.56"
            required
          />

          <button type="submit" className="form-button">CREAR</button>
          <button type="button" className="form-button cancel" onClick={onCancel}>CANCELAR</button>
        </form>
      </div>
    </div>
  );
};

export default CrearInvestigacion;
