import { gql } from '@apollo/client';

export const CREATE_PHOTO = gql`
  mutation CreatePhoto(
    $urlFotografia: String!
    $coordenadasGeograficas: String!
    $novedadId: Int!
  ) {
    createPhoto(
      urlFotografia: $urlFotografia
      coordenadasGeograficas: $coordenadasGeograficas
      novedadId: $novedadId
    ) {
      photo {
        fotografiaId
        urlFotografia
        coordenadasGeograficas
        novedadId
      }
    }
  }
`;
