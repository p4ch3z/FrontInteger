import { gql } from '@apollo/client';

export const UPDATE_TASK = gql`
  mutation UpdateTask($nombre: String!, $descripcion: String!, $estado: String!, $expertoCc: Int!, $fechaEjecucion: Date!, $tareaId: Int!, $investigacionId: Int!) {
    updateTask(nombre: $nombre, descripcion: $descripcion, estado: $estado, expertoCc: $expertoCc, fechaEjecucion: $fechaEjecucion, tareaId: $tareaId, investigacionId: $investigacionId) {
      task{
        tareaId,
        nombre,
        descripcion,
        estado
        }
    }
  }
`;
