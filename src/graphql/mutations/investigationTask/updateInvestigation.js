import { gql } from '@apollo/client';

export const UPDATE_INVESTIGATION = gql`
  mutation UpdateInvestigation(
    $investigacionId: Int!
    $fechaInicio: Date
    $fechaFin: Date
    $coordenadasGeograficas: String
    $nombre: String
  ) {
    updateInvestigation(
      investigacionId: $investigacionId
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