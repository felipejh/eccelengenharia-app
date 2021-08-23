import React, { FC } from 'react';
import { TouchableOpacityProps } from 'react-native';
import colors from '~/styles/colors';

import { Container, Icon } from './styles';

interface Props extends TouchableOpacityProps {
  checked: boolean;
}

const Checkbox: FC<Props> = ({ onPress, checked }) => {
  return (
    <Container onPress={onPress}>
      <Icon
        name="check"
        size={20}
        color={checked ? colors.gray_light : colors.gray}
      />
    </Container>
  );
};

export default Checkbox;
