import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';
import { NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

declare global {
  interface Console {
    tron: any;
  }
}

if (__DEV__) {
  const { scriptURL } = NativeModules.SourceCode;
  const host = scriptURL.split('://')[1].split(':')[0];

  // const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  //   .configure({ host })
  //   .useReactNative()
  //   .use(reactotronRedux())
  //   .use(reactotronSaga())
  //   .connect();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tron = Reactotron.setAsyncStorageHandler!(AsyncStorage)
    .configure({ host })
    .useReactNative()
    .use(reactotronRedux())
    .use(reactotronSaga({ except: [''] }))
    .connect();

  console.tron = tron;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  tron.clear!();
}
