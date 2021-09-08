import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { FlatList, Dimensions } from 'react-native';
import { Construction } from '~/models/construction.model';
import colors from '~/styles/colors';

const window = Dimensions.get('window');

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${colors.black_strong};
`;

export const Content = styled.View`
  padding: 15px;
`;

export const ContainerInputFilter = styled.View`
  background: ${colors.black_light};
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: rgba(0, 0, 0, 0);
  flex-direction: row;
  align-items: center;
`;

export const InputFilter = styled.TextInput.attrs({
  placeholderTextColor: '#666',
})`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: Montserrat-Regular;
  padding: 16px 10px;
`;

export const IconInputFilter = styled(Feather)`
  margin-right: 10px;
`;

export const List = styled(FlatList as new () => FlatList<Construction>).attrs({
  contentContainerStyle: {
    paddingBottom: 52,
  },
})``;

export const ContainerConstruction = styled.TouchableOpacity`
  justify-content: flex-start;
  /* align-items: center; */
  padding: 10px 5px;
  flex: 1;
`;

export const ImgConstruction = styled.Image.attrs({
  resizeMode: 'cover',
})`
  /* width: 170px;
  height: 180px; */
  width: ${window.width / 2 - 22}px;
  height: ${window.width / 2 - 10}px;
  border-radius: 8px;
  /* flex: 1; */
`;

export const ContainerText = styled.View`
  align-self: flex-start;
`;

export const TextTypeConstruction = styled.Text`
  font-size: 12px;
  font-family: Montserrat-SemiBold;
  color: #bdbdbd;

  margin-top: 5px;
`;

export const TextNameConstruction = styled.Text`
  font-size: 16px;
  font-family: Montserrat-SemiBold;
  color: #bec4cd;

  margin-top: 5px;
`;
