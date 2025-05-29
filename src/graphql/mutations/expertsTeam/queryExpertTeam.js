import { gql } from '@apollo/client';

export const CREATE_TEAM = gql`
  mutation CreateTeam($investigacionId: Int!, $expertosIds: [Int!]!) {
    createTeam(investigacionId: $investigacionId, expertosIds: $expertosIds) {
      success
    }
  }
`;

export const UPDATE_TEAM = gql`
  mutation UpdateTeam($investigacionId: Int!, $expertosIds: [Int!]!) {
    updateTeam(investigacionId: $investigacionId, expertosIds: $expertosIds){
    success}} `;

export const DELETE_TEAM = gql`
  mutation DeleteTeam($investigacionId: Int!) {
    deleteTeam(investigacionId: $investigacionId) {
      success
      }
    }
  `;