import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Occurrence } from '~/models/occurrences.model';

import {
  Container,
  TextButton,
  Divider,
  ContainerTouchable,
  ContainerButton,
} from './styles';

interface Props {
  data: Occurrence;
  onPressPostponed: () => void;
  onPressConcluded: () => void;
}

const ButtonsOccurrence: FC<Omit<Props, 'children'>> = ({
  data,
  onPressPostponed,
  onPressConcluded,
}) => {
  return (
    <Container>
      {data.adiado !== 1 && (
        <>
          <ContainerTouchable>
            <TouchableOpacity onPress={onPressPostponed}>
              <ContainerButton>
                <TextButton>ADIAR</TextButton>
              </ContainerButton>
            </TouchableOpacity>
          </ContainerTouchable>

          <Divider />
        </>
      )}

      <ContainerTouchable>
        <TouchableOpacity onPress={onPressConcluded}>
          <ContainerButton>
            <TextButton>RESOLVIDA</TextButton>
          </ContainerButton>
        </TouchableOpacity>
      </ContainerTouchable>
    </Container>
  );
};

export default ButtonsOccurrence;
