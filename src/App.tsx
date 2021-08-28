import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import '~/config/ReactotronConfig';
import CodePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';
import * as Sentry from '@sentry/react-native';

import { store, persistor } from '~/store';

import Routes from '~/routes';

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  Sentry.init({
    dsn: 'https://60ed7fbd7b8448fd974139cf9891689b@o794976.ingest.sentry.io/5935475',
  });

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" />
          <Routes />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
