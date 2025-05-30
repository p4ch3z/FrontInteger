import { gql } from '@apollo/client';

export const UPDATE_BRIGADE = gql`
  mutation UpdateBrigade($investigacionId: Int!, $expertosIds: [Int!]!) {
    updateTeam(investigacionId: $investigacionId, expertosIds: $expertosIds) {
      success,
      brigada {
        brigadaId,
        investigacionId
      }
    }
  }
`;
