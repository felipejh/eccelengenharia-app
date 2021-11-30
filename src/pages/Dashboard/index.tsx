import React, { FC, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AxiosResponse } from 'axios';
import { API_URL } from 'react-native-dotenv';
import LoadingModal from '~/components/LoadingModal';
import { Construction, ConstructionProps } from '~/models/construction.model';
import colors from '~/styles/colors';
import { isConnected } from '~/utils/utils';

import {
  Container,
  ContainerInputFilter,
  IconInputFilter,
  InputFilter,
  Content,
  List,
  ContainerConstruction,
  ImgConstruction,
  ContainerText,
  TextTypeConstruction,
  TextNameConstruction,
} from './styles';

import api from '~/services/api';
import { getConstructionModelAdapter } from '~/services/constructionService';

const Dashboard: FC<ConstructionProps> = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState<boolean>(false);
  const [listConstruction, setListConstruction] = useState<Array<Construction>>(
    [],
  );

  const [filteredConstruction, setFilteredConstructions] =
    useState<Array<Construction>>(listConstruction);

  useEffect(() => {
    async function loadConstructionList() {
      if (await isConnected()) {
        try {
          setLoading(true);
          const response: AxiosResponse<Array<Construction>> = await api.get(
            '/api/v1/obras',
          );

          const constructionList = await getConstructionModelAdapter(
            response.data,
          );

          const newList = constructionList
            .filter(construction => construction.ativo === 1)
            .map(construction => ({
              ...construction,
              imgUrl: `${API_URL}${construction.url}`,
            }))
            .sort((a, b) => {
              if (a.percentualConclusao > b.percentualConclusao) {
                return -1;
              }
              return 1;
            });

          setListConstruction(newList);
          setFilteredConstructions(newList);
          console.tron.log(newList);
          setLoading(false);
        } catch (error) {
          Alert.alert(
            'Atenção',
            `Ocorreu um erro ao buscar as obras: ${error}`,
            [
              {
                text: 'ok',
                onPress: () => {
                  setLoading(false);
                },
              },
            ],
          );
        }
      }
    }
    loadConstructionList();
  }, []);

  const [borderFilter, setBorderFilter] = useState({});
  const [iconColor, setIconColor] = useState(colors.gray);

  const onFocusFilter = () => {
    setBorderFilter({
      borderWidth: 1,
      borderColor: colors.orange_light,
    });
    setIconColor(colors.orange_light);
  };

  const onBlurFilter = () => {
    setBorderFilter({});
    setIconColor(colors.gray);
  };

  const handleFilter = (constructionName: string) => {
    if (constructionName) {
      const filtered = listConstruction.filter(c =>
        c.nome.toLowerCase().includes(constructionName.toLowerCase()),
      );
      setFilteredConstructions(filtered);
    } else {
      setFilteredConstructions(listConstruction);
    }
  };

  const handleNavigateToPlans = (item: Construction) => {
    const {
      id,
      descType,
      nome,
      imgSystemPath,
      percentualConclusao,
      solvedOccurrences,
      pendingOccurrences,
    } = item;

    navigation.navigate('Plans', {
      id,
      descType,
      nome,
      imgSystemPath,
      percentualConclusao,
      solvedOccurrences,
      pendingOccurrences,
    });
  };

  return (
    <Container>
      <Content>
        <ContainerInputFilter style={borderFilter}>
          <InputFilter
            placeholder="Buscar obra..."
            onChangeText={handleFilter}
            onBlur={onBlurFilter}
            onFocus={onFocusFilter}
          />
          <IconInputFilter name="search" size={20} color={iconColor} />
        </ContainerInputFilter>

        <LoadingModal text="Carregando obras..." loading={loading} />

        <List
          data={filteredConstruction}
          keyExtractor={(item: Construction) => String(item.id)}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ContainerConstruction onPress={() => handleNavigateToPlans(item)}>
              <ImgConstruction source={{ uri: item.imgUrl }} />
              <ContainerText>
                <TextTypeConstruction>{item.descType}</TextTypeConstruction>
                <TextNameConstruction>{item.nome}</TextNameConstruction>
              </ContainerText>
            </ContainerConstruction>
          )}
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
