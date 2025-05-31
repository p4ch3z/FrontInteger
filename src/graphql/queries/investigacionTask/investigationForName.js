import { gql } from '@apollo/client';

export const INVESTIGACION_FOR_NAME = gql`
  query InvestigacionForName($name: String!) {
    investigacionForName(name: $name)
  }
`;
