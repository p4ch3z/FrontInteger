import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation CreateTask($nombre: String!, $descripcion: String!, $estado: String!, $expertoCc: Number!, $fechaEjecucion: Date!, $investigacionId: Number!) {
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
