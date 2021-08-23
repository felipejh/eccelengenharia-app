import React, { FC } from 'react';
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';

import { Circle } from './styles';

type Props = TouchableWithoutFeedbackProps;

const CheckboxCircle: FC<Omit<Props, 'children'>> = ({ ...rest }) => {
  return (
    <TouchableWithoutFeedback {...rest}>
      <Circle />
    </TouchableWithoutFeedback>
  );
};

export default CheckboxCircle;
