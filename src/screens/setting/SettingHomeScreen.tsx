import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import DarkModeActionSheet from '@/components/setting/DarkModeActionSheet';
import SettingItem from '@/components/setting/SettingItem';
import {colors} from '@/constants/colors';
import useAuth from '@/hooks/queries/useAuth';
import useModal from '@/hooks/useModal';
import useThemeStore from '@/store/theme';
import {SettingStackParamList} from '@/types/navigation';

type Navigation = StackNavigationProp<SettingStackParamList>;

const SettingHomeScreen = () => {
  const {theme} = useThemeStore();
  const navigation = useNavigation<Navigation>();

  const {logoutMutation} = useAuth();
  const darkModeAction = useModal();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.space} />
        <SettingItem
          title="프로필 수정"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <SettingItem title="다크 모드" onPress={darkModeAction.show} />
        <View style={styles.space} />
        <SettingItem
          title="로그아웃"
          color={colors[theme].RED}
          onPress={() => logoutMutation.mutate(null)}
        />

        <DarkModeActionSheet
          isVisible={darkModeAction.isVisible}
          hideAction={darkModeAction.hide}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  space: {
    height: 30,
  },
});

export default SettingHomeScreen;
