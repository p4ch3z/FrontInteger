import { gql } from '@apollo/client';

export const CREATE_INVESTIGATION = gql`
  mutation CreateInvestigation(
    $fecha_inicio: Date!
    $fecha_fin: Date!
    $coordenadas_geograficas: String!
    $nombre: String!
  ) {
    create_investigation(
      fecha_inicio: $fecha_inicio
      fecha_fin: $fecha_fin
      coordenadas_geograficas: $coordenadas_geograficas
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