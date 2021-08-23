import React, { FC } from 'react';
import { TouchableHighlightProps, View } from 'react-native';
import colors from '~/styles/colors';
import { Occurrence } from '~/models/occurrences.model';

import {
  Container,
  Circle,
  Icon,
  ContainerNew,
  BorderWhite,
  ContainerExists,
  TextAppointmentId,
} from './styles';

interface Props extends TouchableHighlightProps {
  top: string;
  left: string;
  occurrence?: Occurrence;
  showConcluded?: boolean;
  onClickMarker?: (occurrence: Occurrence) => void;
}

const Marker: FC<Props> = ({
  top,
  left,
  onClickMarker,
  occurrence,
  showConcluded,
}) => {
  const handleClickMarker = () => {
    if (occurrence && onClickMarker) onClickMarker(occurrence);
  };

  return (
    <Container top={top} left={left} onPress={handleClickMarker}>
      <>
        {!occurrence && (
          <ContainerNew>
            <BorderWhite>
              <Circle>
                <Icon name="plus" size={18} color={colors.white} />
              </Circle>
            </BorderWhite>
          </ContainerNew>
        )}
        {occurrence && occurrence.adiado === 1 && occurrence.concluido !== 1 && (
          <ContainerExists>
            <View style={{ flexDirection: 'row' }}>
              <Circle color={colors.yellow}>
                <Icon name="clock" size={18} color={colors.white} />
              </Circle>

              <TextAppointmentId>{occurrence.apontamentoId}</TextAppointmentId>
            </View>
          </ContainerExists>
        )}
        {occurrence && occurrence.adiado !== 1 && occurrence.concluido !== 1 && (
          <ContainerExists>
            <View style={{ flexDirection: 'row' }}>
              <Circle color={colors.red}>
                <Icon name="alert-circle" size={18} color={colors.white} />
              </Circle>

              <TextAppointmentId>{occurrence.apontamentoId}</TextAppointmentId>
            </View>
          </ContainerExists>
        )}
        {occurrence && showConcluded && occurrence.concluido === 1 && (
          <ContainerExists>
            <View style={{ flexDirection: 'row' }}>
              <Circle color={colors.green}>
                <Icon name="check-circle" size={18} color={colors.white} />
              </Circle>

              <TextAppointmentId>{occurrence.apontamentoId}</TextAppointmentId>
            </View>
          </ContainerExists>
        )}
      </>
    </Container>
  );
};

export default Marker;
