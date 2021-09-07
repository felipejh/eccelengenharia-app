import styled from 'styled-components/native';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

export const Container = styled.SafeAreaView`
  background: ${colors.gray};
  flex: 1;
`;

export const Background = styled.ImageBackground.attrs({
  resizeMode: 'cover',
})`
  flex: 1;
  justify-content: center;
`;

export const TextDescription = styled.Text`
  color: ${colors.white};
  font-family: ${fonts.text};
  text-align: center;
  font-size: 15px;
`;

export const TextLink = styled.Text`
  color: ${colors.white};
  font-family: ${fonts.text};
  text-align: center;
  font-size: 15px;
  margin-top: 20px;
`;

export const ButtonBack = styled.TouchableOpacity``;

export const TextBack = styled.Text`
  color: ${colors.gray_light};
  font-family: ${fonts.heading};
  text-align: center;
  font-size: 15px;
  margin-top: 30px;
`;
