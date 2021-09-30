import NetInfo from '@react-native-community/netinfo';
import { Platform } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import RNFetchBlob from 'rn-fetch-blob';
import { Construction } from '~/models/construction.model';

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

export async function getObjectModelWithImgPath<T extends Construction>(
  list: Array<T>,
): Promise<Array<T>> {
  const data = await Promise.all(
    list.map(
      async (item): Promise<T> => ({
        ...item,
        imgSystemPath: await getImgSystemPath(
          `${API_URL}${item.url}`,
          item.imagem,
        ),
      }),
    ),
  );

  return data;
}

export const normalizeRealmData = <T>(data: Realm.Results<Realm.Object>): T => {
  return JSON.parse(JSON.stringify(data));
};
