import { gql } from '@apollo/client';

const GET_ALL_PHOTOS = gql`
  query {
    allPhotos {
    urlFotografia
    fotografiaId
    coordenadasGeograficas
    novedadId
    }
  }
`;