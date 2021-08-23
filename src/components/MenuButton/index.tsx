import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colors from '~/styles/colors';

interface Props {
  onPress: () => void;
}

const MenuButton: React.FC<Props> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Icon
      name="menu"
      size={30}
      color={colors.white}
      style={{ marginRight: 20 }}
    />
  </TouchableOpacity>
);

export default MenuButton;
