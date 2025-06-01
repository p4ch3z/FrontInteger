import React, { useState, useEffect, use } from 'react';
import '../styles/Investigaciones.css'; // asegúrate de que este archivo exista
import Navbarjefe from '../components/Navbarjefe';
import TarjetaInvestigacion from '../components/TarjetaInvestigacion';
import defaultImagen from '../assets/react.svg'; // usa una imagen representativa de investigación

import { useQuery } from '@apollo/client';
import { GET_INVESTIGATIONS } from '../graphql/queries/investigacionTask/allInvestigation';

import { investiTaskClient } from '../graphql/apolloClient';

const Investigaciones = () => {
  const { data: investigationData, loading, error } = useQuery(GET_INVESTIGATIONS, {
    client: investiTaskClient,
  });

  const [investigaciones, setInvestigaciones] = useState([]);

  useEffect(() => {
    if (investigationData && investigationData.allInvestigations) {

      const mapped = investigationData.allInvestigations.map(inv => ({
        id: inv.investigacionId,
        nombre: inv.nombre,
        brigada: 'N/A',
        fechaInicio: inv.fechaInicio,
        fechaFin: inv.fechaFin,
        ubicacion: inv.coordenadasGeograficas,
        informeUrl: "#",
        descripcion: "",
        defaultImagen: ""
      }));
      setInvestigaciones(mapped);
    }

  }, [investigationData]);

  return (
    <div className='nav'>
      <Navbarjefe />
      <div className="investigaciones-container">
        <h2 className="investigaciones-title">Investigaciones</h2>
        <div className="investigaciones-grid">
          {investigaciones.map((inv, i) => (
            <TarjetaInvestigacion
              key={i}
              nombre={inv.nombre}
              descripcion={inv.descripcion}
              imagen={defaultImagen}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Investigaciones;

