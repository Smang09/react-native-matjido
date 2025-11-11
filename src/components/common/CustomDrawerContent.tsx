import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '@/constants/colors';
import useAuth from '@/hooks/queries/useAuth';
import useThemeStore, {Theme} from '@/store/theme';
import {getImageSource} from '@/utils/image';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const {auth} = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}
        {...props}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={
                auth.imageUrl
                  ? getImageSource(auth.imageUrl)
                  : require('@/assets/default-profile.png')
              }
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.nickName}>{auth.nickname}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      gap: 5,
    },
    profileContainer: {
      alignItems: 'center',
      paddingVertical: 30,
      gap: 5,
    },
    profileImageContainer: {
      width: 70,
      height: 70,
      borderRadius: 35,
    },
    profileImage: {
      width: '100%',
      height: '100%',
      borderRadius: 35,
    },
    nickName: {
      color: colors[theme].BLACK,
      fontSize: 16,
      fontWeight: 500,
    },
  });

export default CustomDrawerContent;
