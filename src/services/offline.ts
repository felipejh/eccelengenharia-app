import { put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import NetInfo from '@react-native-community/netinfo';
import { OFFLINE, ONLINE } from 'redux-offline-queue';

export function* startWatchingNetworkConnectivity(): any {
  const channel = eventChannel(emitter => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const connectionState = state.isConnected;
      emitter(connectionState);
    });

    return () => unsubscribe();
  });

  try {
    while (true) {
      const isConnected = yield take(channel);
      if (isConnected) {
        yield put({ type: ONLINE });
      } else {
        yield put({ type: OFFLINE });
      }
    }
  } finally {
    channel.close();
  }
}
