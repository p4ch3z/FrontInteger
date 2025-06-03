import { gql } from '@apollo/client';

export const VERIFY_TOKEN_QUERY = gql`
  query VerifyToken($token: String!) {
    verifyToken(token: $token) {
      expertoCc
      primerNombre
      segundoNombre
      primerApellido
      segundoApellido
      fechaNacimiento
      clasificacion
      token
    }
  }
`;
