import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Checklist } from '~/models/checklist.model';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

export const Container = styled.View`
  flex: 1;
  background: ${colors.black_strong};
`;

export const List = styled(FlatList as new () => FlatList<Checklist>).attrs({
  contentContainerStyle: {
    paddingBottom: 32,
  },
})``;

export const ContainerList = styled.View`
  border-radius: 4px;
  padding: 15px;
  elevation: 4;
  shadow-opacity: 0.75;
  shadow-radius: 5px;
  shadow-color: ${colors.black_strong};
  shadow-offset: 0px 0px;
  margin: 10px 10px 0;
  background: ${colors.white};
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

export const TextStatusValue = styled.Text<{ color: string }>`
  font-family: ${fonts.heading};
  color: ${props => props.color};
`;
