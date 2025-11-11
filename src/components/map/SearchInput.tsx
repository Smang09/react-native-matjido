import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';

import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';

interface SearchInputProps extends TextInputProps {
  onSubmit: () => void;
}

const SearchInput = ({onSubmit, ...props}: SearchInputProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholderTextColor={colors[theme].GRAY_500}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        {...props}
      />
      <FontAwesome6
        name="magnifying-glass"
        iconStyle="solid"
        size={20}
        color={colors[theme].BLACK}
        onPress={onSubmit}
      />
    </View>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      borderRadius: 15,
    },
    input: {
      flex: 1,
      paddingVertical: 0,
      paddingLeft: 0,
      fontSize: 16,
      color: colors[theme].BLACK,
    },
  });

export default SearchInput;
