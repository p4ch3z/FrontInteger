import { gql } from '@apollo/client';

export const GET_TASKS_FOR_EXPERT = gql`
  query GetTasksForExpert($ccExperto: Int!) {
    listTasksForExpert(ccExperto: $ccExperto) {
      tareaId
      nombre
      descripcion
      estado
    }
  }
`;
