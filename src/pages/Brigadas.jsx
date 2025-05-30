import React, { useState, useEffect } from 'react';
import CrearBrigada from '../components/CrearBrigada';
import EditarBrigada from '../components/EditarBrigada';
import ConfirmModal from '../components/ConfirmModal';
import Navbarsup from '../components/Navbarsup';
import '../styles/Brigadas.css';

import { useQuery } from '@apollo/client';
import { GET_BOSS } from '../graphql/queries/teams/allBoss';
import { GET_TEAMS } from '../graphql/queries/teams/allTeams';
import { GET_BOTANICS } from '../graphql/queries/teams/allBotanics';
import { GET_AUXILIARS } from '../graphql/queries/teams/allAuxiliars';
import { GET_INVESTIGATORS } from '../graphql/queries/teams/allInvestigators';
import { DELETE_BRIGADE } from '../graphql/mutations/brigadeMutations/deleteBrigada';

import { useMutation } from '@apollo/client';

import { expertsTeamClient } from '../graphql/apolloClient';

const Brigadas = () => {
  console.log("has");
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
  
  const { data: teamsData } = useQuery(GET_TEAMS, {
    client: expertsTeamClient,
  });

  const [deleteBrigades] = useMutation(DELETE_BRIGADE, {
      client: expertsTeamClient,
    });

  const [brigadas, setBrigadas] = useState([]);

  // {
  //   id: '1231231',
  //   investigacion: 'investigacion 1',
  //   jefe: 'Paola',
  //   botanico: 'Pache',
  //   auxiliar: 'Diego',
  //   coinvestigadores: ['Arley', 'Ricardo']
  // }


  const [boss, setBoss] = useState([]);
  const [botanico, setBotanico] = useState([]);
  const [auxiliar, setAuxiliar] = useState([]);
  const [coInvestigadores, setCoInvestigadores] = useState([]);

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


  useEffect(() => {
    if (teamsData && teamsData.allTeam) {
      const mapped = teamsData.allTeam.map(b => ({
        brigadaId: b.brigadaId,
        investigacion: b.investigacionId,
        jefe: (
        b.expertos.find(e => e.clasificacion === 'Jefe de brigada')
            ? b.expertos.find(e => e.clasificacion === 'Jefe de brigada').primerNombre + ' ' +
              b.expertos.find(e => e.clasificacion === 'Jefe de brigada').primerApellido
            : 'N/A'
        ),
        jefeCC: (
          b.expertos.find(e => e.clasificacion === 'Jefe de brigada')
            ? b.expertos.find(e => e.clasificacion === 'Jefe de brigada').expertoCc : ''
        ),
        botanico: (
          b.expertos.find(e => e.clasificacion === 'Botánico')
            ? b.expertos.find(e => e.clasificacion === 'Botánico').primerNombre + ' ' +
              b.expertos.find(e => e.clasificacion === 'Botánico').primerApellido
            : 'N/A'
        ),
        botanicoCC: (
          b.expertos.find(e => e.clasificacion === 'Botánico')
            ? b.expertos.find(e => e.clasificacion === 'Botánico').expertoCc : ''
        ),
        auxiliar: (
          b.expertos.find(e => e.clasificacion === 'Auxiliar técnico')
            ? b.expertos.find(e => e.clasificacion === 'Auxiliar técnico').primerNombre + ' ' +
              b.expertos.find(e => e.clasificacion === 'Auxiliar técnico').primerApellido
            : 'N/A'
        ),
        auxiliarCC: (
          b.expertos.find(e => e.clasificacion === 'Auxiliar técnico')
            ? b.expertos.find(e => e.clasificacion === 'Auxiliar técnico').expertoCc : ''
        ),
        coinvestigadores: b.expertos
          .filter(e => e.clasificacion === 'Co-investigador')
          .map(e => e.primerNombre + ' ' + e.primerApellido)
          .join(', ') || 'N/A',
        coinvestigadoresCC: b.expertos
          .filter(e => e.clasificacion === 'Co-investigador')
          .map(e => e.expertoCc) || '',
        
      }));
      console.log(mapped);
      
      setBrigadas(mapped)
    }
  }, [teamsData]);
  

  const [crearVisible, setCrearVisible] = useState(false);
  const [editarVisible, setEditarVisible] = useState(false);
  const [editData, setEditData] = useState(null);

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const handleCrear = (nueva) => {
    const theBoss = boss.filter(b => b.expertoCc == nueva.form.jefe)[0];
    const theBotanic = botanico.filter(b => b.expertoCc == nueva.form.botanico)[0];
    const theAuxiliar = auxiliar.filter(b => b.expertoCc == nueva.form.auxiliar)[0];
    const theInvestigators = coInvestigadores
    .filter(persona => nueva.form.coinvestigadores.includes(String(persona.expertoCc)))
    .map(persona => persona.nombre).join(', ');
    const theInvestigatorsCC = coInvestigadores
    .filter(persona => nueva.form.coinvestigadores.includes(String(persona.expertoCc)))
    .map(persona => persona.expertoCc);

    setBrigadas([...brigadas, { 
      brigadaId: nueva.brigada.brigadaId, 
      investigacion: nueva.form.investigacion, 
      jefe: theBoss.nombre, 
      jefeCC: theBoss.expertoCc,
      botanico: theBotanic.nombre,
      botanicoCC: theBotanic.expertoCc, 
      auxiliar: theAuxiliar.nombre, 
      auxiliarCC: theAuxiliar.expertoCc,
      coinvestigadores: theInvestigators,
      coinvestigadoresCC: theInvestigatorsCC 
    }]);
    setCrearVisible(false);
  };

  const handleEditar = (editada) => {

    const theBoss = boss.find(b => b.expertoCc == editada.form.jefe);
    const theBotanic = botanico.find(b => b.expertoCc == editada.form.botanico);
    const theAuxiliar = auxiliar.find(b => b.expertoCc == editada.form.auxiliar);

    const theInvestigators = coInvestigadores
      .filter(persona => editada.form.coinvestigadores.includes(Number(persona.expertoCc)))
      .map(persona => persona.nombre).join(', ');

    const theInvestigatorsCC = coInvestigadores
      .filter(persona => editada.form.coinvestigadores.includes(Number(persona.expertoCc)))
      .map(persona => persona.expertoCc);

    const updatedBrigada = {
      brigadaId: editada.brigada.brigadaId,
      investigacion: editada.brigada.investigacionId,
      jefe: theBoss?.nombre || '',
      jefeCC: theBoss?.expertoCc || '',
      botanico: theBotanic?.nombre || '',
      botanicoCC: theBotanic?.expertoCc || '',
      auxiliar: theAuxiliar?.nombre || '',
      auxiliarCC: theAuxiliar?.expertoCc || '',
      coinvestigadores: theInvestigators,
      coinvestigadoresCC: theInvestigatorsCC,
    };
    
    setBrigadas(brigadas.map(b => b.brigadaId == editada.brigada.brigadaId ? updatedBrigada : b));
    setEditarVisible(false);
  };

  const handleEliminar = (id) => {
    console.log(id);
    
    setToDeleteId(id);
    setConfirmVisible(true);
  };

  const confirmarEliminar = () => {
    console.log(toDeleteId);

    deleteBrigades({
      variables: { investigacionId: Number(toDeleteId) },
      }).then(response => {
        console.log('Brigada Eliminada eliminada:', response.data);
        setBrigadas(prev => prev.filter(i => i.investigacion !== toDeleteId));
        console.log(brigadas);
        
      }).catch(error => {
        console.error('Error al eliminar la brigada:', error);
        alert('Error al eliminar la brigada. Intenta nuevamente.');
      }
    );
    setToDeleteId(null);
    setConfirmVisible(false);
  };

  return (
    <div className='nav'>
    <Navbarsup />
    <div className="brigadas-container">
      <h2 className="title">Gestión de Brigadas</h2>
      <div className="table-wrapper">
        <div className="table-controls">
          <button onClick={() => setCrearVisible(true)} className="add-button">➕</button>
        </div>
        <table className="brigadas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Investigacion</th>
              <th>Jefe de brigada</th>
              <th>Botanico</th>
              <th>Auxiliar</th>
              <th>Co-investigadores</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {brigadas.map((b, i) => (
              <tr key={i}>
                <td>{b.brigadaId}</td>
                <td>{b.investigacion}</td>
                <td>{b.jefe}</td>
                <td>{b.botanico}</td>
                <td>{b.auxiliar}</td>
                <td>{b.coinvestigadores}</td>
                <td className="acciones">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditData(b);
                      setEditarVisible(true);
                    }}
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleEliminar(b.investigacion)}
                    title="Eliminar"
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
        <CrearBrigada
          onCreate={handleCrear}
          onCancel={() => setCrearVisible(false)}
        />
      )}

      {editarVisible && editData && (
        <EditarBrigada
          data={editData}
          onUpdate={handleEditar}
          onCancel={() => setEditarVisible(false)}
        />
      )}

      {confirmVisible && (
        <ConfirmModal
          mensaje="¿Estás seguro de que deseas eliminar esta brigada?"
          onConfirm={confirmarEliminar}
          onCancel={() => {
            setConfirmVisible(false);
            setToDeleteId(null);
          }}
        />
      )}
    </div>
    </div>
  );
};

export default Brigadas;
