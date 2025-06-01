import { gql } from '@apollo/client';

export const INFORMATION_ABOUT_TASK_FOR_ID_INVESTIGATION = gql`
  query InformationAboutTaskForIdInvestigation($idInvestigation: Int!) {
    informationAboutTaskForIdInvestigation(idInvestigation: $idInvestigation) {
        tareaId,
        nombre,
        descripcion,
        estado,
        expertoCc,
        fechaEjecucion
    }
  }
`;
