import { AxiosResponse } from 'axios';
import { API_URL } from 'react-native-dotenv';
import { Construction } from '~/models/construction.model';
import api from '~/services/api';
import getConstructionType from '~/utils/getConstructionType';
import { getImgSystemPath } from '~/utils/utils';

interface ConstructionListService {
  (): Promise<AxiosResponse<Array<Construction>>>;
}

export const getConstructionList: ConstructionListService = async () => {
  return api.get('/api/v1/obras');
};

export async function getConstructionModelAdapter(
  constructionList: Array<Construction>,
): Promise<Array<Construction>> {
  const data = await Promise.all(
    constructionList.map(
      async (construction): Promise<Construction> => ({
        ...construction,
        descType: getConstructionType(construction.tipo),
        imgSystemPath: await getImgSystemPath(
          `${API_URL}${construction.url}`,
          construction.imagem,
        ),
      }),
    ),
  );

  return data;
}
