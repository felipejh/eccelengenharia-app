import styled from 'styled-components/native';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

export const TextWelcome = styled.Text`
  font-family: ${fonts.heading};
  color: ${colors.white};
  font-size: 20px;
  padding: 20px 15px 5px;
`;

export const Line = styled.View`
  width: 90%;
  align-self: center;
  height: 1px;
  background: ${colors.white};
  margin-bottom: 20px;
`;

export const SyncButton = styled.TouchableOpacity``;

export const SyncButtonText = styled.Text`
  color: ${colors.white};
  font-family: ${fonts.heading};
  font-size: 20px;
  padding: 10px 20px 0;
`;

export const TextLastSyncDate = styled.Text`
  color: ${colors.white};
  font-family: ${fonts.text};
  font-size: 15px;
  padding: 0 20px;
`;

// contentContainerStyle: { backgroundColor: colors.orange_light },
// style: { backgroundColor: colors.orange_light, paddingVertical: 20 },
// activeTintColor: colors.white,
// inactiveTintColor: colors.white,
// activeBackgroundColor: colors.orange_strong,
// labelStyle: { fontFamily: fonts.heading, fontSize: 20 },
// itemStyle: { width: '100%', borderRadius: 10 },
