import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

interface Props {
  top?: string;
  left?: string;
  color?: string;
  scale?: number;
}

export const Container = styled.TouchableHighlight<Props>`
  top: ${props => props.top};
  left: ${props => props.left};

  border-radius: 25px;

  justify-content: center;
  align-items: center;

  position: absolute;
`;

export const ContainerNew = styled.View<Props>`
  width: ${props => (props.scale ? (props.scale * 26) / 100 : '26')}px;
  height: ${props => (props.scale ? (props.scale * 26) / 100 : '26')}px;
  border-radius: 13px;
  background: transparent;
  border: 2px solid ${colors.gray};
  justify-content: center;
  align-items: center;

  padding: ${props => (props.scale ? (props.scale * 5) / 100 : '5')}px;
`;

export const BorderWhite = styled.View<Props>`
  border: ${props => (props.scale ? (props.scale * 1) / 100 : '1')}px solid
    ${colors.white};
  border-radius: 16px;
`;

export const ContainerExists = styled.View<Props>`
  background: ${colors.black_light};
  border: 2px solid ${colors.gray};
  border-radius: 25px;
  justify-content: center;
  padding: ${props => (props.scale ? (props.scale * 5) / 100 : '5')}px;
`;

export const TextAppointmentId = styled.Text<Props>`
  color: ${colors.white};
  font-family: ${fonts.heading};
  margin: 0 5px;
  font-size: ${props => (props.scale ? (props.scale * 14) / 100 : '14')}px;
`;

export const CircleNew = styled.View<Props>`
  background: ${colors.orange_light};
  border-radius: 9px;
  justify-content: center;
  align-items: center;

  width: ${props => (props.scale ? (props.scale * 18) / 100 : '18')}px;
  height: ${props => (props.scale ? (props.scale * 18) / 100 : '18')}px;
`;

export const Circle = styled.View<Props>`
  background: ${props => (props.color ? props.color : colors.orange_light)};
  border-radius: 9px;
  justify-content: center;
  align-items: center;

  width: ${props => (props.scale ? (props.scale * 18) / 100 : '18')}px;
  height: ${props => (props.scale ? (props.scale * 18) / 100 : '18')}px;
`;

export const Icon = styled(FeatherIcon)``;
