import React, { FC, useState, useEffect } from 'react';
import { Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AxiosResponse } from 'axios';
import { Checklist, ChecklistScreenRouteProp } from '~/models/checklist.model';
import { Plan } from '~/models/plans.model';
import api from '~/services/api';
import LoadingModal from '~/components/LoadingModal';

import { Container, List, ContainerList } from './styles';

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
        setListChecklists(data.checklist);
        console.tron.log(data.checklist);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }

    loadPlan();
  }, []);

  return (
    <Container>
      <LoadingModal loading={loading} text="Buscando checklists" />

      <List
        data={listChecklists}
        keyExtractor={(checklist: Checklist) => String(checklist.id)}
        renderItem={({ item }) => {
          // console.tron.log(item);
          return (
            <ContainerList>
              <Text>{item.item_conferir}</Text>
              <Text>{item.tolerancia}</Text>
              <Text>{item.answers?.[0].situacao}</Text>
            </ContainerList>
          );
        }}
      />
    </Container>
  );
};

export default ChecklistScreen;
