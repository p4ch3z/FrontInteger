import { gql } from '@apollo/client';

export const CREATE_BRIGADE = gql`
  mutation CreateBrigade($investigacionId: Int!, $expertosIds: [Int!]!) {
    createTeam(investigacionId: $investigacionId, expertosIds: $expertosIds) {
      success
    }
  }
`;
