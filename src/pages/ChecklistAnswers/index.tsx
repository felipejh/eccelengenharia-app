import React, { FC } from 'react';
import { useRoute } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
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

const ChecklistAnswers: FC = () => {
  const route = useRoute<ChecklistAnswersScreenRouteProp>();
  const { item_conferir, tolerancia, answers } = route.params;

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
        renderItem={({ item }) => {
          const date = item.dth_resposta
            ? format(parseISO(item.dth_resposta), 'dd/MM/yyyy HH:mm', {
                locale: ptBR,
              })
            : '';

          return (
            <ContainerList>
              <ContainerRow>
                <TextLabel>Data: </TextLabel>
                <TextValue>{date}</TextValue>
              </ContainerRow>
              <ContainerRow>
                <TextLabel>Situação: </TextLabel>
                <TextValue>{item.situacao}</TextValue>
              </ContainerRow>
              <ContainerRow>
                <TextLabel>Usuário: </TextLabel>
                <TextValue>{item.usuarioCreate?.nome}</TextValue>
              </ContainerRow>
            </ContainerList>
          );
        }}
      />
    </Container>
  );
};

export default ChecklistAnswers;
