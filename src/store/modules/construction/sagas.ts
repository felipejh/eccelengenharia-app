import { all, call, put, takeLatest, SagaReturnType } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import api from '~/services/api';
import getConstructionType from '~/utils/getConstructionType';
import { getConstructionList } from '~/services/constructionService';
import { ConstructionTypes } from '~/store/types/construction.types';
import {
  getConstructionListSuccess,
  getConstructionListFailure,
} from '~/store/modules/construction/actions';
import { Construction } from '~/models/construction.model';
import { getImgSystemPath } from '~/utils/utils';

type GetConstructionServiceResponse = SagaReturnType<
  typeof getConstructionList
>;

// async function getImageBase64(uri: string) {
//   const response = await api.get(`/api/v1/image/base64/${uri}`);

//   const { base64 } = response.data;

//   return base64;
// }

export function* getConstruction(): any {
  const ws = '/api/v1/obras';

  const response: GetConstructionServiceResponse = yield call(api.get, ws);

  if (response.status !== 200) {
    Alert.alert('Ocorreu um erro ao buscar as obras');
    return yield put(getConstructionListFailure());
  }

  const data: Array<Construction> = yield all(
    response.data
      .sort((a, b) => {
        if (Number(a.percentualConclusao) < Number(b.percentualConclusao)) {
          return 1;
        }
        return -1;
      })
      .map(async c => ({
        ...c,
        name: c.nome,
        descType: getConstructionType(c.tipo),
        type: c.tipo,
        completionPercentage: c.percentualConclusao,
        active: c.ativo,
        userCreatedId: c.usuarioCreateId,
        userUpdatedId: c.usuarioUpdateId,
        img: `${API_URL}${c.url}`,
        imgSystemPath: await getImgSystemPath(`${API_URL}${c.url}`, c.imagem),
      })),
  );

  return yield put(getConstructionListSuccess(data));
}

export default all([
  takeLatest(ConstructionTypes.GET_CONSTRUCTION_LIST_REQUEST, getConstruction),
]);
