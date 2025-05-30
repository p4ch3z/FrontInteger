import React, { useState, useRef, useEffect } from 'react';
import '../styles/FormBrigada.css';

import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';

import { expertsTeamClient } from '../graphql/apolloClient';
import { GET_BOSS } from '../graphql/queries/teams/allBoss';
import { GET_BOTANICS } from '../graphql/queries/teams/allBotanics';
import { GET_AUXILIARS } from '../graphql/queries/teams/allAuxiliars';
import { GET_INVESTIGATORS } from '../graphql/queries/teams/allInvestigators';
import { UPDATE_BRIGADE } from '../graphql/mutations/brigadeMutations/updateBrigada';

const EditarBrigada = ({ data, onUpdate, onCancel }) => {
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
  const [updateBrigade] = useMutation(UPDATE_BRIGADE, {
    client: expertsTeamClient,
  });

  const [form, setForm] = useState({
    investigacion: data.investigacion,
    jefe: data.jefeCC,
    botanico: data.botanicoCC,
    auxiliar: data.auxiliarCC,
    coinvestigadores: [...data.coinvestigadoresCC]
  });
  const [errores, setErrores] = useState([]);
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
        console.log("hoa");
        
        setBoss(mapped)
      }
    }, [bossData]);

  useEffect(() => {
    if (botanicData && botanicData.allExpertsBotanics) {  
        const mapped = botanicData.allExpertsBotanics.map(b => ({
          expertoCc: b.expertoCc,
          nombre: b.primerNombre + ' ' + b.primerApellido,
          clasificacion: b.clasificacionDisplay
        }));
        console.log(mapped);
        
        console.log(form);
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


  console.log(data);
  
  

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

    try {
      const { data } = await updateBrigade({ variables: sendForm });
      console.log('Investigación editada:', data);
      onUpdate({form, brigada: data.updateTeam.brigada});
    } catch (error) {
      console.error('GraphQL error:', error.graphQLErrors);
      console.error('Network error:', error.networkError);
      alert('Error al editar la investigación. Revisa los datos e intenta nuevamente.');
    }
  
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content" ref={modalRef}>
        <h2>EDITAR BRIGADA</h2>
        <form onSubmit={handleSubmit}>
          <label>Botanico</label>
          <select
            name="botanico"
            value={form.botanico}
            onChange={handleChange}
            className={errores.includes(form.botanico) ? 'error' : ''}
            required
          >
            <option value="">Seleccionar</option>
            {botanico.filter(e => !estaSeleccionado(e) || form.botanico === e).map((e, i) => (
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
            {auxiliar.filter(e => !estaSeleccionado(e) || form.auxiliar === e).map((e, i) => (
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
                  {coInvestigadores.filter(e => !estaSeleccionado(e) || val === e).map((e, j) => (
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

          <button type="submit" className="form-button">EDITAR</button>
          <button type="button" className="form-button cancel" onClick={onCancel}>CANCELAR</button>
        </form>
      </div>
    </div>
  );
};

export default EditarBrigada;
