import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

interface Props {
  top?: string;
  left?: string;
  color?: string;
}

export const Container = styled.TouchableHighlight<Props>`
  top: ${props => props.top};
  left: ${props => props.left};

  border-radius: 25px;

  justify-content: center;
  align-items: center;

  position: absolute;
`;

export const ContainerNew = styled.View`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background: transparent;
  border: 2px solid ${colors.gray};
  justify-content: center;
  align-items: center;
`;

export const BorderWhite = styled.View`
  border: 1px solid ${colors.white};
  border-radius: 16px;
`;

export const ContainerExists = styled.View`
  background: ${colors.black_light};
  border: 2px solid ${colors.gray};
  border-radius: 25px;
  justify-content: center;
  padding: 5px;
`;

export const TextAppointmentId = styled.Text`
  color: ${colors.white};
  font-family: ${fonts.heading};
  margin: 0 5px;
`;

export const Circle = styled.View<Props>`
  background: ${props => (props.color ? props.color : colors.orange_light)};
  border-radius: 9px;
  width: 18px;
  height: 18px;

  justify-content: center;
  align-items: center;
`;

export const Icon = styled(FeatherIcon)``;
