import React, { useRef, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Platform,
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useDispatch, useSelector } from 'react-redux';
import { signInRequest } from '~/store/modules/auth/actions';
import Button from '~/components/Button';
import Input from '~/components/Input';

import {
  Background,
  FormContainer,
  Logo,
  SignUpButton,
  SignUpText,
  VersionText,
} from './styles';

import bgLogin from '~/assets/bg_login.png';
import logo from '~/assets/logo_inicial.png';
import { RootState } from '~/store/modules/rootReducer';
import colors from '~/styles/colors';
import appData from '~/config/appData';

interface SignInFormData {
  user: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    async function requestPermissions() {
      const requestExternalStoragePermissions = async () => {
        const read = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        const write = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );

        if (
          !(
            read === PermissionsAndroid.RESULTS.GRANTED &&
            write === PermissionsAndroid.RESULTS.GRANTED
          )
        ) {
          Alert.alert(
            'Este aplicativo não funcionará offline sem permissão para acessar arquivos',
          );
        }
      };

      if (Platform.OS === 'android') {
        await requestExternalStoragePermissions();
      }
    }

    requestPermissions();
  }, []);

  const handleSignIn = async ({ user, password }: SignInFormData) => {
    if (!user || !password) {
      Alert.alert('Atenção!', 'Usuário e senha são obrigatórios.');
      return;
    }

    // dispatch(
    //   signInRequest({
    //     user: 'compras@eccelengenharia.com.br',
    //     password: 'eccel123',
    //   }),
    // );
    dispatch(
      signInRequest({
        user,
        password,
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
              {loading ? <ActivityIndicator color={colors.white} /> : 'ENTRAR'}
            </Button>

            <SignUpButton onPress={() => navigation.navigate('SignUp')}>
              <SignUpText>CADASTRE-SE</SignUpText>
            </SignUpButton>
          </FormContainer>

          <VersionText>{appData.version}</VersionText>
        </Background>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
