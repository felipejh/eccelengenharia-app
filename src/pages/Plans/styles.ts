import styled from 'styled-components/native';
import { FlatList, Dimensions } from 'react-native';
import { Plan } from '~/models/plans.model';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

const window = Dimensions.get('window');

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${colors.black_strong};
`;

export const ConstructionCard = styled.View`
  background: ${colors.orange_light};
  padding: 20px;
`;

export const ContainerImgProgress = styled.View`
  flex-direction: row;
`;

export const ConstructionImg = styled.Image.attrs({
  resizeMode: 'cover',
})`
  /* width: 75px;
  height: 90px; */
  width: ${window.width / 3 - 22}px;
  height: ${window.width / 3 - 11}px;

  border-radius: 8px;
`;

export const ContainerProgress = styled.View`
  padding: 10px;
`;

export const TextProgress = styled.Text`
  color: ${colors.white};
  font-family: ${fonts.heading};
`;

export const ContainerProgressAndLabel = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ValueProgress = styled.Text`
  color: ${colors.white};
  font-family: ${fonts.heading};
  margin-left: 5px;
`;

export const ContainerOccurrences = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;

  margin-top: 10px;
`;

export const ContainerLabelOccurrences = styled.View`
  align-items: flex-end;
`;

export const TextOccurrencesRegister = styled.Text`
  font-family: ${fonts.text};
  font-size: 10px;
  color: ${colors.white};
`;

export const TextOccurrences = styled.Text`
  font-family: ${fonts.heading};
  font-size: 10px;
  color: ${colors.white};
`;

export const ContainerResolved = styled.View`
  margin-left: 10px;
`;

export const TextResolved = styled.Text`
  font-family: ${fonts.heading};
  font-size: 10px;
  color: ${colors.white};
  margin-top: 5px;
`;

export const ContainerPending = styled.View`
  margin-left: 10px;
`;

export const TextPending = styled.Text`
  font-family: ${fonts.heading};
  font-size: 10px;
  color: ${colors.white};
  margin-top: 5px;
`;

export const BlackCircle = styled.View`
  background: ${colors.black_strong};
  border-radius: 14px;
  align-self: center;
  padding: 5px 10px;
`;

export const TextCircleResolved = styled.Text`
  color: ${colors.green};
  font-family: ${fonts.heading};
`;

export const TextCirclePending = styled.Text`
  color: ${colors.red};
  font-family: ${fonts.heading};
`;

export const Content = styled.View`
  padding: 15px;
`;

export const List = styled(FlatList as new () => FlatList<Plan>).attrs({
  contentContainerStyle: {
    paddingBottom: 32,
  },
})``;

export const ContainerPlan = styled.TouchableOpacity`
  justify-content: flex-start;
  padding: 10px 5px;
  flex: 1;
`;

export const ImgPlan = styled.Image.attrs({
  resizeMode: 'cover',
})`
  /* width: 170px;
  height: 180px; */
  width: ${window.width / 2 - 22}px;
  height: ${window.width / 2 - 11}px;
  border-radius: 8px;
`;

export const TextTypePlan = styled.Text`
  font-size: 12px;
  font-family: Montserrat-SemiBold;
  color: #bdbdbd;

  margin-top: 5px;
`;

export const TextNamePlan = styled.Text`
  font-size: 16px;
  font-family: Montserrat-SemiBold;
  color: #bec4cd;

  margin-top: 5px;
`;
