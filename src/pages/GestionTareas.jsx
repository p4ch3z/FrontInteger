import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/GestionTareas.css';
import FormularioTarea from '../components/FormularioTarea';
import ModalEstado from '../components/ModalEstado';
import Navbarjefe from '../components/Navbarjefe';

import { useQuery } from '@apollo/client';
import { GET_TASKS_FOR_EXPERT } from '../graphql/queries/experts/getTasksExpert';

import { investiTaskClient } from '../graphql/apolloClient';


const GestionTareas = () => {
  const { rol, expertoCc } = useParams();
  const [tareas, setTareas] = useState([]);

  const { data: expertTaskData } = useQuery(GET_TASKS_FOR_EXPERT, {
    variables: { ccExperto: Number(expertoCc) },
    client: investiTaskClient,
  });

  useEffect(() => {
    if (expertTaskData && expertTaskData.listTasksForExpert) {  
      const mapped = expertTaskData.listTasksForExpert.map(b => ({
        tareaId: b.tareaId,
        nombre: b.nombre,
        descripcion: b.descripcion,
        estado: b.estado
      }));
      
      setTareas(mapped)
    }
  }, [expertTaskData]);

  
  
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
      case 'en curso':
        return 'orange';
      case 'completada':
        return 'green';
      default:
        return 'black';
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
    const nuevas = [...tareas];
    nuevas[index].estado = nuevoEstado;
    setTareas(nuevas);
    setEstadoModal({ visible: false, index: null });
  };

  return (
    <div className='nav'>
    <Navbarjefe />
    <div className="gestion-container">
      <h2>Gestión de Tareas - {rol.replace(/-/g, ' ').toUpperCase()}</h2>

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
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tareas.map((t, i) => (
              <tr key={i}>
                <td>{t.nombre}</td>
                <td>{t.descripcion}</td>
                <td style={{ color: getColor(t.estado) }}>{t.estado}</td>
                <td>
                  <button
                    className="estado-btn"
                    onClick={() => setEstadoModal({ visible: true, index: i })}
                  >
                    Estado
                  </button>
                  <button
                    className="estado-btn"
                    onClick={() => {
                      setModo('editar');
                      setDatosTarea({ ...t, index: i });
                      setFormVisible(true);
                    }}
                  >
                    ✏️
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
