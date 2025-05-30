import { gql } from '@apollo/client';

export const GET_AUXILIARS = gql`
  query {
    allExpertsAuxiliars {
        primerNombre,
        primerApellido,
        clasificacion,
        clasificacionDisplay,
        expertoCc
    }
  }
`;