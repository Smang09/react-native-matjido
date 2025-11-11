import React, {useRef} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import {errorMessages} from '@/constants/messages';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import {validateSignup} from '@/utils/validation';

const SignupScreen = () => {
  const passwordRef = useRef<TextInput>(null);
  const passwordConfirmRef = useRef<TextInput>(null);
  const {signupMutation, loginMutation} = useAuth();
  const signupForm = useForm({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validateSignup,
  });

  const handleSubmit = () => {
    signupForm.setAllTouched();
    const hasErrors = Object.values(signupForm.errors).some(e => e !== '');

    if (hasErrors) {
      return;
    }

    const {email, password} = signupForm.values;

    signupMutation.mutate(
      {email, password},
      {
        onSuccess: () => loginMutation.mutate({email, password}),
        onError: error =>
          Toast.show({
            type: 'error',
            text1:
              error.response?.data.message || errorMessages.UNEXPECTED_ERROR,
          }),
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          inputMode="email"
          submitBehavior="submit"
          returnKeyType="next"
          autoFocus
          onSubmitEditing={() => passwordRef.current?.focus()}
          touched={signupForm.touched.email}
          error={signupForm.errors.email}
          {...signupForm.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          textContentType="oneTimeCode"
          submitBehavior="submit"
          secureTextEntry
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          touched={signupForm.touched.password}
          error={signupForm.errors.password}
          {...signupForm.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          secureTextEntry
          onSubmitEditing={handleSubmit}
          touched={signupForm.touched.passwordConfirm}
          error={signupForm.errors.passwordConfirm}
          {...signupForm.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label="회원가입" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default SignupScreen;
