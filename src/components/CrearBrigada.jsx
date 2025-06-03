import React, { useState, useRef, useEffect } from 'react';
import '../styles/FormBrigada.css';

import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';

import { investiTaskClient, expertsTeamClient } from '../graphql/apolloClient';
import { GET_BOSS } from '../graphql/queries/teams/allBoss';
import { GET_BOTANICS } from '../graphql/queries/teams/allBotanics';
import { GET_AUXILIARS } from '../graphql/queries/teams/allAuxiliars';
import { GET_INVESTIGATORS } from '../graphql/queries/teams/allInvestigators';
import { GET_INVESTIGATIONS } from '../graphql/queries/investigacionTask/allInvestigation';
import { CREATE_BRIGADE } from '../graphql/mutations/brigadeMutations/createBrigada';

const CrearBrigada = ({ onCreate, onCancel }) => {
  const { data: bossData } = useQuery(GET_BOSS, {
    client: expertsTeamClient,
  });
  const { data: botanicData } = useQuery(GET_BOTANICS, {
    client: expertsTeamClient,
  });
  const { data: auxiliarsData } = useQuery(GET_AUXILIARS, {
    client: expertsTeamClient,
  });
  const { data: investigatorsData } = useQuery(GET_INVESTIGATORS, {
    client: expertsTeamClient,
  });
  const { data: investigationData, loading, error, refetch: refetchInvestigations } = useQuery(GET_INVESTIGATIONS, {
    client: investiTaskClient,
  });
  const [createBrigade] = useMutation(CREATE_BRIGADE, {
    client: expertsTeamClient,
  });


  const [form, setForm] = useState({
    investigacion: '',
    jefe: '',
    botanico: '',
    auxiliar: '',
    coinvestigadores: ['', '']
  });
  const [boss, setBoss] = useState([]);
  const [botanico, setBotanico] = useState([]);
  const [auxiliar, setAuxiliar] = useState([]);
  const [coInvestigadores, setCoInvestigadores] = useState([]);
  const [investigaciones, setInvestigaciones] = useState([]);

  useEffect(() => {
    if (bossData && bossData.allExpertsBoss) {  
        const mapped = bossData.allExpertsBoss.map(b => ({
          expertoCc: b.expertoCc,
          nombre: b.primerNombre + ' ' + b.primerApellido,
          clasificacion: b.clasificacionDisplay
        }));
        setBoss(mapped)
      }
    }, [bossData]);

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
            informeUrl: "#"
          }));
          setInvestigaciones(mapped);
        }
    
      }, [investigationData]);

    useEffect(() => {
      refetchInvestigations(); // <--- Esto forzará a obtener las investigaciones frescas
    }, []);

  useEffect(() => {
    if (botanicData && botanicData.allExpertsBotanics) {  
        const mapped = botanicData.allExpertsBotanics.map(b => ({
          expertoCc: b.expertoCc,
          nombre: b.primerNombre + ' ' + b.primerApellido,
          clasificacion: b.clasificacionDisplay
        }));
        console.log(mapped);
        
        setBotanico(mapped)
      }
    }, [botanicData]);

  useEffect(() => {
    if (auxiliarsData && auxiliarsData.allExpertsAuxiliars) {  
        const mapped = auxiliarsData.allExpertsAuxiliars.map(b => ({
          expertoCc: b.expertoCc,
          nombre: b.primerNombre + ' ' + b.primerApellido,
          clasificacion: b.clasificacionDisplay
        }));
        setAuxiliar(mapped)
      }
    }, [auxiliarsData]);

  useEffect(() => {
    if (investigatorsData && investigatorsData.allExpertsCoInvestigators) {  
        const mapped = investigatorsData.allExpertsCoInvestigators.map(b => ({
          expertoCc: b.expertoCc,
          nombre: b.primerNombre + ' ' + b.primerApellido,
          clasificacion: b.clasificacionDisplay
        }));
        setCoInvestigadores(mapped)
      }
    }, [investigatorsData]);

  const [errores, setErrores] = useState([]);
  // const investigaciones = ['investigacion 1', 'investigacion 2', 'investigacion 3', 'investigacion 4', 'investigacion 5', 'investigacion 6'];
  const modalRef = useRef();

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onCancel();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onCancel]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onCancel();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoChange = (index, value) => {
    const nuevos = [...form.coinvestigadores];
    nuevos[index] = value;
    setForm((prev) => ({ ...prev, coinvestigadores: nuevos }));
  };

  const agregarCoInvestigador = () => {
    setForm((prev) => ({
      ...prev,
      coinvestigadores: [...prev.coinvestigadores, '']
    }));
  };

  const eliminarCoInvestigador = (index) => {
    setForm((prev) => {
      const nuevos = [...prev.coinvestigadores];
      nuevos.splice(index, 1);
      return { ...prev, coinvestigadores: nuevos };
    });
  };

  const estaSeleccionado = (nombre) => {
    return (
      nombre === form.jefe ||
      nombre === form.botanico ||
      nombre === form.auxiliar ||
      form.coinvestigadores.includes(nombre)
    );
  };

  const validarDuplicados = () => {
    const todos = [
      form.jefe,
      form.botanico,
      form.auxiliar,
      ...form.coinvestigadores
    ].filter(Boolean);
    const duplicados = todos.filter((e, i) => todos.indexOf(e) !== i);
    setErrores(duplicados);
    return duplicados.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarDuplicados()) return;
    console.log(form);

    const expertosIds = [
      form.jefe,
      form.botanico,
      form.auxiliar,
      ...form.coinvestigadores
    ]
      .filter(Boolean)
      .map((id) => Number(id))
      .filter((id) => !isNaN(id));

    const sendForm = {
      investigacionId: Number(form.investigacion),
      expertosIds: expertosIds,
    };
    console.log(sendForm);
    
    
    try {
      const { data } = await createBrigade({ variables: sendForm });
      console.log('Investigación creada:', data);
      onCreate({form, brigada: data.createTeam.brigada});
    } catch (error) {
      console.error('GraphQL error:', error.graphQLErrors);
      console.error('Network error:', error.networkError);
      alert('Error al crear la investigación. Revisa los datos e intenta nuevamente.');
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content" ref={modalRef}>
        <h2>CREAR BRIGADA</h2>
        <form onSubmit={handleSubmit}>
          <label>Investigacion</label>
          <select
            name="investigacion"
            value={form.investigacion || ''}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar</option>
            {investigaciones.map((b, i) => (
              <option key={i} value={b.id}>{b.nombre}</option>
            ))}
          </select>

          <label>Jefe de brigada</label>
          <select
            name="jefe"
            value={form.jefe}
            onChange={handleChange}
            className={errores.includes(form.jefe) ? 'error' : ''}
            required
          >
            <option value="">Seleccionar</option>
            {boss
              .filter(e => !estaSeleccionado(e) || form.jefe === e)
              .map((e, i) => (
                <option key={i} value={e.expertoCc}>{e.nombre}</option>
              ))}
          </select>



          <label>Botanico</label>
          <select
            name="botanico"
            value={form.botanico}
            onChange={handleChange}
            className={errores.includes(form.botanico) ? 'error' : ''}
            required
          >
            <option value="">Seleccionar</option>
            {botanico
              .filter(e => !estaSeleccionado(e) || form.botanico === e)
              .map((e, i) => (
                <option key={i} value={e.expertoCc}>{e.nombre}</option>
              ))}
          </select>

          <label>Auxiliar técnico</label>
          <select
            name="auxiliar"
            value={form.auxiliar}
            onChange={handleChange}
            className={errores.includes(form.auxiliar) ? 'error' : ''}
            required
          >
            <option value="">Seleccionar</option>
            {auxiliar
              .filter(e => !estaSeleccionado(e) || form.auxiliar === e)
              .map((e, i) => (
                <option key={i} value={e.expertoCc}>{e.nombre}</option>
              ))}
          </select>

          {form.coinvestigadores.map((val, i) => (
            <div key={i} className="coinvestigador-group">
              <label>Co-investigador</label>
              <div className="co-row">
                <select
                  value={val}
                  onChange={(e) => handleCoChange(i, e.target.value)}
                  className={errores.includes(val) ? 'error' : ''}
                  required
                >
                  <option value="">Seleccionar</option>
                  {coInvestigadores
                    .filter(e => !estaSeleccionado(e) || val === e)
                    .map((e, j) => (
                      <option key={j} value={e.expertoCc}>{e.nombre}</option>
                    ))}
                </select>
                {form.coinvestigadores.length > 1 && (
                  <button
                    type="button"
                    className="delete-co"
                    onClick={() => eliminarCoInvestigador(i)}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>
          ))}

          <button type="button" className="form-button add" onClick={agregarCoInvestigador}>
            ➕ Agregar co-investigador
          </button>

          <button type="submit" className="form-button">CREAR</button>
          <button type="button" className="form-button cancel" onClick={onCancel}>CANCELAR</button>
        </form>
      </div>
    </div>
  );
};

export default CrearBrigada;
