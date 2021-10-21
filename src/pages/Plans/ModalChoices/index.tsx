import React, { FC } from 'react';
import Modal from 'react-native-modal';

import {
  ContainerModal,
  ChecklistButton,
  OccurrencesButton,
  ChecklistButtonText,
  OccurrenceButtonText,
  CancelButton,
  CancelButtonText,
} from './styles';

interface Props {
  isVisible: boolean;
  onClickChecklist: () => void;
  onClickOccurrences: () => void;
  onClickCancel: () => void;
}

const ModalChoices: FC<Props> = ({
  isVisible,
  onClickChecklist,
  onClickOccurrences,
  onClickCancel,
}) => {
  return (
    <Modal isVisible={isVisible}>
      <ContainerModal>
        <ChecklistButton onPress={onClickChecklist}>
          <ChecklistButtonText>CHECKLIST</ChecklistButtonText>
        </ChecklistButton>
        <OccurrencesButton onPress={onClickOccurrences}>
          <OccurrenceButtonText>OCORRÊNCIAS</OccurrenceButtonText>
        </OccurrencesButton>
        <CancelButton onPress={onClickCancel}>
          <CancelButtonText>Cancelar</CancelButtonText>
        </CancelButton>
      </ContainerModal>
    </Modal>
  );
};

export default ModalChoices;
