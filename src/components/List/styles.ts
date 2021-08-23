import styled from 'styled-components/native';

export const Touchable = styled.TouchableOpacity`
  justify-content: center;
  padding: 10px 5px;
`;

export const Img = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 170px;
  height: 180px;
  border-radius: 8px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-family: Montserrat-SemiBold;
  color: #bdbdbd;
  align-self: center;

  margin-top: 5px;
`;

export const Subtitle = styled.Text`
  font-size: 12px;
  font-family: Montserrat-SemiBold;
  color: #bec4cd;
  align-self: center;

  margin-top: 5px;
`;
