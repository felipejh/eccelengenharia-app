﻿import React, { FC, useState, useEffect } from 'react';
// import { RefreshControl } from 'react-native';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/modules/rootReducer';
import LoadingModal from '~/components/LoadingModal';
import { Construction, ConstructionProps } from '~/models/construction.model';
import colors from '~/styles/colors';
import { isConnected } from '~/utils/utils';
import { getAllData } from '~/services/allService';

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
import { getConstructionListRequest } from '~/store/modules/construction/actions';
import { Occurrence } from '~/models/occurrences.model';
import getRealm from '~/services/realm';

const Dashboard: FC<ConstructionProps> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [listConstruction, setListConstruction] = useState<Array<Construction>>(
    [],
  );

  const [filteredConstruction, setFilteredConstructions] =
    useState<Array<Construction>>(listConstruction);

  // async function loadConstructionList() {
  //   if (await isConnected()) {
  //     dispatch(getConstructionListRequest());
  //   }
  // }

  // useEffect(() => {
  //   loadConstructionList();
  // }, []);

  useEffect(() => {
    async function loadCache() {
      try {
        setLoading(true);

        await getAllData();

        const realm = await getRealm();

        const data = realm
          .objects('Construction')
          .sorted('percentualConclusao', true);

        setListConstruction(JSON.parse(JSON.stringify(data)));
        setFilteredConstructions(JSON.parse(JSON.stringify(data)));
        console.tron.log(JSON.parse(JSON.stringify(data)));
        realm.close();

        setLoading(false);
      } catch {
        setLoading(false);
      }
    }
    loadCache();
  }, []);

  useEffect(() => {
    setFilteredConstructions(listConstruction);
  }, [listConstruction]);

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

  const handleNavigateToPlans = ({
    id,
    descType,
    name,
    imgSystemPath,
    completionPercentage,
    solvedOccurrences,
    pendingOccurrences,
  }: Construction) => {
    navigation.navigate('Plans', {
      id,
      descType,
      name,
      imgSystemPath,
      completionPercentage,
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

        {/* <LoadingModal
          text="Sincronizando dados..."
          loading={
            (listConstruction.length <= 0 && loadingConstruction) ||
            (listPlans.length <= 0 && loadingPlans) ||
            (listGroups.length <= 0 && loadingGroups) ||
            (listOccurrences.length <= 0 && loadingOccurrences)
          }
        /> */}

        <LoadingModal text="Sincronizando dados..." loading={loading} />

        <List
          data={filteredConstruction}
          keyExtractor={(item: Construction) => String(item.id)}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ContainerConstruction onPress={() => handleNavigateToPlans(item)}>
              <ImgConstruction
                source={{
                  uri:
                    Platform.OS === 'android'
                      ? `file://${item.imgSystemPath}`
                      : `${item.imgSystemPath}`,
                }}
              />
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
