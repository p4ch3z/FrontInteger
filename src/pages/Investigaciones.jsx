import React, { useState, useEffect, use } from 'react';
import CrearInvestigacion from '../components/CrearInvestigacion';
import EditarInvestigacion from '../components/EditarInvestigacion';
import ModalConfirmacion from '../components/ConfirmModal';
import Navbarsup from '../components/Navbarsup';
import '../styles/Investigaciones.css';

import { useQuery } from '@apollo/client';
import { GET_INVESTIGATIONS } from '../graphql/queries/investigacionTask/allInvestigation';
import { GET_TEAMS } from '../graphql/queries/teams/allTeams';

import { useMutation } from '@apollo/client';
import { DELETE_INVESTIGATION } from '../graphql/mutations/investigationTask/deleteInvestigation';


import { investiTaskClient, expertsTeamClient } from '../graphql/apolloClient';


const Investigaciones = () => {
  const { data: investigationData, loading, error } = useQuery(GET_INVESTIGATIONS, {
    client: investiTaskClient,
  });
  const { data: teamsData } = useQuery(GET_TEAMS, {
    client: expertsTeamClient,
  });

  const [deleteInvestigation] = useMutation(DELETE_INVESTIGATION, {
    client: investiTaskClient,
  });

  const [investigaciones, setInvestigaciones] = useState([]);

  const [crearVisible, setCrearVisible] = useState(false);
  const [editarVisible, setEditarVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const [eliminarVisible, setEliminarVisible] = useState(false);
  const [idEliminar, setIdEliminar] = useState(null);

  useEffect(() => {
    if (investigationData && investigationData.allInvestigations) {
      console.log(investigationData.allInvestigations);
      
      const mapped = investigationData.allInvestigations.map(inv => ({
        id: inv.investigacionId,
        nombre: inv.nombre,
        brigada: 'N/A',
        fechaInicio: inv.fechaInicio,
        fechaFin: inv.fechaFin,
        ubicacion: inv.coordenadasGeograficas,
        informeUrl: import.meta.env.VITE_GENERAR_INFORME+ inv.investigacionId,
      }));
      setInvestigaciones(mapped);
    }

  }, [investigationData]);

  useEffect(() => {
    if (teamsData && teamsData.allTeam) {
      console.log(teamsData.allTeam);
      
      // const teamMap = teamsData.allTeam.reduce((acc, team) => {
      //   acc[team.brigadaExpertoId] = team.brigada;
      //   return acc;
      // }, {});

      // setInvestigaciones(prev =>
      //   prev.map(inv => ({
      //     ...inv,
      //     brigada: teamMap[inv.id] || 'N/A'
      //   }))
      // );
    }
  }, [teamsData]);

  // id: '1',
  // nombre: "Hiato",
  // brigada: "123123",
  // fechaInicio: "3 de febrero 2025",
  // fechaFin: "3 de mayo 2025",
  // ubicacion: "6.674080638971185, -70.94430822381189",
  // informeUrl: "#"

  const handleCrear = (nueva) => {
    console.log(nueva);
    
    setInvestigaciones([...investigaciones, { ...nueva, id: nueva.investigacionId, ubicacion: nueva.coordenadasGeograficas, informeUrl: "#" }]);
    setCrearVisible(false);
  };

  const handleEditar = (editada) => {
    setInvestigaciones(investigaciones.map(i => i.id === editData.id ? { ...i, ...editada } : i));
    setEditarVisible(false);
  };

  const handleEliminar = (investigacion) => {
    console.log(investigacion);
    
    deleteInvestigation({
      variables: { id: Number(idEliminar) },
      }).then(response => {
        console.log('Investigación eliminada:', response.data);
        setInvestigaciones(prev => prev.filter(i => i.id !== idEliminar));
      }).catch(error => {
        console.error('Error al eliminar investigación:', error);
        alert('Error al eliminar la investigación. Intenta nuevamente.');
      }
    );
    setEliminarVisible(false);
  };

  return (
    <div className='nav'>
    <Navbarsup />
    <div className="investigaciones-container">
      <h2 className="title">Gestión de Investigaciones</h2>

      <div className="table-wrapper">
        <div className="table-controls">
          <button className="icon-button" onClick={() => setCrearVisible(true)}>➕</button>
        </div>

        <table className="investigaciones-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha inicio</th>
              <th>Fecha fin</th>
              <th>Ubicación</th>
              <th>Informe</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {investigaciones.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.nombre}</td>
                <td>{inv.fechaInicio}</td>
                <td>{inv.fechaFin}</td>
                <td>{inv.ubicacion}</td>
                <td>
                  <a href={inv.informeUrl} className="informe-button" target="_blank" rel="noreferrer">
                    Ver informe
                  </a>
                </td>
                <td>
                  <button
                    className="estado-btn"
                    onClick={() => {
                      setEditData(inv);
                      setEditarVisible(true);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="estado-btn"
                    onClick={() => {
                      setIdEliminar(inv.id);
                      setEliminarVisible(true);
                    }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {crearVisible && (
        <CrearInvestigacion
          onCreate={handleCrear}
          onCancel={() => setCrearVisible(false)}
        />
      )}

      {editarVisible && editData && (
        <EditarInvestigacion
          data={editData}
          onUpdate={handleEditar}
          onCancel={() => setEditarVisible(false)}
        />
      )}

      {eliminarVisible && (
        <ModalConfirmacion
          mensaje="¿Estás seguro de eliminar esta investigación?"
          onConfirm={handleEliminar}
          onCancel={() => setEliminarVisible(false)}
        />
      )}
    </div>
    </div>
  );
};

export default Investigaciones;
