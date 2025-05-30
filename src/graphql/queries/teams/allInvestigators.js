import { gql } from '@apollo/client';

export const GET_INVESTIGATORS = gql`
  query {
    allExpertsCoInvestigators {
        primerNombre,
        primerApellido,
        clasificacion,
        clasificacionDisplay,
        expertoCc
    }
  }
`;
