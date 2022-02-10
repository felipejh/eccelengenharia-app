import styled from 'styled-components/native';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${colors.black_strong};
  justify-content: space-between;
`;

export const CardConcluded = styled.View`
  background: ${colors.gray};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;

  /* padding: 20px;
  width: 90%; */
  align-self: center;
  align-items: center;
  bottom: 0px;

  flex-direction: row;

  padding: 20px 55px;
  width: 100%;
`;

export const TextConcluded = styled.Text`
  font-family: ${fonts.heading};
  color: ${colors.white};
  margin-left: 10px;
`;

export const ContentCardPending = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
`;

export const TextPendingOccurrence = styled.Text`
  font-family: ${fonts.heading};
  color: ${colors.white};
  font-size: 16px;
`;

export const TextDetailsPendingOccurrence = styled.Text`
  font-family: ${fonts.heading};
  color: ${colors.white};
  margin-top: 10px;
  margin-bottom: 5px;
`;

export const Line = styled.View`
  border: 1px solid ${colors.gray};
  width: 90%;
  align-self: center;
`;

export const TextConnectionStatus = styled.Text`
  color: ${colors.gray_light};
  align-self: center;
  padding: 15px;
  position: absolute;
`;
