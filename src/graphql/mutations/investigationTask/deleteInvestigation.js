import { gql } from '@apollo/client';

export const DELETE_INVESTIGATION = gql`
  mutation DeleteInvestigation($id: Int!) {
    deleteInvestigation(id: $id) {
      success
    }
  }
`;
