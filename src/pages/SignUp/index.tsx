import React from 'react';
import { useNavigation } from '@react-navigation/native';

import bgLogin from '~/assets/bg_login.png';
import {
  Container,
  Background,
  TextDescription,
  TextLink,
  ButtonBack,
  TextBack,
} from './styles';

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Background source={bgLogin}>
        <TextDescription>
          Para utilizar este aplicativo, efetue seu cadastro conosco em nosso
          site:
        </TextDescription>
        <TextLink>https://www.eccelincorporadora.com.br/</TextLink>

        <ButtonBack onPress={() => navigation.goBack()}>
          <TextBack>{'<'} VOLTAR</TextBack>
        </ButtonBack>
      </Background>
    </Container>
  );
};

export default SignUp;
