import styled from 'styled-components/native';
import fonts from '~/styles/fonts';
import colors from '../../styles/colors';

export const Container = styled.View`
  padding: 10px 5px;
`;

export const TextLabel = styled.Text`
  color: ${colors.white};
  font-family: ${fonts.text};
  margin-left: 5px;
`;
