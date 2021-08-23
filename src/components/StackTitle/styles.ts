import styled from 'styled-components/native';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${colors.white};
  font-family: ${fonts.heading};
  font-size: 16px;
`;

export const Subtitle = styled.Text`
  color: ${colors.gray_light};
  font-family: ${fonts.heading};
  font-size: 12px;
`;
