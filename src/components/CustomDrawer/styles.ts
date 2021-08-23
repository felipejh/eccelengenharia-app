import styled from 'styled-components/native';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

export const TextWelcome = styled.Text`
  font-family: ${fonts.heading};
  color: ${colors.white};
  font-size: 20px;
  padding: 20px 15px 5px;
`;

export const Line = styled.View`
  width: 90%;
  align-self: center;
  height: 1px;
  background: ${colors.white};
  margin-bottom: 20px;
`;
