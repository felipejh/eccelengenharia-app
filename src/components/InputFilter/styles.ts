import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '~/styles/colors';

export const Container = styled.View`
  background: ${colors.black_light};
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: rgba(0, 0, 0, 0);
  flex-direction: row;
  align-items: center;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#666',
})`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: Montserrat-Regular;
  padding: 16px 10px;
`;

export const Icon = styled(Feather)`
  margin-right: 10px;
`;
