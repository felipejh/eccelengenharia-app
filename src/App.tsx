import React, { useEffect } from 'react';
import { SENTRY_DSN } from 'react-native-dotenv';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import '~/config/ReactotronConfig';
import codePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';
import * as Sentry from '@sentry/react-native';
import { OfflineQueueProvider } from './context/OfflineQueue';

import { store, persistor } from '~/store';

import Routes from '~/routes';
import colors from './styles/colors';

const App: React.FC = () => {
  useEffect(() => {
    codePush.sync({
      installMode: codePush.InstallMode.IMMEDIATE,
    });

    SplashScreen.hide();
  }, []);

  Sentry.init({
    dsn: SENTRY_DSN,
  });

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" backgroundColor={colors.gray} />
          <OfflineQueueProvider>
            <Routes />
          </OfflineQueueProvider>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);
