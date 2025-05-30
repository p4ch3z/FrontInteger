import { gql } from '@apollo/client';

export const GET_EXPERTS = gql`
  query {
    allExpertos {
        expertoCc,
        primerNombre,
        primerApellido,
        clasificacion,
        clasificacionDisplay
    }
    }
`;