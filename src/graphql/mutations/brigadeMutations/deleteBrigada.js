import { gql } from '@apollo/client';

export const DELETE_BRIGADE = gql`
  mutation DeleteBrigade($investigacionId: Int!) {
    deleteTeam(investigacionId: $investigacionId) {
      success
    }
  }
`;