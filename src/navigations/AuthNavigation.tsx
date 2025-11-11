import {createStackNavigator} from '@react-navigation/stack';

import {colors} from '@/constants/colors';
import KaKaoLoginScreen from '@/screens/auth/KaKaoLoginScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import SignupScreen from '@/screens/auth/SignupScreen';
import useThemeStore from '@/store/theme';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  const {theme} = useThemeStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackButtonDisplayMode: 'minimal',
        headerTintColor: colors[theme].BLACK,
        headerStyle: {
          backgroundColor: colors[theme].WHITE,
          shadowColor: colors[theme].GRAY_500,
        },
        headerTitleStyle: {
          fontSize: 16,
        },
        cardStyle: {
          backgroundColor: colors[theme].WHITE,
        },
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="KakaoLogin"
        component={KaKaoLoginScreen}
        options={{title: '카카오 로그인'}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{title: '회원가입'}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
