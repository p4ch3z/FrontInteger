import { gql } from '@apollo/client';

export const GET_BOSS = gql`
  query {
    allExpertsBoss {
        primerNombre,
        primerApellido,
        clasificacion,
        clasificacionDisplay,
        expertoCc
    }
  }
`;