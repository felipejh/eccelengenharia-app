import NetInfo from '@react-native-community/netinfo';

export async function isConnected(): Promise<boolean> {
  const connection = await NetInfo.fetch().then(state => state.isConnected);

  if (connection) {
    return true;
  }
  return false;
}
