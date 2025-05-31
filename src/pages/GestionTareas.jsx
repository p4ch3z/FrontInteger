import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/GestionTareas.css';
import FormularioTarea from '../components/FormularioTarea';
import ModalEstado from '../components/ModalEstado';
import Navbarjefe from '../components/Navbarjefe';

import { useQuery } from '@apollo/client';
import { INVESTIGACION_FOR_NAME } from '../graphql/queries/investigacionTask/investigationForName';
import { INFORMATION_ABOUT_TASK_FOR_ID_INVESTIGATION } from '../graphql/queries/investigacionTask/informationAboutTaskForIdInvestigation';

import { investiTaskClient } from '../graphql/apolloClient';

import { useMutation } from '@apollo/client';
import { UPDATE_TASK_STATE } from '../graphql/mutations/investigationTask/updateTaskState';


const GestionTareas = () => {
  const { investigacion, expertoCc } = useParams();
  const [tareas, setTareas] = useState([]);

  console.log(investigacion);
  const { data: investigationData } = useQuery(INVESTIGACION_FOR_NAME, {
    variables: { name: investigacion.replace('-',' ') },
    client: investiTaskClient
  });

  const [updateTaskState] = useMutation(UPDATE_TASK_STATE, {
    client: investiTaskClient,
  });

  const investigationId = investigationData?.investigacionForName;

  console.log(investigationId);
  
  const {
    data: tasksData,
    loading: loadingTasks,
    error: errorTasks,
  } = useQuery(INFORMATION_ABOUT_TASK_FOR_ID_INVESTIGATION, {
    variables: { idInvestigation: Number(investigationId) },
    client: investiTaskClient,
    skip: !investigationId,
  });

  useEffect(() => {
    if (tasksData?.informationAboutTaskForIdInvestigation) {
      console.log(tasksData);
      
      setTareas(tasksData.informationAboutTaskForIdInvestigation);
    }
  }, [tasksData]);

  
  
  const [formVisible, setFormVisible] = useState(false);
  const [modo, setModo] = useState('asignar');
  const [datosTarea, setDatosTarea] = useState(null);
  const [estadoModal, setEstadoModal] = useState({ visible: false, index: null });

  console.log(expertoCc);
  

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
      estado: nuevaTarea.estado || 'Pendiente'
    };

    if (modo === 'editar' && datosTarea?.index !== undefined) {
      const nuevas = [...tareas];
      nuevas[datosTarea.index] = { ...nuevas[datosTarea.index], ...tareaConEstado };
      setTareas(nuevas);
    } else {
      setTareas([...tareas, tareaConEstado]);
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
    const nuevas = [...tareas];
    nuevas.splice(index, 1);
    setTareas(nuevas);
  };

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
                  <td>{t.experto || 'Sin asignar'}</td>
                  <td>{t.descripcion}</td>
                  <td style={{ color: getColor(t.estado) }}>{t.estado}</td>
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
                        setDatosTarea({ ...t, index: i });
                        setFormVisible(true);
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      className="icono-btn"
                      title="Eliminar"
                      onClick={() => eliminarTarea(i)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {formVisible && (
          <FormularioTarea
            modo={modo}
            datosIniciales={datosTarea}
            onGuardar={handleGuardarTarea}
            onCancelar={() => setFormVisible(false)}
            listaExpertos={[
              { cc: '1111', nombre: 'Laura Ríos' },
              { cc: '2222', nombre: 'Carlos Pérez' },
              { cc: '3333', nombre: 'Diana Torres' }
            ]}
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
