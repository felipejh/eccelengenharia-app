import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from '~/styles/colors';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: rgba(0, 0, 0, 0);
  flex-direction: row;
  align-items: center;
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      border-color: ${colors.orange_light};
    `}
`;

export const TInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: Montserrat-Regular;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
