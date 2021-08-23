import React, { useState } from 'react';
import { TextInputProps } from 'react-native';

import colors from '~/styles/colors';

import { Container, Input, Icon } from './styles';

type Props = Pick<
  TextInputProps,
  'placeholder' | 'onChangeText' | 'autoCapitalize'
>;

const InputFilter: React.FC<Props> = ({
  placeholder,
  onChangeText,
  autoCapitalize,
}) => {
  const [borderFilter, setBorderFilter] = useState({});
  const [iconColor, setIconColor] = useState(colors.gray);

  const onFocusFilter = () => {
    setBorderFilter({
      borderWidth: 1,
      borderColor: colors.orange_light,
    });
    setIconColor(colors.orange_light);
  };

  const onBlurFilter = () => {
    setBorderFilter({});
    setIconColor(colors.gray);
  };

  return (
    <Container style={borderFilter}>
      <Input
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlurFilter}
        onFocus={onFocusFilter}
        autoCapitalize={autoCapitalize}
      />
      <Icon name="search" size={20} color={iconColor} />
    </Container>
  );
};

export default InputFilter;
