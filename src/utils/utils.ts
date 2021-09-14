import NetInfo from '@react-native-community/netinfo';
import { Platform } from 'react-native';
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
    const { config, fs } = RNFetchBlob;
    const PictureDir =
      Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.PictureDir;

    const path = await config({
      path: `${PictureDir}/Eccel/${imgName}`,
    }).fetch('GET', imgUri);

    return path.data;
  } catch {
    return '';
  }
}
