import React, {ReactNode} from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';

interface CustomButtonProps extends PressableProps {
  label: string | ReactNode;
  variant?: 'filled' | 'outlined';
  size?: 'large' | 'small';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const CustomButton = ({
  label,
  variant = 'filled',
  size = 'large',
  style = null,
  textStyle = null,
  ...props
}: CustomButtonProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        styles[variant],
        styles[size],
        pressed && styles.pressed,
        style,
      ]}
      {...props}>
      {typeof label === 'string' ? (
        <Text style={[styles[`${variant}Text`], textStyle]}>{label}</Text>
      ) : (
        label
      )}
    </Pressable>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
    },
    filled: {
      backgroundColor: colors[theme].PRIMARY,
    },
    outlined: {
      borderWidth: 1,
      borderColor: colors[theme].PRIMARY,
      backgroundColor: colors[theme].WHITE,
    },
    filledText: {
      color: colors[theme].WHITE,
      fontSize: 14,
      fontWeight: 'bold',
    },
    outlinedText: {
      color: colors[theme].PRIMARY,
      fontSize: 14,
      fontWeight: 'bold',
    },
    large: {
      width: '100%',
      height: 48,
    },
    small: {
      paddingHorizontal: 10,
      height: 35,
    },
    pressed: {
      opacity: 0.8,
    },
  });

export default CustomButton;
