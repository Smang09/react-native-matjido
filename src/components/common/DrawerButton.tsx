import Ionicons from '@react-native-vector-icons/ionicons';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleProp, StyleSheet, ViewStyle} from 'react-native';

import {colors} from '@/constants/colors';
import useThemeStore from '@/store/theme';
import {MainDrawerParamList} from '@/types/navigation';

type Navigation = DrawerNavigationProp<MainDrawerParamList>;

interface DrawerButtonProps {
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const DrawerButton = ({style, color}: DrawerButtonProps) => {
  const {theme} = useThemeStore();
  const navigation = useNavigation<Navigation>();

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={() => navigation.openDrawer()}>
      <Ionicons name="menu" size={25} color={color ?? colors[theme].BLACK} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
});

export default DrawerButton;
