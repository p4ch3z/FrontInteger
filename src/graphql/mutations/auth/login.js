import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($cc: Int!, $password: String!) {
    login(cc: $cc, password: $password) {
      message
      token
      experto {
        expertoCc
        primerNombre
        segundoNombre
        primerApellido
        segundoApellido
        fechaNacimiento
        clasificacion
      }
    }
  }
`;
