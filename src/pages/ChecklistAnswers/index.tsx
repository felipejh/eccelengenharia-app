import React from 'react';
import { useRoute } from '@react-navigation/native';
import {
  ChecklistAnswer,
  ChecklistAnswersScreenRouteProp,
} from '~/models/checklist-answers.model';

import {
  Container,
  ContainerHeader,
  TextItemConferir,
  ContainerTolerancia,
  TextToleranciaLabel,
  TextToleranciaValue,
  List,
  ContainerList,
  ContainerRow,
  TextLabel,
  TextValue,
} from './styles';

const ChecklistAnswers: React.FC = () => {
  const route = useRoute<ChecklistAnswersScreenRouteProp>();
  const { item_conferir, tolerancia, answers } = route.params;
  console.tron.log(answers);
  return (
    <Container>
      <List
        data={answers}
        keyExtractor={(answer: ChecklistAnswer) => String(answer.id)}
        ListHeaderComponent={
          <ContainerHeader>
            <TextItemConferir>{item_conferir}</TextItemConferir>
            <ContainerTolerancia>
              <TextToleranciaLabel>Tolerância: </TextToleranciaLabel>
              <TextToleranciaValue>{tolerancia}</TextToleranciaValue>
            </ContainerTolerancia>
          </ContainerHeader>
        }
        renderItem={({ item }) => (
          <ContainerList>
            <ContainerRow>
              <TextLabel>Situação: </TextLabel>
              <TextLabel>{item.situacao}</TextLabel>
            </ContainerRow>
            <ContainerRow>
              <TextLabel>Data: </TextLabel>
              <TextLabel>{item.dth_resposta}</TextLabel>
            </ContainerRow>
          </ContainerList>
        )}
      />
    </Container>
  );
};

export default ChecklistAnswers;
