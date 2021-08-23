import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import { ConstructionStack } from '~/routes/stack.routes';

import CustomDrawer from '~/components/CustomDrawer';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

const Drawer = createDrawerNavigator();

const DrawerRoutes: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      initialRouteName="Dashboard"
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawer {...props} />
      )}
      drawerContentOptions={{
        contentContainerStyle: { backgroundColor: colors.orange_light },
        style: { backgroundColor: colors.orange_light, paddingVertical: 20 },
        activeTintColor: colors.white,
        inactiveTintColor: colors.white,
        activeBackgroundColor: colors.orange_strong,
        labelStyle: { fontFamily: fonts.heading, fontSize: 20 },
        itemStyle: { width: '100%', borderRadius: 10 },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={ConstructionStack}
        options={{ drawerLabel: 'OBRAS' }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
