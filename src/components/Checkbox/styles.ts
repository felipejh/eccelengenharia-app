import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from '~/styles/colors';

export const Container = styled.TouchableOpacity`
  border: 1px solid ${colors.white};

  padding: 2px;
`;

export const Icon = styled(FeatherIcon)``;
