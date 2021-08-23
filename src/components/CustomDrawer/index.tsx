import React from 'react';
import { Alert } from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import { RootState } from '~/store/modules/rootReducer';

import { TextWelcome, Line } from './styles';

const CustomDrawer: React.FC<DrawerContentComponentProps> = props => {
  const dispatch = useDispatch();
  const { displayName } = useSelector((state: RootState) => state.auth);

  const handleSignOut = () => {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => dispatch(signOut()),
      },
    ]);
  };

  return (
    <DrawerContentScrollView {...props}>
      <TextWelcome>
        Olá, {'\n'}
        {displayName}
      </TextWelcome>
      <Line />

      <DrawerItemList {...props} />
      <DrawerItem onPress={handleSignOut} label="SAIR" {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
