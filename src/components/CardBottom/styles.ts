import styled from 'styled-components/native';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

export const Container = styled.View`
  padding: 20px 5px;
  width: 100%;
`;

export const Header = styled.View`
  background: ${colors.orange_light};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 10px;
`;

export const Content = styled.View`
  background: ${colors.black_light};

  padding: 0 0 10px;
`;

export const TextHeader = styled.Text`
  color: ${colors.white};
  font-family: ${fonts.heading};
  font-size: 20px;
`;
