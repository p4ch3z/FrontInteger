import { gql } from '@apollo/client';

export const DELETE_PHOTO = gql`
  mutation DeletePhoto($fotografiaId: Int!) {
    deletePhoto(fotografiaId: $fotografiaId) {
      success
    }
  }
`;