import { gql } from '@apollo/client';

export const UPDATE_PHOTO = gql`
  mutation UpdatePhoto(
    $fotografiaId: Int!
    $urlFotografia: String
    $coordenadasGeograficas: String
    $novedadId: Int
  ) {
    updatePhoto(
      fotografiaId: $fotografiaId
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