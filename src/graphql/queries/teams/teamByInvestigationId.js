import { gql } from '@apollo/client';

export const EXPERTS_BY_INVESTIGATION_ID = gql`
  query expertsByInvestigationId($investigacionId: Int!) {
    expertsByInvestigationId(investigacionId: $investigacionId) {
        primerNombre,
        primerApellido,
        clasificacion,
        clasificacionDisplay,
        expertoCc
    }
  }
`;
