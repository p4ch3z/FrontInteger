import { gql } from '@apollo/client';

export const GET_INVESTIGATIONS = gql`
  query {
    allInvestigations {
      investigacionId
      nombre
      fechaInicio
      fechaFin
      coordenadasGeograficas
    }
  }
`;
