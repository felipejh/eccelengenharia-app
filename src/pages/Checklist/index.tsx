import React, { FC, useState, useEffect } from 'react';
import { Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AxiosResponse } from 'axios';
import { parseISO, isAfter } from 'date-fns';
import { Checklist, ChecklistScreenRouteProp } from '~/models/checklist.model';
import { Plan } from '~/models/plans.model';
import api from '~/services/api';
import LoadingModal from '~/components/LoadingModal';

import {
  Container,
  List,
  ContainerList,
  TextItemConferir,
  ContainerTolerancia,
  TextToleranciaLabel,
  TextToleranciaValue,
  ContainerStatus,
  TextStatusLabel,
  TextStatusValue,
} from './styles';
import colors from '~/styles/colors';

const ChecklistScreen: FC = () => {
  const route = useRoute<ChecklistScreenRouteProp>();
  const { id } = route.params;

  const [listChecklists, setListChecklists] =
    useState<Array<Checklist> | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadPlan() {
      try {
        setLoading(true);
        const response: AxiosResponse<Plan> = await api.get(
          `/api/v1/plantas/${id}`,
        );

        const { data } = response;
        // data.checklist.push(data.checklist.map(d => ({ ...d })));
        // data.checklist.push(data.checklist.map(d => ({ ...d })));
        // data.checklist.push(data.checklist.map(d => ({ ...d })));

        // console.tron.log(data.checklist);
        const test = data.checklist.map(a => {
          const c = [
            {
              id: 2,
              situacao: 'APROVADO',
              dth_resposta: '2021-08-28T08:00:00.003Z',
              createdAt: '2021-09-18T13:26:39.214Z',
              updatedAt: '2021-09-18T13:26:39.214Z',
              checklistId: 2,
              plantaId: 1,
              ocorrenciaId: null,
              usuarioCreateId: 3,
              usuarioUpdateId: null,
              usuarioUpdate: null,
              usuarioCreate: {
                id: 3,
                usuario: 'felipe',
                nome: 'felipe',
              },
            },
            {
              id: 1,
              situacao: 'REPROVADO',
              dth_resposta: '2021-07-28T08:00:00.003Z',
              createdAt: '2021-09-18T13:26:39.214Z',
              updatedAt: '2021-09-18T13:26:39.214Z',
              checklistId: 2,
              plantaId: 1,
              ocorrenciaId: null,
              usuarioCreateId: 3,
              usuarioUpdateId: null,
              usuarioCreate: {
                id: 3,
                usuario: 'felipe',
                nome: 'felipe',
              },
              usuarioUpdate: null,
            },
          ];

          return {
            ...a,
            answers: c,
          };
        });

        const dataSorted: Array<Checklist> = test.map(checklist => {
          const answersSorted = checklist.answers?.sort((a, b) => {
            const dateA = parseISO(a.dth_resposta);
            const dateB = parseISO(b.dth_resposta);

            if (isAfter(dateA, dateB)) {
              return -1;
            }
            return 0;
          });

          return {
            ...checklist,
            answers: answersSorted,
          };
        });

        setListChecklists(dataSorted);
        console.tron.log(dataSorted);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }

    loadPlan();
  }, []);

  return (
    <Container>
      <List
        data={listChecklists}
        keyExtractor={(checklist: Checklist) => String(checklist.id)}
        renderItem={({ item }) => {
          let status = item.answers?.[0].situacao;

          let statusColor =
            item.answers?.[0].situacao === 'APROVADO'
              ? colors.green
              : colors.red;

          if (!item.answers?.[0].situacao) {
            status = 'VERIFICAR';
            statusColor = colors.yellow;
          }
          status = 'VERIFICAR';
          statusColor = colors.gray_light;

          return (
            <ContainerList>
              <TextItemConferir>{item.item_conferir}</TextItemConferir>
              <ContainerTolerancia>
                <TextToleranciaLabel>Tolerância: </TextToleranciaLabel>
                <TextToleranciaValue>{item.tolerancia}</TextToleranciaValue>
              </ContainerTolerancia>

              <ContainerStatus>
                <TextStatusLabel>Situação: </TextStatusLabel>
                <TextStatusValue color={statusColor}>{status}</TextStatusValue>
              </ContainerStatus>
            </ContainerList>
          );
        }}
      />

      <LoadingModal loading={loading} text="Buscando checklists" />
    </Container>
  );
};

export default ChecklistScreen;
