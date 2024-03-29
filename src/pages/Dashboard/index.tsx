﻿import React, { FC, useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { differenceInDays, format, parseISO } from 'date-fns';
import NetInfo from '@react-native-community/netinfo';
import { RootState } from '~/store/modules/rootReducer';
import LoadingModal from '~/components/LoadingModal';
import { Construction, ConstructionProps } from '~/models/construction.model';
import colors from '~/styles/colors';
import { isExistsEccelFolder } from '~/utils/utils';
import { getAllData } from '~/services/allService';
import { setLastSyncDate } from '~/store/modules/storage/actions';

import {
  Container,
  ContainerInputFilter,
  IconInputFilter,
  InputFilter,
  Content,
  List,
  ContainerConstruction,
  ImgConstruction,
  ContainerText,
  TextTypeConstruction,
  TextNameConstruction,
} from './styles';
import getRealm from '~/services/realm';
import api from '~/services/api';
import { getConstructionModelAdapter } from '~/services/constructionService';

import {
  sendQueueService,
  sendChecklistQueue,
} from '~/services/offlineQueueService';
import {
  dequeueOccurrence,
  dequeueChecklist,
} from '~/store/modules/offlineQueue/actions';

const Dashboard: FC<ConstructionProps> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { lastSyncDate } = useSelector((state: RootState) => state.storage);
  const { listOccurrence, listChecklist } = useSelector(
    (state: RootState) => state.offlineQueue,
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [listConstruction, setListConstruction] = useState<Array<Construction>>(
    [],
  );

  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected as boolean);
    });

    return () => removeNetInfoSubscription();
  }, []);

  useEffect(() => {
    const sendQueue = async () => {
      if (isConnected) {
        listOccurrence.forEach(async occurrence => {
          const isSubmitted = await sendQueueService(occurrence);

          if (isSubmitted) {
            dispatch(dequeueOccurrence({ id: occurrence.id }));
          }
        });

        listChecklist.forEach(async checklist => {
          const isSubmitted = await sendChecklistQueue(checklist);

          if (isSubmitted) {
            dispatch(dequeueChecklist({ id: checklist.id }));
          }
        });
      }
    };

    sendQueue();
  }, [isConnected, listOccurrence]);

  const [filteredConstruction, setFilteredConstructions] =
    useState<Array<Construction>>(listConstruction);

  async function loadConstructionList() {
    try {
      const realm = await getRealm();
      const data = realm
        .objects('Construction')
        .sorted('percentualConclusao', true);

      setListConstruction(JSON.parse(JSON.stringify(data)));
      setFilteredConstructions(JSON.parse(JSON.stringify(data)));
      realm.close();
    } catch (error) {
      Alert.alert('Atenção', `Ocorreu um erro ao buscar as obras2: ${error}`);
    }

    if (isConnected) {
      try {
        const response: AxiosResponse<Array<Construction>> = await api.get(
          '/api/v1/obras',
        );

        const constructionList = await getConstructionModelAdapter(
          response.data,
        );

        const realm = await getRealm();

        realm.write(() => {
          constructionList
            .filter(construction => construction.ativo === 1)
            .forEach(construction => {
              realm.create(
                'Construction',
                construction,
                Realm.UpdateMode.Modified,
              );
            });

          const data = realm
            .objects('Construction')
            .sorted('percentualConclusao', true);

          setListConstruction(JSON.parse(JSON.stringify(data)));
          setFilteredConstructions(JSON.parse(JSON.stringify(data)));
        });

        realm.close();
      } catch (error) {
        Alert.alert('Atenção', `Ocorreu um erro ao buscar as obras: ${error}`);
      }
    }
  }

  useEffect(() => {
    async function loadCache() {
      const isExistsCache = await isExistsEccelFolder();

      try {
        if (
          lastSyncDate &&
          differenceInDays(new Date(), parseISO(lastSyncDate)) < 1 &&
          isExistsCache
        ) {
          // console.tron.log('Houve sincronização TOTAL hoje');
          // console.tron.log(`lastSyncDate: ${lastSyncDate}`);
          // console.tron.log(
          //   `diff: ${differenceInDays(new Date(), lastSyncDate)}`,
          // );
          await loadConstructionList();
          return;
        }
        // console.tron.log('Não houve sincronização TOTAL hoje');
        // console.tron.log(`lastSyncDate: ${lastSyncDate}`);

        setLoading(true);

        await getAllData();

        const realm = await getRealm();

        const data = realm
          .objects('Construction')
          .sorted('percentualConclusao', true);

        setListConstruction(JSON.parse(JSON.stringify(data)));
        setFilteredConstructions(JSON.parse(JSON.stringify(data)));

        realm.close();

        setLoading(false);
        dispatch(
          setLastSyncDate(format(new Date(), "yyyy-MM-dd'T'HH:mm:ssXXX")),
        );
      } catch {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    loadCache();
  }, [lastSyncDate]);

  useEffect(() => {
    setFilteredConstructions(listConstruction);
  }, [listConstruction]);

  const [borderFilter, setBorderFilter] = useState({});
  const [iconColor, setIconColor] = useState(colors.gray);

  const onFocusFilter = () => {
    setBorderFilter({
      borderWidth: 1,
      borderColor: colors.orange_light,
    });
    setIconColor(colors.orange_light);
  };

  const onBlurFilter = () => {
    setBorderFilter({});
    setIconColor(colors.gray);
  };

  const handleFilter = (constructionName: string) => {
    if (constructionName) {
      const filtered = listConstruction.filter(c =>
        c.nome.toLowerCase().includes(constructionName.toLowerCase()),
      );
      setFilteredConstructions(filtered);
    } else {
      setFilteredConstructions(listConstruction);
    }
  };

  const handleNavigateToPlans = (item: Construction) => {
    const {
      id,
      descType,
      nome,
      imgSystemPath,
      percentualConclusao,
      solvedOccurrences,
      pendingOccurrences,
    } = item;

    navigation.navigate('Plans', {
      id,
      descType,
      nome,
      imgSystemPath,
      percentualConclusao,
      solvedOccurrences,
      pendingOccurrences,
    });
  };

  return (
    <Container>
      <Content>
        <ContainerInputFilter style={borderFilter}>
          <InputFilter
            placeholder="Buscar obra..."
            onChangeText={handleFilter}
            onBlur={onBlurFilter}
            onFocus={onFocusFilter}
          />
          <IconInputFilter name="search" size={20} color={iconColor} />
        </ContainerInputFilter>

        <LoadingModal text="Sincronizando dados..." loading={loading} />

        <List
          data={filteredConstruction}
          keyExtractor={(item: Construction) => String(item.id)}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ContainerConstruction onPress={() => handleNavigateToPlans(item)}>
              <ImgConstruction
                source={{
                  uri:
                    Platform.OS === 'android'
                      ? `file://${item.imgSystemPath}`
                      : `${item.imgSystemPath}`,
                }}
              />
              <ContainerText>
                <TextTypeConstruction>{item.descType}</TextTypeConstruction>
                <TextNameConstruction>{item.nome}</TextNameConstruction>
              </ContainerText>
            </ContainerConstruction>
          )}
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
