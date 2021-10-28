import React, { FC, useState, useEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { AxiosResponse } from 'axios';
import { parseISO, isAfter, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import * as Sentry from '@sentry/react-native';
import { Checklist, ChecklistScreenRouteProp } from '~/models/checklist.model';
import { Plan } from '~/models/plans.model';
import api from '~/services/api';
import LoadingModal from '~/components/LoadingModal';
import { ChecklistAnswer } from '~/models/checklist-answers.model';

import {
  Container,
  TextEmpty,
  List,
  ContainerList,
  ContainerButtons,
  TextDetails,
  TextApprove,
  TextDisapprove,
  TextItemConferir,
  ContainerTolerancia,
  TextToleranciaLabel,
  TextToleranciaValue,
  ContainerStatus,
  TextStatusLabel,
  TextStatusValue,
  ContainerUser,
  TextUserLabel,
  TextUserValue,
} from './styles';

const ChecklistScreen: FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ChecklistScreenRouteProp>();
  console.tron.log(route.params);
  const { id: planId, gruposapontamentoId } = route.params;

  const [listChecklists, setListChecklists] =
    useState<Array<Checklist> | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  async function loadListChecklists() {
    try {
      setLoading(true);
      const response: AxiosResponse<Plan> = await api.get(
        `/api/v1/plantas/${planId}`,
      );

      const { data } = response;

      const dataSorted: Array<Checklist> = data.checklist
        .filter(
          checklist => checklist.gruposapontamentoId === gruposapontamentoId,
        )
        .map(checklist => {
          const answersSorted = checklist.answers
            ?.map((answer: ChecklistAnswer) => ({
              ...answer,
              dateAnswerFormatted: answer.dth_resposta
                ? format(parseISO(answer.dth_resposta), 'dd/MM/yyyy', {
                    locale: ptBR,
                  })
                : '',
            }))
            .sort((a, b) => {
              if (a.dth_resposta && b.dth_resposta) {
                const dateA = parseISO(a.dth_resposta);
                const dateB = parseISO(b.dth_resposta);

                if (isAfter(dateA, dateB)) {
                  return -1;
                }
              }

              return 0;
            });

          return {
            ...checklist,
            answers: answersSorted,
          };
        });

      setListChecklists(dataSorted);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadListChecklists();
  }, []);

  const approveDisapprove = async (
    type: 'APROVADO' | 'REPROVADO',
    checklist: Checklist,
  ) => {
    try {
      setLoading(true);
      await api.post('/api/v1/checklists_answers', {
        situacao: type,
        dth_resposta: new Date(),
        checklistId: checklist.id,
        plantaId: planId,
      });

      if (type === 'REPROVADO') {
        Alert.alert(
          'Sucesso',
          'Checklist respondido. Deseja inserir uma ocorrência?',
          [
            {
              text: 'Não',
              style: 'cancel',
              onPress: () => loadListChecklists(),
            },
            {
              text: 'Sim',
              onPress: () => {
                navigation.navigate('Occurrences', {
                  ...route.params,
                });
                loadListChecklists();
              },
            },
          ],
        );
      } else {
        loadListChecklists();
      }
    } catch (error) {
      Sentry.captureException(error);
      Alert.alert('Ocorreu um erro', `${error}`);
      setLoading(false);
    }
  };

  const handlePressDetails = (item: Checklist) => {
    navigation.navigate('ChecklistAnswers', {
      ...item,
    });
  };

  const handlePressDisapprove = (item: Checklist) => {
    Alert.alert('Reprovar', 'Deseja reprovar o checklist?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => approveDisapprove('REPROVADO', item),
      },
    ]);
  };

  const handlePressApprove = (item: Checklist) => {
    Alert.alert('Aprovar', 'Deseja aprovar o checklist?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => approveDisapprove('APROVADO', item),
      },
    ]);
  };

  return (
    <Container>
      <List
        data={listChecklists}
        keyExtractor={(checklist: Checklist) => String(checklist.id)}
        ListEmptyComponent={<TextEmpty>Nenhum checklist</TextEmpty>}
        renderItem={({ item }) => {
          const status = item.answers?.[0].situacao;

          return (
            <ContainerList status={status || ''}>
              <TextItemConferir>{item.item_conferir}</TextItemConferir>
              <ContainerTolerancia>
                <TextToleranciaLabel>Tolerância: </TextToleranciaLabel>
                <TextToleranciaValue>{item.tolerancia}</TextToleranciaValue>
              </ContainerTolerancia>

              <ContainerStatus>
                <TextStatusLabel>Situação: </TextStatusLabel>
                {status ? (
                  <TextStatusValue status={status}>{status}</TextStatusValue>
                ) : (
                  <TextStatusValue>Não informado</TextStatusValue>
                )}
              </ContainerStatus>

              {status && (
                <ContainerUser>
                  <TextUserLabel>Por: </TextUserLabel>

                  <TextUserValue>
                    {item.answers?.[0].usuarioCreate.nome} -
                    {item.answers?.[0].dateAnswerFormatted}
                  </TextUserValue>
                </ContainerUser>
              )}

              <ContainerButtons>
                <TouchableOpacity onPress={() => handlePressDetails(item)}>
                  <TextDetails>Ver detalhes</TextDetails>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePressDisapprove(item)}>
                  <TextDisapprove>Reprovar</TextDisapprove>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePressApprove(item)}>
                  <TextApprove>Aprovar</TextApprove>
                </TouchableOpacity>
              </ContainerButtons>
            </ContainerList>
          );
        }}
      />

      <LoadingModal loading={loading} text="Carregando..." />
    </Container>
  );
};

export default ChecklistScreen;
