import React, { FC, ReactElement } from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProperties } from 'react-native-gesture-handler';
import colors from '~/styles/colors';

import { ButtonContainer, TextButton } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string | ReactElement;
  active?: boolean;
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  active,
  loading = false,
  ...rest
}) => (
  <ButtonContainer {...rest} active={active}>
    {loading ? (
      <ActivityIndicator color={colors.white} />
    ) : (
      <TextButton active={active}>{children}</TextButton>
    )}
  </ButtonContainer>
);

export default Button;

Button.defaultProps = {
  active: true,
};
