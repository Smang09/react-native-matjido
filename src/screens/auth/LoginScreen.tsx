import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useRef} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import {colors} from '@/constants/colors';
import {errorMessages} from '@/constants/messages';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import useThemeStore, {Theme} from '@/store/theme';
import {AuthStackParamList} from '@/types/navigation';
import {validateLogin} from '@/utils/validation';

type Navigation = StackNavigationProp<AuthStackParamList>;

const LoginScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const navigation = useNavigation<Navigation>();
  const passwordRef = useRef<TextInput>(null);
  const {loginMutation} = useAuth();
  const loginForm = useForm({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateLogin,
  });

  const handleSubmit = () => {
    loginForm.setAllTouched();
    const hasErrors = Object.values(loginForm.errors).some(e => e !== '');

    if (hasErrors) {
      return;
    }

    loginMutation.mutate(loginForm.values, {
      onError: error =>
        Toast.show({
          type: 'error',
          text1: error.response?.data.message || errorMessages.UNEXPECTED_ERROR,
        }),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/logo.png')}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          inputMode="email"
          submitBehavior="submit"
          returnKeyType="next"
          autoFocus
          onSubmitEditing={() => passwordRef.current?.focus()}
          touched={loginForm.touched.email}
          error={loginForm.errors.email}
          {...loginForm.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          textContentType="oneTimeCode"
          returnKeyType="join"
          maxLength={20}
          secureTextEntry
          onSubmitEditing={handleSubmit}
          touched={loginForm.touched.password}
          error={loginForm.errors.password}
          {...loginForm.getTextInputProps('password')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton label="로그인" onPress={handleSubmit} />
        <CustomButton
          label="카카오 로그인"
          style={styles.kakaoButtonContainer}
          textStyle={styles.kakaoButtonText}
          onPress={() => navigation.navigate('KakaoLogin')}
        />
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.emailText}>이메일로 가입하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    logoContainer: {
      flex: 1,
      alignItems: 'center',
    },
    logo: {
      width: 200,
      height: '100%',
    },
    inputContainer: {
      marginBottom: 30,
      paddingHorizontal: 20,
      gap: 15,
    },
    buttonContainer: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 20,
      gap: 15,
    },
    kakaoButtonContainer: {
      backgroundColor: '#FEE500',
    },
    kakaoButtonText: {
      color: '#191919',
    },
    emailText: {
      padding: 10,
      color: colors[theme].BLACK,
      fontWeight: 500,
      textDecorationLine: 'underline',
    },
  });

export default LoginScreen;
