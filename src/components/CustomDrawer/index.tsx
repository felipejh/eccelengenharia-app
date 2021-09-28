import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import { RootState } from '~/store/modules/rootReducer';
import { setLastSyncDate } from '~/store/modules/storage/actions';

import {
  TextWelcome,
  Line,
  SyncButton,
  SyncButtonText,
  TextLastSyncDate,
} from './styles';

const CustomDrawer: React.FC<DrawerContentComponentProps> = props => {
  const dispatch = useDispatch();
  const { navigation } = props;

  const [syncDate, setSyncDate] = useState<Date | string>('');

  const { displayName } = useSelector((state: RootState) => state.auth);
  const { lastSyncDate } = useSelector((state: RootState) => state.storage);

  useEffect(() => {
    if (lastSyncDate) {
      const dateFormatted = format(lastSyncDate, 'dd/MM/yyyy HH:mm:ss', {
        locale: ptBR,
      });

      setSyncDate(dateFormatted);
    }
  }, [lastSyncDate]);

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

  const handleSync = async () => {
    dispatch(setLastSyncDate(undefined));
    navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView {...props}>
      <TextWelcome>
        Olá, {'\n'}
        {displayName}
      </TextWelcome>
      <Line />

      <DrawerItemList {...props} />

      <SyncButton onPress={handleSync}>
        <SyncButtonText>SINCRONIZAR</SyncButtonText>
        <TextLastSyncDate>Última: {syncDate}</TextLastSyncDate>
      </SyncButton>

      <DrawerItem onPress={handleSignOut} label="SAIR" {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
