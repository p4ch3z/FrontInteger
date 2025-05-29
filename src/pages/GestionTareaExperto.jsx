import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/GestionTareas.css';
import FormularioTarea from '../components/FormularioTarea';
import ModalEstado from '../components/ModalEstado';
import Navbarjefe from '../components/Navbarjefe';

const GestionTareas = () => {
  const { rol } = useParams();
  const [tareas, setTareas] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [modo, setModo] = useState('asignar');
  const [datosTarea, setDatosTarea] = useState(null);
  const [estadoModal, setEstadoModal] = useState({ visible: false, index: null });

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/tareas?experto=${rol}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setTareas(data);
      } catch (err) {
        console.error("Error cargando tareas:", err);
      }
    };
    fetchTareas();
  }, [rol]);

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

  const handleGuardarTarea = async (nuevaTarea) => {
    const tareaConEstado = {
      ...nuevaTarea,
      estado: nuevaTarea.estado || 'Pendiente',
      experto: rol
    };

    try {
      const method = modo === 'editar' ? 'PUT' : 'POST';
      const url = modo === 'editar'
        ? `http://localhost:8000/api/tareas/${tareaConEstado.id}`
        : 'http://localhost:8000/api/tareas/';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(tareaConEstado)
      });

      if (response.ok) {
        const updated = await response.json();
        if (modo === 'editar' && datosTarea?.index !== undefined) {
          const nuevas = [...tareas];
          nuevas[datosTarea.index] = updated;
          setTareas(nuevas);
        } else {
          setTareas([...tareas, updated]);
        }
      }
    } catch (err) {
      console.error("Error guardando tarea:", err);
    }

    setFormVisible(false);
  };

  const cambiarEstado = async (index, nuevoEstado) => {
    const tarea = tareas[index];
    try {
      const response = await fetch(`http://localhost:8000/api/tareas/${tarea.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ estado: nuevoEstado })
      });
      if (response.ok) {
        const actualizada = await response.json();
        const nuevas = [...tareas];
        nuevas[index] = actualizada;
        setTareas(nuevas);
      }
    } catch (err) {
      console.error("Error actualizando estado:", err);
    }
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
                <tr key={t.id}>
                  <td>{t.nombre}</td>
                  <td>{t.descripcion}</td>
                  <td style={{ color: getColor(t.estado) }}>{t.estado}</td>
                  <td>
                    <button className="estado-btn" onClick={() => setEstadoModal({ visible: true, index: i })}>Estado</button>
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
