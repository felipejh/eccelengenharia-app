import styled from 'styled-components/native';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

export const Container = styled.View`
  flex: 1;
`;

export const ContainerModal = styled.View`
  margin: 20px;
  background-color: ${colors.white};
  border-radius: 20px;
  padding: 35px;
  align-items: center;
  elevation: 5;
  justify-content: center;
`;

export const TextLoading = styled.Text`
  font-family: ${fonts.text};
  color: ${colors.black_strong};
  margin-top: 20px;
`;
