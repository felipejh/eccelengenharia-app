import React, { FC, useState, useEffect } from 'react';
// import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/modules/rootReducer';
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
import { getConstructionListRequest } from '~/store/modules/construction/actions';

const Dashboard: FC<ConstructionProps> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { listConstruction, loading } = useSelector(
    (state: RootState) => state.construction,
  );

  const [filteredConstruction, setFilteredConstructions] =
    useState<Array<Construction>>(listConstruction);

  async function loadConstructionList() {
    if (await isConnected()) {
      dispatch(getConstructionListRequest());
    }
  }

  useEffect(() => {
    loadConstructionList();
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
        c.name.toLowerCase().includes(constructionName.toLowerCase()),
      );
      setFilteredConstructions(filtered);
    } else {
      console.tron.log(listConstruction);
      setFilteredConstructions(listConstruction);
    }
  };

  const handleNavigateToPlans = ({
    id,
    descType,
    name,
    img,
    completionPercentage,
    solvedOccurrences,
    pendingOccurrences,
  }: Construction) => {
    navigation.navigate('Plans', {
      id,
      descType,
      name,
      img,
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

        <LoadingModal
          text="Sincronizando dados..."
          loading={listConstruction.length <= 0 && loading}
        />

        <List
          data={filteredConstruction}
          keyExtractor={(item: Construction) => String(item.id)}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ContainerConstruction onPress={() => handleNavigateToPlans(item)}>
              <ImgConstruction
                source={{ uri: `data:image/png;base64,${item.imgBase64}` }}
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
