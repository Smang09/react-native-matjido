import Ionicons, {IoniconsIconName} from '@react-native-vector-icons/ionicons';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';

import CustomDrawerContent from '@/components/common/CustomDrawerContent';
import {colors} from '@/constants/colors';
import CalendarScreen from '@/screens/calendar/CalendarScreen';
import useThemeStore, {Theme} from '@/store/theme';
import {MainDrawerParamList} from '@/types/navigation';

import {FeedStack} from './FeedNavigation';
import {MapStack} from './MapNavigation';
import {SettingStack} from './SettingNavigation';

const Drawer = createDrawerNavigator();

const DrawerIcons = (
  routeName: keyof MainDrawerParamList,
  focused: boolean,
  theme: Theme,
) => {
  let iconName: IoniconsIconName = 'map';

  switch (routeName) {
    case 'Map':
      iconName = 'map';
      break;
    case 'Feed':
      iconName = 'image';
      break;
    case 'Calendar':
      iconName = 'calendar';
      break;
    case 'Setting':
      iconName = 'settings-sharp';
      break;
  }

  return (
    <Ionicons
      name={iconName}
      size={20}
      color={focused ? colors[theme].WHITE : colors[theme].GRAY_500}
    />
  );
};

const DrawerNavigation = () => {
  const {theme} = useThemeStore();

  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={({route}) => ({
        drawerStyle: {
          width: '60%',
          borderTopRightRadius: 0,
          borderBottomEndRadius: 0,
          backgroundColor: colors[theme].WHITE,
          boxShadow: '1px 1px 15px rgba(0, 0, 0, 0.2)',
        },
        drawerItemStyle: {
          borderRadius: 15,
        },
        drawerType: 'front',
        drawerActiveBackgroundColor: colors[theme].PRIMARY,
        drawerInactiveBackgroundColor: colors[theme].GRAY_100,
        drawerActiveTintColor: colors[theme].WHITE,
        drawerInactiveTintColor: colors[theme].GRAY_500,
        drawerIcon: ({focused}) =>
          DrawerIcons(route.name as keyof MainDrawerParamList, focused, theme),
        headerTitleAlign: 'center',
        headerBackButtonDisplayMode: 'minimal',
        headerTintColor: colors[theme].BLACK,
        headerTitleStyle: {
          fontSize: 16,
        },
        headerStyle: {
          backgroundColor: colors[theme].WHITE,
          shadowColor: colors[theme].GRAY_500,
        },
      })}>
      <Drawer.Screen
        name="Map"
        component={MapStack}
        options={{
          title: '홈',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Feed"
        component={FeedStack}
        options={{
          title: '피드',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: '캘린더',
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingStack}
        options={{
          title: '설정',
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
