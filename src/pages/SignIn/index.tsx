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
} from './styles';

import bgLogin from '~/assets/bg_login.png';
import logo from '~/assets/logo_inicial.png';
import { RootState } from '~/store/modules/rootReducer';
import colors from '~/styles/colors';

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
    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.tron.log('You can use the camera');
        } else {
          console.tron.log('Camera permission denied');
        }
      } catch (err) {
        console.tron.warn(err);
      }
    };
    if (Platform.OS === 'android') {
      requestCameraPermission();
    }
  }, []);

  const handleSignIn = ({ user, password }: SignInFormData) => {
    // if (!user || !password) {
    //   Alert.alert('Atenção!', 'Usuário e senha são obrigatórios.');
    //   return;
    // }

    dispatch(
      signInRequest({
        user: 'apple@apple.com',
        password: 'apple123',
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
        </Background>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
