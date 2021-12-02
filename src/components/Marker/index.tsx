import React, { FC } from 'react';
import { TouchableHighlightProps, View } from 'react-native';
import colors from '~/styles/colors';
import { Occurrence } from '~/models/occurrences.model';

import {
  Container,
  Circle,
  CircleNew,
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
  scale?: number;
}

const Marker: FC<Props> = ({
  top,
  left,
  onClickMarker,
  occurrence,
  showConcluded,
  scale = 100,
}) => {
  const handleClickMarker = () => {
    if (occurrence && onClickMarker) onClickMarker(occurrence);
  };

  return (
    <Container top={top} left={left} onPress={handleClickMarker}>
      <>
        {!occurrence && (
          <ContainerNew scale={scale}>
            <BorderWhite scale={scale}>
              <CircleNew scale={scale}>
                <Icon
                  name="plus"
                  size={(scale * 18) / 100}
                  color={colors.white}
                />
              </CircleNew>
            </BorderWhite>
          </ContainerNew>
        )}
        {occurrence && occurrence.adiado === 1 && occurrence.concluido !== 1 && (
          <ContainerExists scale={scale}>
            <View style={{ flexDirection: 'row' }}>
              <Circle color={colors.yellow} scale={scale}>
                <Icon
                  name="clock"
                  size={(scale * 18) / 100}
                  color={colors.white}
                />
              </Circle>

              <TextAppointmentId scale={scale}>
                {occurrence.apontamentoId}
              </TextAppointmentId>
            </View>
          </ContainerExists>
        )}
        {occurrence && occurrence.adiado !== 1 && occurrence.concluido !== 1 && (
          <ContainerExists scale={scale}>
            <View style={{ flexDirection: 'row' }}>
              <Circle color={colors.red} scale={scale}>
                <Icon
                  name="alert-circle"
                  size={(scale * 18) / 100}
                  color={colors.white}
                />
              </Circle>

              <TextAppointmentId scale={scale}>
                {occurrence.apontamentoId}
              </TextAppointmentId>
            </View>
          </ContainerExists>
        )}
        {occurrence && showConcluded && occurrence.concluido === 1 && (
          <ContainerExists scale={scale}>
            <View style={{ flexDirection: 'row' }}>
              <Circle color={colors.green} scale={scale}>
                <Icon
                  name="check-circle"
                  size={(scale * 18) / 100}
                  color={colors.white}
                />
              </Circle>

              <TextAppointmentId scale={scale}>
                {occurrence.apontamentoId}
              </TextAppointmentId>
            </View>
          </ContainerExists>
        )}
      </>
    </Container>
  );
};

export default Marker;
