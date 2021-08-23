import styled from 'styled-components/native';

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
