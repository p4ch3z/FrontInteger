import { gql } from '@apollo/client';

export const DELETE_NEWS = gql`
  mutation DeleteNews($novedadId: Int!) {
    deleteNew(novedadId: $novedadId) {
      success
    }
  }
`;
