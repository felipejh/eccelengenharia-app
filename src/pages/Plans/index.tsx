import React, { useState, useEffect } from 'react';
import { Alert, RefreshControl } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { AxiosResponse } from 'axios';
import { Plan, PlansScreenRouteProp } from '~/models/plans.model';
import getConstructionType from '~/utils/getConstructionType';

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
import { isConnected } from '~/utils/utils';
import api from '~/services/api';
import ModalChoices from '~/pages/Plans/ModalChoices';

const Plans: React.FC = () => {
  const route = useRoute<PlansScreenRouteProp>();
  const navigation = useNavigation();

  const {
    id: constructionId,
    imgUrl,
    percentualConclusao,
    solvedOccurrences = '0',
    pendingOccurrences = '0',
  } = route.params;

  const [loading, setLoading] = useState<boolean>(false);
  const [listPlans, setListPlans] = useState<Array<Plan>>([]);
  const [filteredPlans, setFilteredPlans] = useState<Array<Plan>>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan>();
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);

  async function loadPlans() {
    if (await isConnected()) {
      try {
        setLoading(true);

        const response: AxiosResponse<Array<Plan>> = await api.get(
          '/api/v1/plantas',
        );

        const newPlans = response.data
          .filter(plan => plan.obraId === constructionId && plan.ativo === 1)
          .map(plan => ({
            ...plan,
            descType: getConstructionType(plan.tipo),
            imgUrl: `${API_URL}${plan.url}`,
          }))
          .sort((a, b) => {
            if (a.nome < b.nome) {
              return -1;
            }
            return 0;
          });

        setListPlans(newPlans);
        setFilteredPlans(newPlans);
        setLoading(false);
      } catch (err) {
        Alert.alert('Ops', `Ocorreu um erro ao carregar as plantas: ${err}`, [
          {
            text: 'OK',
            onPress: () => setLoading(false),
          },
        ]);
      }
    }
  }

  useEffect(() => {
    loadPlans();
  }, []);

  const handleFilter = (planName: string) => {
    if (planName) {
      const filtered = listPlans.filter(p =>
        p.nome.toLowerCase().startsWith(planName.toLowerCase()),
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
    navigation.navigate('AppointmentsGroups', {
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
              uri: imgUrl,
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
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={loadPlans}
              tintColor="#fff"
              titleColor="#fff"
            />
          }
          renderItem={({ item }) => (
            <ContainerPlan onPress={() => handlePressPlan(item)}>
              <ImgPlan
                source={{
                  uri: item.imgUrl,
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
