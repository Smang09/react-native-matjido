import Ionicons, {IoniconsIconName} from '@react-native-vector-icons/ionicons';
import React, {ComponentType} from 'react';
import {StyleSheet} from 'react-native';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';

import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';

const createToast =
  (
    Component: ComponentType<BaseToastProps>,
    color: string,
    iconName: IoniconsIconName,
  ) =>
  (props: BaseToastProps) => {
    const {theme} = useThemeStore();
    const styles = styling(theme);

    return (
      <Component
        contentContainerStyle={styles.container}
        style={styles.toast}
        text1Props={{style: styles.text1}}
        text2Props={{style: styles.text2}}
        renderLeadingIcon={() => (
          <Ionicons name={iconName} size={20} color={color} />
        )}
        {...props}
      />
    );
  };

const toastConfig = {
  success: createToast(BaseToast, colors.light.PRIMARY, 'checkmark-circle'),
  error: createToast(ErrorToast, colors.light.RED, 'close-circle'),
};

const AppToast = () => {
  return <Toast config={toastConfig} />;
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 0,
    },
    toast: {
      alignItems: 'center',
      gap: 8,
      borderColor: colors[theme].GRAY_200,
      backgroundColor: colors[theme].WHITE,
      borderWidth: 1,
      borderLeftWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 15,
    },
    text1: {
      color: colors[theme].BLACK,
      fontSize: 14,
      fontWeight: 500,
    },
    text2: {
      color: colors[theme].GRAY_500,
      fontSize: 12,
    },
  });

export default AppToast;
