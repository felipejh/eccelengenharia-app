import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';
import { ChecklistAnswer } from '~/models/checklist-answers.model';

export const Container = styled.View``;

export const ContainerHeader = styled.View``;

export const TextItemConferir = styled.Text`
  font-family: ${fonts.heading};
  color: ${colors.black_light};
  font-size: 18px;
`;

export const ContainerTolerancia = styled.View`
  flex-direction: row;
`;

export const TextToleranciaLabel = styled.Text`
  font-family: ${fonts.heading};
  color: ${colors.black_light};
`;

export const TextToleranciaValue = styled.Text`
  font-family: ${fonts.text};
  color: ${colors.black_light};
`;

export const List = styled(
  FlatList as new () => FlatList<ChecklistAnswer>,
).attrs({
  contentContainerStyle: {
    paddingBottom: 32,
  },
})``;

export const ContainerList = styled.View``;

export const ContainerRow = styled.View`
  flex-direction: row;
`;

export const TextLabel = styled.Text``;

export const TextValue = styled.Text``;
