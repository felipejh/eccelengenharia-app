import React, { useMemo } from 'react';
import { Alert } from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import { format, parseISO } from 'date-fns';
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
  VersionText,
} from './styles';
import { deleteImgFolder } from '~/utils/utils';
import appData from '~/config/appData';

const CustomDrawer: React.FC<DrawerContentComponentProps> = props => {
  const dispatch = useDispatch();
  const { navigation } = props;

  const { displayName } = useSelector((state: RootState) => state.auth);
  const { lastSyncDate } = useSelector((state: RootState) => state.storage);

  const syncDate = useMemo(() => {
    if (lastSyncDate) {
      return format(parseISO(lastSyncDate), 'dd/MM/yyyy HH:mm:ss', {
        locale: ptBR,
      });
    }
    return '';
  }, [lastSyncDate]);

  const handleSignOut = () => {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          await deleteImgFolder();
          dispatch(signOut());
        },
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

      <VersionText>{appData.version}</VersionText>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
