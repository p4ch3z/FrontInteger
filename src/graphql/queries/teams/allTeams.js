import { gql } from '@apollo/client';

export const GET_TEAMS = gql`
  query {
    allTeam {
      brigadaId,  
      investigacionId,
      brigadaexpertoSet {
        brigadaExpertoId,
        expertoCc
      }
    }
  }
`;
