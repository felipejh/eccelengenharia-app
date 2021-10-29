import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';
import { ChecklistAnswer } from '~/models/checklist-answers.model';

export const Container = styled.View``;

export const ContainerHeader = styled.View`
  background: ${colors.orange_light};
  padding: 20px;
`;

export const TextItemConferir = styled.Text`
  font-family: ${fonts.heading};
  color: ${colors.white};
  font-size: 18px;
`;

export const ContainerTolerancia = styled.View`
  flex-direction: row;
`;

export const TextToleranciaLabel = styled.Text`
  font-family: ${fonts.heading};
  color: ${colors.white};
`;

export const TextToleranciaValue = styled.Text`
  font-family: ${fonts.text};
  color: ${colors.white};
`;

export const List = styled(
  FlatList as new () => FlatList<ChecklistAnswer>,
).attrs({
  contentContainerStyle: {
    paddingBottom: 32,
  },
})``;

export const ContainerList = styled.View`
  padding: 5px 10px;
`;

export const ContainerRow = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

export const TextLabel = styled.Text`
  font-size: 14px;
  font-family: ${fonts.text};
  color: ${colors.black_light};
`;

export const TextValue = styled.Text<{ status?: string }>`
  font-size: 16px;
  font-family: ${fonts.heading};
  color: ${colors.black_light};
  text-transform: capitalize;
  ${({ status }) =>
    status === 'APROVADO' &&
    `
    color: ${colors.green};
  `}
  ${({ status }) =>
    status === 'REPROVADO' &&
    `
    color: ${colors.red};
  `};
`;
