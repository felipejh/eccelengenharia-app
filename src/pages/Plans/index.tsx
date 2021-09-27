import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { useDispatch, useSelector } from 'react-redux';
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
import { isConnected } from '~/utils/utils';
import { getPlanListRequest } from '~/store/modules/plan/actions';
import { RootState } from '~/store/modules/rootReducer';
import LoadingModal from '~/components/LoadingModal';

const Plans: React.FC = () => {
  const route = useRoute<PlansScreenRouteProp>();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    id: constructionId,
    imgSystemPath,
    completionPercentage,
    solvedOccurrences = 0,
    pendingOccurrences = 0,
  } = route.params;

  const [filteredPlans, setFilteredPlans] = useState<Array<Plan>>([]);

  const { listPlans, loading } = useSelector((state: RootState) => state.plan);

  async function loadPlans() {
    if (await isConnected()) {
      dispatch(getPlanListRequest(constructionId));
    }
  }

  useEffect(() => {
    loadPlans();
    // console.tron.log(listPlans);
  }, []);

  useEffect(() => {
    const listPlansConstruction = listPlans.filter(
      plan => plan.constructionId === constructionId,
    );

    // console.tron.log(listPlansConstruction);
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

  const handleNavigateToPlan = (plan: Plan) => {
    navigation.navigate('Occurrences', {
      ...plan,
    });
  };

  return (
    <Container>
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
                progress={Number(completionPercentage) / 100}
                width={200}
                height={10}
                color={colors.green}
                borderWidth={0}
                unfilledColor={colors.black_strong}
              />
              <ValueProgress>
                {Number(completionPercentage).toFixed()} %
              </ValueProgress>
            </ContainerProgressAndLabel>
          </ContainerProgress>
        </ContainerImgProgress>

        <LoadingModal text="Carregando plantas..." loading={loading} />

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
            <ContainerPlan onPress={() => handleNavigateToPlan(item)}>
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
