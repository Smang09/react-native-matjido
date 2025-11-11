import React, {Ref} from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';

import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';

interface InputFieldProps extends TextInputProps {
  ref?: Ref<TextInput>;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
}

const InputField = ({
  ref,
  error,
  touched,
  disabled = false,
  ...props
}: InputFieldProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View>
      <TextInput
        ref={ref}
        autoCapitalize="none"
        spellCheck={false}
        autoCorrect={false}
        editable={!disabled}
        placeholderTextColor={colors[theme].GRAY_500}
        style={[
          styles.input,
          disabled && styles.disabled,
          props.multiline && styles.multiLine,
          touched && Boolean(error) && styles.inputError,
        ]}
        {...props}
      />
      {touched && Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    input: {
      justifyContent: 'center',
      height: 50,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      borderRadius: 15,
      backgroundColor: colors[theme].GRAY_100,
      color: colors[theme].BLACK,
      fontSize: 16,
    },
    multiLine: {
      height: 150,
      paddingVertical: 10,
      textAlignVertical: 'top',
    },
    inputError: {
      borderWidth: 1,
      borderColor: colors[theme].PINK,
    },
    error: {
      color: colors[theme].PINK,
      fontSize: 12,
      paddingTop: 5,
    },
    disabled: {
      backgroundColor: colors[theme].GRAY_200,
      color: colors[theme].GRAY_700,
    },
  });

export default InputField;
