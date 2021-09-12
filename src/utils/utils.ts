import NetInfo from '@react-native-community/netinfo';
import RNFetchBlob from 'rn-fetch-blob';

export async function isConnected(): Promise<boolean> {
  const connection = await NetInfo.fetch().then(state => state.isConnected);

  if (connection) {
    return true;
  }
  return false;
}

export async function getImgSystemPath(
  imgUri: string,
  imgName: string,
): Promise<string> {
  try {
    const path = await RNFetchBlob.config({
      path: `${RNFetchBlob.fs.dirs.PictureDir}/Eccel/${imgName}.jpg`,
    }).fetch('GET', imgUri);

    return path.path();
  } catch {
    return '';
  }
}
