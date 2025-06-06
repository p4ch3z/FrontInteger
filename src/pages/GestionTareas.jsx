import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/GestionTareas.css';
import FormularioTarea from '../components/FormularioTarea';
import ModalEstado from '../components/ModalEstado';
import Navbarjefe from '../components/Navbarjefe';

import { useQuery } from '@apollo/client';
import { INVESTIGACION_FOR_NAME } from '../graphql/queries/investigacionTask/investigationForName';
import { INFORMATION_ABOUT_TASK_FOR_ID_INVESTIGATION } from '../graphql/queries/investigacionTask/informationAboutTaskForIdInvestigation';
import { EXPERTS_BY_INVESTIGATION_ID } from '../graphql/queries/teams/teamByInvestigationId';

import { investiTaskClient, expertsTeamClient } from '../graphql/apolloClient';

import { useMutation } from '@apollo/client';
import { UPDATE_TASK_STATE } from '../graphql/mutations/investigationTask/updateTaskState';
import { CREATE_TASK } from '../graphql/mutations/investigationTask/createTask';
import { UPDATE_TASK } from '../graphql/mutations/investigationTask/updateTask';
import { DELETE_TASK } from '../graphql/mutations/investigationTask/deleteTask';


const GestionTareas = () => {
  const { investigacion, expertoCc } = useParams();
  const [tareas, setTareas] = useState([]);
  const [expertos, setExpertos] = useState([]);

  const { data: investigationData } = useQuery(INVESTIGACION_FOR_NAME, {
    variables: { name: investigacion.replace('-',' ') },
    client: investiTaskClient
  });
  console.log(investigacion.replace('-',' '))

  const [updateTaskState] = useMutation(UPDATE_TASK_STATE, {
    client: investiTaskClient,
  });

  const [createTask] = useMutation(CREATE_TASK, {
    client: investiTaskClient,
  });

  const [updateTask] = useMutation(UPDATE_TASK, {
    client: investiTaskClient,
  });

  const [deleteTask] = useMutation(DELETE_TASK, {
    client: investiTaskClient,
  });

  const investigationId = investigationData?.investigacionForName;
  console.log(investigationId);
  
  const { data: tasksData, loading: loadingTasks, error: errorTasks } = useQuery(INFORMATION_ABOUT_TASK_FOR_ID_INVESTIGATION, {
    variables: { idInvestigation: Number(investigationId) },
    client: investiTaskClient,
    skip: !investigationId,
  });

  const { data: expertsData, loading: loadingExperts, error: errorExperts } = useQuery(EXPERTS_BY_INVESTIGATION_ID, {
    variables: { investigacionId: Number(investigationId) },
    client: expertsTeamClient,
    skip: !investigationId, 
  });


  useEffect(() => {
    if (expertsData?.expertsByInvestigationId) {
      console.log(expertsData.expertsByInvestigationId);
      
      setExpertos(expertsData.expertsByInvestigationId);
    }
  }, [expertsData]);

  useEffect(() => {
  if (
    tasksData?.informationAboutTaskForIdInvestigation &&
    expertsData?.expertsByInvestigationId
  ) {
    const tareasConExpertos = tasksData.informationAboutTaskForIdInvestigation.map(task => {
      const experto = expertsData.expertsByInvestigationId.find(
        e => e.expertoCc === task.expertoCc
      );
      return {
        ...task,
        experto: experto || null, // puedes manejar si no hay match
      };
    });

    setTareas(tareasConExpertos);
  }
}, [tasksData, expertsData]);

 

  
  
  const [formVisible, setFormVisible] = useState(false);
  const [modo, setModo] = useState('asignar');
  const [datosTarea, setDatosTarea] = useState(null);
  const [estadoModal, setEstadoModal] = useState({ visible: false, index: null });  

  const getColor = (estado) => {
    if (!estado) return 'black';
    switch (estado.toLowerCase()) {
      case 'pendiente':
        return 'red';
      case 'en progreso':
        return 'orange';
      case 'completado':
        return 'green';
      default:
        return 'black';
    }
  };

  const getEstadoIcono = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'pendiente':
        return '🔴';
      case 'en progreso':
        return '🟠';
      case 'completado':
        return '🟢';
      default:
        return '⚪';
    }
  };

  const handleGuardarTarea = (nuevaTarea) => {
    const tareaConEstado = {
      ...nuevaTarea,
      estado: nuevaTarea.estado || 'pendiente'
    };

    console.log(tareaConEstado);
    
    console.log(datosTarea?.index);
    console.log(modo);
    
    
    if (modo === 'editar' && datosTarea?.index !== undefined) {
      updateTask({
        variables: { nombre: tareaConEstado.nombre, descripcion: tareaConEstado.descripcion, 
          estado: tareaConEstado.estado, expertoCc: Number(tareaConEstado.experto && !tareaConEstado.experto.expertoCc ? tareaConEstado.experto : tareaConEstado.experto.expertoCc), fechaEjecucion: tareaConEstado.fechaEjecucion,
          investigacionId: Number(investigationId), tareaId: Number(datosTarea.index) },
        }).then(response => {
          console.log('Tarea Editada:', response.data);
          const expertoAsignado = expertos.find(e => e.expertoCc === Number(tareaConEstado.experto));

          const tareaActualizada = {
            ...tareaConEstado,
            experto: expertoAsignado || null,
          };
          console.log(tareas);
          
          // Reemplazar la tarea editada en el estado
          const tareasActualizadas = tareas.map(t =>
            t.tareaId === datosTarea.index ? tareaActualizada : t
          );

          setTareas(tareasActualizadas);
        }).catch(error => {
          console.error('Error al crear la tarea:', error);
          alert('Error al crear la tarea. Intenta nuevamente.');
        }
      );
    } else {
      createTask({
        variables: { nombre: tareaConEstado.nombre, descripcion: tareaConEstado.descripcion, 
          estado: tareaConEstado.estado, expertoCc: Number(tareaConEstado.experto), fechaEjecucion: tareaConEstado.fechaEjecucion,
          investigacionId: Number(investigationId) },
        }).then(response => {
          console.log('Tarea creada:', response.data);
          const expertoAsignado = expertos.find(e => e.expertoCc === Number(tareaConEstado.experto));

          const tareaConDatos = {
            ...tareaConEstado,
            experto: expertoAsignado || null,
          };

          setTareas([...tareas, tareaConDatos]);
        }).catch(error => {
          console.error('Error al crear la tarea:', error);
          alert('Error al crear la tarea. Intenta nuevamente.');
        }
      );
    }

    setFormVisible(false);
  };

  const cambiarEstado = (index, nuevoEstado) => {
    const nuevas = tareas.map(t => {
        if (t.tareaId === index) {
            return { ...t, estado: nuevoEstado.toUpperCase() };
        }
        return t;
    });
    
    updateTaskState({
      variables: { tareaId: Number(index), estado: nuevoEstado.toLowerCase() },
      }).then(response => {
        console.log('Estado actualizado:', response.data);
        setTareas(nuevas);
      }).catch(error => {
        console.error('Error al actualizar el estado:', error);
        alert('Error al actualizar el estado. Intenta nuevamente.');
      }
    );
    setEstadoModal({ visible: false, index: null });
  };

  const eliminarTarea = (index) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar esta tarea?");
    if (!confirmar) return;
    deleteTask({
      variables: { tareaId: Number(index) },
      }).then(response => {
        console.log('Investigación eliminada:', response.data);
        setTareas(prev => prev.filter(i => i.tareaId !== index));
      }).catch(error => {
        console.error('Error al eliminar investigación:', error);
        alert('Error al eliminar la investigación. Intenta nuevamente.');
      }
    );
  };

  useEffect(() => {
  if (formVisible && expertos.length === 0) {
    alert("No hay expertos disponibles.");
    setFormVisible(false);
  }
}, [formVisible, expertos]);

  return (
    <div className='nav'>
      <Navbarjefe />
      <div className="gestion-container">
        <h2>Gestión de Tareas - {investigacion.replace(/-/g, ' ').toUpperCase()}</h2>

        <div className="table-wrapper">
          <div className="table-controls">
            <button
              onClick={() => {
                setModo('asignar');
                setDatosTarea(null);
                setFormVisible(true);
              }}
              className="icon-button"
            >
              ➕
            </button>
          </div>

          <table className="tareas-table">
            <thead>
              <tr>
                <th>Nombre de tarea</th>
                <th>Expertos</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tareas.map((t, i) => (
                <tr key={i}>
                  <td>{t.nombre}</td>
                  <td>{t?.experto?.primerNombre+" "+t?.experto?.primerApellido || 'Sin asignar'}</td>
                  <td>{t.descripcion}</td>
                  <td style={{ color: getColor(t.estado) }}>{t.estado.toUpperCase()}</td>
                  <td className="acciones-cell">
                    <button
                      className="estado-btn"
                      onClick={() => setEstadoModal({ visible: true, index: t.tareaId })}
                    >
                      {getEstadoIcono(t.estado)} Estado
                    </button>
                    <button
                      className="icono-btn"
                      title="Editar"
                      onClick={() => {
                        setModo('editar');
                        setDatosTarea({ ...t, index: t.tareaId });
                        setFormVisible(true);
                        console.log(formVisible);
                        console.log(expertos);
                        
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      className="icono-btn"
                      title="Eliminar"
                      onClick={() => eliminarTarea(t.tareaId)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {formVisible && expertos.length > 0 && (
          <FormularioTarea
            modo={modo}
            datosIniciales={datosTarea}
            onGuardar={handleGuardarTarea}
            onCancelar={() => setFormVisible(false)}
            listaExpertos={[...expertos]}
          />
        )}

        {estadoModal.visible && (
          <ModalEstado
            estadoActual={tareas[estadoModal.index]?.estado}
            onSeleccion={(nuevo) => cambiarEstado(estadoModal.index, nuevo)}
            onCancelar={() => setEstadoModal({ visible: false, index: null })}
          />
        )}
      </div>
    </div>
  );
};

export default GestionTareas;
