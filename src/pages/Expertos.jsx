import React, { useState, useEffect } from 'react';
import '../styles/Expertos.css';
import avatar from '../assets/react.svg'; // Cambia por tu imagen real
import Navbarjefe from '../components/Navbarjefe';
import TarjetaExperto from '../components/TarjetaExperto';

import { useQuery } from '@apollo/client';
import { GET_EXPERTS } from '../graphql/queries/experts/allExperts';

import { expertsTeamClient } from '../graphql/apolloClient';

const Expertos = () => {
  const [experts, setExperts] = useState([]);

  const { data: expertData } = useQuery(GET_EXPERTS, {
    client: expertsTeamClient,
  });

  useEffect(() => {
    if (expertData && expertData.allExpertos) {  
      const mapped = expertData.allExpertos.map(b => ({
        expertoCc: b.expertoCc,
        nombre: b.primerNombre + ' ' + b.primerApellido,
        clasificacion: b.clasificacionDisplay
      }));
      console.log(mapped);
      
      setExperts(mapped)
    }
  }, [expertData]);

  return (
    <div className='nav'>
    <Navbarjefe />
     <div className="expertos-container">
      <h2 className="expertos-title">Expertos</h2>
      <div className="expertos-grid">
        {experts.map((exp, i) => (
          <TarjetaExperto
            key={i}
            rol={exp.clasificacion}
            nombre={exp.nombre}
            expertoCc={exp.expertoCc}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Expertos;
