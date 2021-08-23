import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
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
import { getPlansList } from '~/services/plansService';

const Plans: React.FC = () => {
  const route = useRoute<PlansScreenRouteProp>();
  const navigation = useNavigation();

  const {
    id: constructionId,
    img,
    completionPercentage,
    solvedOccurrences = 0,
    pendingOccurrences = 0,
  } = route.params;

  const [plans, setPlans] = useState<Array<Plan>>([]);
  const [filteredPlans, setFilteredPlans] = useState<Array<Plan>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function loadPlans() {
    setLoading(true);
    try {
      const response = await getPlansList({ constructionId });
      setPlans(response);
      setFilteredPlans(response);
      setLoading(false);
    } catch (error) {
      setPlans([]);
      setFilteredPlans([]);
      setLoading(false);
      Alert.alert('Ops', `Ocorreu um erro: ${error}`);
    }
  }

  useEffect(() => {
    loadPlans();
  }, []);

  const handleFilter = (planName: string) => {
    if (planName) {
      const filtered = filteredPlans.filter(p =>
        p.name.toLowerCase().includes(planName.toLowerCase()),
      );
      setFilteredPlans(filtered);
    } else {
      setFilteredPlans(plans);
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
          <ConstructionImg source={{ uri: img }} />
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
          onRefresh={loadPlans}
          numColumns={2}
          refreshing={loading}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ContainerPlan onPress={() => handleNavigateToPlan(item)}>
              <ImgPlan
                source={{
                  uri: item.img,
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
