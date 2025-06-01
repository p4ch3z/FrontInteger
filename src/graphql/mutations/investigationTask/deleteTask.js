import { gql } from '@apollo/client';

export const DELETE_TASK = gql`
  mutation DeleteTask($tareaId: Int!) {
    deleteTask(tareaId: $tareaId) {
      success
    }
  }
`;
