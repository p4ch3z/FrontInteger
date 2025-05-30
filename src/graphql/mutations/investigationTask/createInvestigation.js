import { gql } from '@apollo/client';

export const CREATE_INVESTIGATION = gql`
  mutation CreateInvestigation(
    $fechaInicio: Date!
    $fechaFin: Date!
    $coordenadasGeograficas: String!
    $nombre: String!
  ) {
    createInvestigation(
      fechaInicio: $fechaInicio
      fechaFin: $fechaFin
      coordenadasGeograficas: $coordenadasGeograficas
      nombre: $nombre
    ) {
      investigacion {
        investigacionId
        nombre
        fechaInicio
        fechaFin
        coordenadasGeograficas
      }
    }
  }
`;