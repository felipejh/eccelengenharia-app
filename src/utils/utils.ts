import NetInfo from '@react-native-community/netinfo';
import { Platform } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import RNFetchBlob from 'rn-fetch-blob';
import * as Sentry from '@sentry/react-native';
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

    const systemPath = `${PictureDir}/Eccel/${imgName}`;

    const exists = await fs.exists(systemPath);

    if (!exists) {
      const path = await config({
        path: systemPath,
        fileCache: true,
        overwrite: true,
      }).fetch('GET', imgUri);

      return path.data;
    }

    return systemPath;
  } catch (error) {
    Sentry.captureException(`getImgSystemPath: ${error}`);
    return '';
  }
}

export async function deleteImgFolder(): Promise<void> {
  try {
    const { fs } = RNFetchBlob;
    const PictureDir =
      Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.PictureDir;

    await fs.unlink(`${PictureDir}/Eccel/`);
  } catch (error) {
    Sentry.captureException(error);
  }
}

export async function isExistsEccelFolder(): Promise<boolean> {
  try {
    const { fs } = RNFetchBlob;
    const PictureDir =
      Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.PictureDir;

    const isExists = await fs.ls(`${PictureDir}/Eccel/`);

    if (isExists.length) {
      return true;
    }
    return false;
  } catch (error) {
    Sentry.captureException(error);
    return false;
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
  console.tron.log('UTILS_SERVICE');
  return data;
}

export const normalizeRealmData = <T>(data: Realm.Results<Realm.Object>): T => {
  return JSON.parse(JSON.stringify(data));
};
