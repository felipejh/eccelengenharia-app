import React, { useRef } from 'react';
import {
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from 'react-native-dotenv';
import { signInRequest } from '~/store/modules/auth/actions';
import Button from '~/components/Button';
import Input from '~/components/Input';

import { Background, FormContainer, Logo } from './styles';

import bgLogin from '~/assets/bg_login.png';
import logo from '~/assets/logo_inicial.png';
import { RootState } from '~/store/modules/rootReducer';
import colors from '~/styles/colors';

interface SignInFormData {
  user: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  const handleSignIn = ({ user, password }: SignInFormData) => {
    dispatch(
      signInRequest({
        user: 'compras@eccelengenharia.com.br',
        password: '99fff995f5437980d81bbd1cc6032cd1',
      }),
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
      >
        <Background source={bgLogin}>
          <FormContainer>
            <Logo source={logo} />

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                name="user"
                icon="user"
                placeholder="Usuário"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
            </Form>

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                JSON.stringify(API_URL)
              )}
            </Button>
          </FormContainer>
        </Background>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
