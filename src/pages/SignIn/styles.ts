import styled from 'styled-components/native';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

export const Background = styled.ImageBackground.attrs({
  resizeMode: 'cover',
})`
  flex: 1;
  justify-content: center;
`;

export const FormContainer = styled.View`
  margin: 20px;
`;

export const Logo = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 50%;
  align-self: center;
`;

export const SignUpButton = styled.TouchableOpacity`
  align-self: center;
  padding: 25px;
`;

export const SignUpText = styled.Text`
  color: ${colors.white};
  font-family: ${fonts.text};
  font-size: 12px;
`;

export const VersionText = styled.Text`
  font-family: ${fonts.text};
  text-align: center;
  color: ${colors.white};
`;
