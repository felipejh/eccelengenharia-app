import styled from 'styled-components/native';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

export const Container = styled.View`
  flex-direction: row;
  align-self: center;
  justify-content: center;
`;

export const Divider = styled.View`
  border: 1px solid ${colors.orange_light};
  height: 50%;
  width: 1px;
  align-self: center;
`;

export const ContainerTouchable = styled.View`
  flex: 1;
  height: 100%;
`;

export const ContainerButton = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
  height: 100%;
`;

export const TextButton = styled.Text`
  color: ${colors.white};
  font-family: ${fonts.heading};
  margin: 0 30px;
`;
