import {useQueryErrorResetBoundary} from '@tanstack/react-query';
import React, {PropsWithChildren} from 'react';
import {ErrorBoundary, FallbackProps} from 'react-error-boundary';
import {StyleSheet, Text, View} from 'react-native';

import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';

import CustomButton from './CustomButton';

const FallbackComponent = ({resetErrorBoundary}: FallbackProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>잠시 후 다시 시도해 주세요.</Text>
      <Text style={styles.descriptionText}>
        요청 사항을 처리하는 데 실패했습니다.
      </Text>
      <CustomButton
        label="다시 시도"
        onPress={resetErrorBoundary}
        style={styles.retryButton}
      />
    </View>
  );
};

const RetryErrorBoundary = ({children}: PropsWithChildren) => {
  const {reset} = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={FallbackComponent}>
      {children}
    </ErrorBoundary>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      backgroundColor: colors[theme].WHITE,
    },
    titleText: {
      color: colors[theme].BLACK,
      fontSize: 18,
      fontWeight: 500,
    },
    descriptionText: {
      color: colors[theme].GRAY_500,
      fontSize: 14,
    },
    retryButton: {
      width: '50%',
      marginTop: 20,
    },
  });

export default RetryErrorBoundary;
