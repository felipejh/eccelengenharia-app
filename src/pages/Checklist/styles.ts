import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Checklist } from '~/models/checklist.model';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

export const Container = styled.View`
  flex: 1;
  background: ${colors.black_strong};
`;

export const TextEmpty = styled.Text`
  font-family: ${fonts.heading};
  color: ${colors.white};
  font-size: 20px;
  margin: 20px 15px;
`;

export const List = styled(FlatList as new () => FlatList<Checklist>).attrs({
  contentContainerStyle: {
    paddingBottom: 32,
  },
})``;

export const ContainerList = styled.View`
  border-radius: 4px;
  padding: 15px 15px 0;
  elevation: 4;
  shadow-opacity: 0.75;
  shadow-radius: 5px;
  shadow-color: ${colors.black_strong};
  shadow-offset: 0px 0px;
  margin: 10px 10px 0;
  background: ${colors.white};
`;

export const ContainerButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0 10px;
  /* border: 1px solid #f29; */
`;

export const TextDetails = styled.Text`
  font-family: ${fonts.heading};
  color: ${colors.orange_strong};
`;

export const TextApprove = styled.Text`
  font-family: ${fonts.heading};
  color: ${colors.green};
`;
export const TextDisapprove = styled.Text`
  font-family: ${fonts.heading};
  color: ${colors.red};
`;

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

export const ContainerStatus = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TextStatusLabel = styled.Text`
  font-family: ${fonts.heading};
  color: ${colors.black_light};
`;

export const TextStatusValue = styled.Text<{ status?: string }>`
  font-family: ${fonts.heading};
  text-transform: capitalize;
  color: ${colors.gray_light};
  ${({ status }) =>
    status === 'APROVADO' &&
    `
    color: ${colors.green};
  `}
  ${({ status }) =>
    status === 'REPROVADO' &&
    `
    color: ${colors.red};
  `}
`;

export const ContainerUser = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TextUserLabel = styled.Text`
  font-family: ${fonts.heading};
  color: ${colors.black_light};
`;

export const TextUserValue = styled.Text`
  font-family: ${fonts.text};
  color: ${colors.black_light};
  text-transform: capitalize;
`;
