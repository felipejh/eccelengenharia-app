import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Group } from '~/models/groups.model';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

export const Container = styled.View`
  flex: 1;
  background: ${colors.white};
`;

export const TextTitle = styled.Text`
  font-family: ${fonts.heading};
  color: ${colors.black_light};
  font-size: 20px;
  margin: 20px 15px;
`;

export const List = styled(FlatList as new () => FlatList<Group>).attrs({
  contentContainerStyle: {
    paddingBottom: 32,
  },
})``;

export const ContainerList = styled.View`
  border-bottom-width: 0.8px;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

// export const ContainerList = styled.View`
//   border-radius: 4px;
//   padding: 10px;
//   elevation: 4;
//   shadow-opacity: 0.75;
//   shadow-radius: 5px;
//   shadow-color: ${colors.black_strong};
//   shadow-offset: 0px 0px;
//   margin: 10px 10px 0;
//   background: ${colors.white};
//   justify-content: center;
// `;

export const ContainerText = styled.View`
  flex: 15;
`;

export const ContainerIcon = styled.View`
  flex: 1;
`;

export const TextGroup = styled.Text`
  font-family: ${fonts.text};
  color: ${colors.black_strong};
  font-size: 14px;
`;

export const IconRight = styled(FeatherIcon)`
  padding: 0 5px;
`;
