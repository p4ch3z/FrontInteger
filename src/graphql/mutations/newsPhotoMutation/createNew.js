import { gql } from '@apollo/client';

export const CREATE_NEWS = gql`
  mutation CreateNews(
    $nombre: String!
    $fecha: Date!
    $comentario: String!
    $investigacionId: Int!
  ) {
    createNew(
      nombre: $nombre
      fecha: $fecha
      comentario: $comentario
      investigacionId: $investigacionId
    ) {
      news {
        novedadId
        nombre
        fecha
        comentario
        investigacionId
      }
    }
  }
`;
