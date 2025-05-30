import { gql } from '@apollo/client';

export const GET_BOTANICS = gql`
  query {
    allExpertsBotanics {
        primerNombre,
        primerApellido,
        clasificacion,
        clasificacionDisplay,
        expertoCc
    }
  }
`;