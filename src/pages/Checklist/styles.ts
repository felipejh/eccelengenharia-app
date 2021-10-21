import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Checklist } from '~/models/checklist.model';

export const Container = styled.View``;

export const List = styled(FlatList as new () => FlatList<Checklist>).attrs({
  contentContainerStyle: {
    paddingBottom: 32,
  },
})``;

export const ContainerList = styled.View``;
