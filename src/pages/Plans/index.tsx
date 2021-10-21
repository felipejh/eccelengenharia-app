import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { AxiosResponse } from 'axios';
import { Plan, PlansScreenRouteProp } from '~/models/plans.model';

import InputFilter from '~/components/InputFilter';

import colors from '~/styles/colors';

import {
  Container,
  ConstructionCard,
  ContainerImgProgress,
  ConstructionImg,
  ContainerProgress,
  TextProgress,
  ContainerProgressAndLabel,
  ValueProgress,
  ContainerOccurrences,
  ContainerLabelOccurrences,
  TextOccurrencesRegister,
  TextOccurrences,
  ContainerResolved,
  TextResolved,
  ContainerPending,
  TextPending,
  BlackCircle,
  TextCircleResolved,
  TextCirclePending,
  Content,
  List,
  ContainerPlan,
  ImgPlan,
  TextTypePlan,
  TextNamePlan,
} from './styles';
import { isConnected, normalizeRealmData } from '~/utils/utils';
import getRealm from '~/services/realm';
import api from '~/services/api';
import { getPlansModelAdapter } from '~/services/plansService';
import ModalChoices from '~/pages/Plans/ModalChoices';

const Plans: React.FC = () => {
  const route = useRoute<PlansScreenRouteProp>();
  const navigation = useNavigation();

  const {
    id: constructionId,
    imgSystemPath,
    percentualConclusao,
    solvedOccurrences = 0,
    pendingOccurrences = 0,
  } = route.params;

  const [listPlans, setListPlans] = useState<Array<Plan>>([]);
  const [filteredPlans, setFilteredPlans] = useState<Array<Plan>>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan>();
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);

  async function loadPlans() {
    const realm = await getRealm();

    const data = realm
      .objects('Plans')
      .filtered(`obraId = ${constructionId}`)
      .sorted('nome');

    const dataNormalized = normalizeRealmData<Array<Plan>>(data);

    setListPlans(dataNormalized);
    setFilteredPlans(dataNormalized);

    if (await isConnected()) {
      const response: AxiosResponse<Array<Plan>> = await api.get(
        '/api/v1/plantas',
      );

      const apiPlans = response.data.filter(
        plan => plan.obraId === constructionId && plan.ativo === 1,
      );

      const newApiPlans = await getPlansModelAdapter(apiPlans);

      realm.write(() => {
        newApiPlans.forEach(plan => {
          realm.create('Plans', plan, Realm.UpdateMode.All);
        });
      });

      setListPlans(newApiPlans);
      setFilteredPlans(newApiPlans);
    }

    realm.close();
  }

  useEffect(() => {
    loadPlans();
  }, []);

  useEffect(() => {
    const listPlansConstruction = listPlans.filter(
      plan => plan.obraId === constructionId,
    );

    setFilteredPlans(listPlansConstruction);
  }, [listPlans]);

  const handleFilter = (planName: string) => {
    if (planName) {
      const filtered = listPlans.filter(p =>
        p.name.toLowerCase().includes(planName.toLowerCase()),
      );
      setFilteredPlans(filtered);
    } else {
      setFilteredPlans(listPlans);
    }
  };

  const handlePressPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsVisibleModal(true);
  };

  const handleNavigateToChecklist = () => {
    setIsVisibleModal(false);
    navigation.navigate('Checklist', {
      ...selectedPlan,
    });
  };

  const handleNavigateToOccurrences = () => {
    setIsVisibleModal(false);
    navigation.navigate('Occurrences', {
      ...selectedPlan,
    });
  };

  return (
    <Container>
      <ModalChoices
        isVisible={isVisibleModal}
        onClickChecklist={handleNavigateToChecklist}
        onClickOccurrences={handleNavigateToOccurrences}
        onClickCancel={() => setIsVisibleModal(false)}
      />

      <ConstructionCard>
        <ContainerImgProgress>
          <ConstructionImg
            source={{
              uri:
                Platform.OS === 'android'
                  ? `file://${imgSystemPath}`
                  : `${imgSystemPath}`,
            }}
          />
          <ContainerProgress>
            <TextProgress>Conclusão da obra</TextProgress>
            <ContainerProgressAndLabel>
              <Progress.Bar
                progress={Number(percentualConclusao) / 100}
                width={200}
                height={10}
                color={colors.green}
                borderWidth={0}
                unfilledColor={colors.black_strong}
              />
              <ValueProgress>
                {Number(percentualConclusao).toFixed()} %
              </ValueProgress>
            </ContainerProgressAndLabel>
          </ContainerProgress>
        </ContainerImgProgress>

        <ContainerOccurrences>
          <ContainerLabelOccurrences>
            <TextOccurrencesRegister>REGISTRO DE</TextOccurrencesRegister>
            <TextOccurrences>OCORRÊNCIAS</TextOccurrences>
          </ContainerLabelOccurrences>

          <ContainerResolved>
            <BlackCircle>
              <TextCircleResolved>{solvedOccurrences}</TextCircleResolved>
            </BlackCircle>
            <TextResolved>RESOLVIDAS</TextResolved>
          </ContainerResolved>

          <ContainerPending>
            <BlackCircle>
              <TextCirclePending>{pendingOccurrences}</TextCirclePending>
            </BlackCircle>
            <TextPending>PENDENTES</TextPending>
          </ContainerPending>
        </ContainerOccurrences>
      </ConstructionCard>

      <Content>
        <InputFilter
          placeholder="Buscar planta..."
          onChangeText={handleFilter}
          autoCapitalize="characters"
        />

        <List
          data={filteredPlans}
          keyExtractor={(plan: Plan) => String(plan.id)}
          // onRefresh={loadPlans}
          numColumns={2}
          // refreshing={loading}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ContainerPlan onPress={() => handlePressPlan(item)}>
              <ImgPlan
                source={{
                  uri:
                    Platform.OS === 'android'
                      ? `file://${item.imgSystemPath}`
                      : `${item.imgSystemPath}`,
                }}
              />
              <TextTypePlan>{item.descType}</TextTypePlan>
              <TextNamePlan>{item.nome}</TextNamePlan>
            </ContainerPlan>
          )}
        />
      </Content>
    </Container>
  );
};

export default Plans;
