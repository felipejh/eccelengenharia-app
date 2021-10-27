import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Group } from '~/models/groups.model';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

export const Container = styled.View`
  flex: 1;
  background: ${colors.black_strong};
`;

export const TextTitle = styled.Text`
  font-family: ${fonts.heading};
  color: ${colors.white};
  font-size: 20px;
  margin: 20px 15px;
`;

export const List = styled(FlatList as new () => FlatList<Group>).attrs({
  contentContainerStyle: {
    paddingBottom: 32,
  },
})``;

export const ContainerList = styled.View`
  border-radius: 4px;
  padding: 10px;
  elevation: 4;
  shadow-opacity: 0.75;
  shadow-radius: 5px;
  shadow-color: ${colors.black_strong};
  shadow-offset: 0px 0px;
  margin: 10px 10px 0;
  background: ${colors.white};
  justify-content: center;
`;

export const TextGroup = styled.Text`
  font-family: ${fonts.text};
  color: ${colors.black_strong};
  font-size: 14px;
`;
