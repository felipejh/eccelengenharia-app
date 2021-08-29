import React, { FC } from 'react';
import { ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';

import colors from '~/styles/colors';

import { Container, ContainerModal, TextLoading } from './styles';

interface Props {
  loading: boolean;
  text?: string;
}

const LoadingModal: FC<Props> = ({ text, loading }) => {
  return (
    <Container>
      <Modal isVisible={loading}>
        <ContainerModal>
          <ActivityIndicator color={colors.orange_light} />
          {text && <TextLoading>{text}</TextLoading>}
        </ContainerModal>
      </Modal>
    </Container>
  );
};

export default LoadingModal;
