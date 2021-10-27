import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';

import { useSelector } from 'react-redux';

import DrawerRoutes from '~/routes/drawer.routes';

import { RootState } from '~/store/modules/rootReducer';

import SignIn from '~/pages/SignIn';
import Dashboard from '~/pages/Dashboard';
import Plans from '~/pages/Plans';
import Occurrences from '~/pages/Occurrences';

import StackTitle from '~/components/StackTitle';
import MenuButton from '~/components/MenuButton';

import { StackParamList } from '~/routes/@types';
import { PlansProps } from '~/models/plans.model';

import colors from '~/styles/colors';
import { ConstructionProps } from '~/models/construction.model';
import SignUp from '~/pages/SignUp';
import Checklist from '~/pages/Checklist';
import ChecklistAnswers from '~/pages/ChecklistAnswers';
import AppointmentsGroups from '~/pages/Checklist/AppointmentsGroups';

const Stack = createStackNavigator<StackParamList>();

export const ConstructionStack: FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={({ navigation }: ConstructionProps) => ({
        headerTitle: 'Obras',
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: colors.gray,
          borderBottomWidth: 3,
          borderBottomColor: colors.orange_light,
        },
        headerRight: () => (
          <MenuButton
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        ),
      })}
    />
    <Stack.Screen
      name="Plans"
      component={Plans}
      options={({ route }: PlansProps) => {
        const { nome, descType } = route.params;
        return {
          headerTitle: () => <StackTitle title={nome} subtitle={descType} />,
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.gray,
          },
        };
      }}
    />
    <Stack.Screen
      name="Checklist"
      component={Checklist}
      options={() => {
        return {
          headerTitle: 'Checklist',
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.gray,
          },
        };
      }}
    />
    <Stack.Screen
      name="AppointmentsGroups"
      component={AppointmentsGroups}
      options={() => {
        return {
          headerTitle: 'Checklist',
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.gray,
          },
        };
      }}
    />
    <Stack.Screen
      name="ChecklistAnswers"
      component={ChecklistAnswers}
      options={() => {
        return {
          headerTitle: 'Checklist - Detalhes',
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.gray,
          },
        };
      }}
    />
    <Stack.Screen
      name="Occurrences"
      component={Occurrences}
      options={() => {
        return {
          headerTitle: 'Ocorrências',
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.gray,
          },
        };
      }}
    />
  </Stack.Navigator>
);

export const StackRoutes: FC = () => {
  const { isSigned } = useSelector((state: RootState) => state.auth);

  return (
    <Stack.Navigator headerMode="none">
      {!isSigned ? (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={() => ({
              headerTitle: '',
              headerTransparent: true,
            })}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={() => ({
              headerTitle: 'Cadastre-se',
            })}
          />
        </>
      ) : (
        <Stack.Screen name="Drawer" component={DrawerRoutes} />
      )}
    </Stack.Navigator>
  );
};
