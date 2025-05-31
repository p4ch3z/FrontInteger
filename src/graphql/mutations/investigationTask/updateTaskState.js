import { gql } from '@apollo/client';

export const UPDATE_TASK_STATE = gql`
  mutation updateTaskState(
    $tareaId: Int!
    $estado: String!
  ) {
    updateTaskState(
      tareaId: $tareaId
      estado: $estado
    ) {
      task {
        tareaId,
        nombre,
        descripcion,
        estado,
        expertoCc
      }
    }
  }
`;