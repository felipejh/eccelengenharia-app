import styled from 'styled-components/native';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

export const ContainerModal = styled.View`
  margin: 20px;
  background-color: ${colors.white};
  border-radius: 20px;
  padding: 35px;
  align-items: center;
  elevation: 5;
  justify-content: center;
`;

export const ChecklistButton = styled.TouchableOpacity`
  background: ${colors.orange_light};
  width: 100%;
  align-items: center;
  padding: 15px 5px;
  border-radius: 16px;
`;

export const OccurrencesButton = styled.TouchableOpacity`
  background: ${colors.orange_light};
  width: 100%;
  align-items: center;
  padding: 15px 5px;
  margin-top: 30px;
  border-radius: 16px;
`;

export const ChecklistButtonText = styled.Text`
  font-family: ${fonts.heading};
  color: ${colors.white};
  font-size: 20px;
`;

export const OccurrenceButtonText = styled.Text`
  font-family: ${fonts.heading};
  color: ${colors.white};

  font-size: 20px;
`;

export const CancelButton = styled.TouchableOpacity`
  margin-top: 30px;
`;

export const CancelButtonText = styled.Text`
  font-family: ${fonts.text};
  color: ${colors.gray};
  font-size: 16px;
`;
