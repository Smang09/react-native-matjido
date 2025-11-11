import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import React, {ComponentProps} from 'react';
import {Pressable, StyleSheet} from 'react-native';

import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';

type SolidIconName = Extract<
  ComponentProps<typeof FontAwesome6>,
  {iconStyle: 'solid'}
>['name'];

interface MapIconButtonProps {
  name: SolidIconName;
  onPress: () => void;
}

const MapIconButton = ({name, onPress}: MapIconButtonProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <FontAwesome6
        name={name}
        iconStyle="solid"
        size={25}
        color={colors[theme].BLACK}
      />
    </Pressable>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors[theme].WHITE,
      marginVertical: 5,
      width: 50,
      height: 50,
      borderRadius: 15,
      boxShadow: '0 0 6px rgba(0, 0, 0, 0.2)',
    },
  });

export default MapIconButton;
