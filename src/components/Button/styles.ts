import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import colors from '~/styles/colors';

interface ButtonContainerProps {
  active?: boolean;
}

interface TextButtonProps {
  active?: boolean;
}

export const ButtonContainer = styled(RectButton)<ButtonContainerProps>`
  width: 100%;
  height: 60px;
  background: ${props => (props.active ? colors.orange_light : colors.gray)};
  border-radius: 10px;
  margin-top: 8px;

  justify-content: center;
  align-items: center;
`;

export const TextButton = styled.Text<TextButtonProps>`
  color: ${props => (props.active ? colors.white : colors.gray_light)};
  font-size: 14px;
  font-family: Montserrat-SemiBold;
`;
