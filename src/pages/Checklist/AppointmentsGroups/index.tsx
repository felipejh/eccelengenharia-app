import React, { useEffect, useState } from 'react';
import * as Sentry from '@sentry/react-native';
import { Alert, TouchableOpacity } from 'react-native';
import { AxiosResponse } from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Group } from '~/models/groups.model';
import api from '~/services/api';
import LoadingModal from '~/components/LoadingModal';

import { Container, TextTitle, List, ContainerList, TextGroup } from './styles';
import { ChecklistScreenRouteProp } from '~/models/checklist.model';

const AppointmentsGroups: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ChecklistScreenRouteProp>();
  const selectedPlan = route.params;

  const [loading, setLoading] = useState<boolean>(false);
  const [listGroups, setListGroups] = useState<Array<Group>>([]);

  useEffect(() => {
    async function loadGroups() {
      try {
        setLoading(true);
        const response: AxiosResponse<Array<Group>> = await api.get(
          '/api/v1/grupos',
        );

        if (response.status !== 200) {
          Alert.alert('Erro ao buscar grupos', `${response.status}`);
          return;
        }

        const { data } = response;

        data.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          return 0;
        });

        setListGroups(data);
      } catch (error) {
        Sentry.captureException(error);
        Alert.alert('Ocorreu um erro', `${error}`);
      } finally {
        setLoading(false);
      }
    }

    loadGroups();
  }, []);

  const handlePressItem = (item: Group) => {
    navigation.navigate('Checklist', {
      ...selectedPlan,
      gruposapontamentoId: item.id,
    });
  };

  return (
    <Container>
      <TextTitle>Escolha um grupo</TextTitle>

      <List
        data={listGroups}
        keyExtractor={(group: Group) => String(group.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePressItem(item)}>
            <ContainerList>
              <TextGroup>
                {item.id} - {item.titulo}
              </TextGroup>
            </ContainerList>
          </TouchableOpacity>
        )}
      />

      <LoadingModal loading={loading} text="Carregando" />
    </Container>
  );
};

export default AppointmentsGroups;
