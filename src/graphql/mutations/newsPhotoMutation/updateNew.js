import { gql } from '@apollo/client';

export const UPDATE_NEWS = gql`
  mutation UpdateNews(
    $novedadId: Int!
    $nombre: String
    $comentario: String
    $investigacionId: Int
  ) {
    updateNew(
      novedadId: $novedadId
      nombre: $nombre
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