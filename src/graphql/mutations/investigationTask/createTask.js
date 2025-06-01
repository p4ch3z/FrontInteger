import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation CreateTask($nombre: String!, $descripcion: String!, $estado: String!, $expertoCc: Int!, $fechaEjecucion: Date!, $investigacionId: Int!) {
    createTask(nombre: $nombre, descripcion: $descripcion, estado: $estado, expertoCc: $expertoCc, fechaEjecucion: $fechaEjecucion, investigacionId: $investigacionId) {
      task{
        tareaId,
        nombre,
        descripcion,
        estado
        }
    }
  }
`;
