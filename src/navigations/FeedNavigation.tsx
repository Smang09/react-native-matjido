import Ionicons from '@react-native-vector-icons/ionicons';
import {useNavigation} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Pressable, StyleSheet} from 'react-native';

import DrawerButton from '@/components/common/DrawerButton';
import {colors} from '@/constants/colors';
import EditLocationScreen from '@/screens/feed/EditLocationScreen';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import FeedFavoriteScreen from '@/screens/feed/FeedFavoriteScreen';
import FeedListScreen from '@/screens/feed/FeedListScreen';
import ImageZoomScreen from '@/screens/feed/ImageZoomScreen';
import useThemeStore from '@/store/theme';
import {FeedStackParamList} from '@/types/navigation';

type Navigation = StackNavigationProp<FeedStackParamList>;

const FavoriteButton = () => {
  const {theme} = useThemeStore();
  const navigation = useNavigation<Navigation>();

  return (
    <Pressable
      style={styles.favoriteButton}
      onPress={() => navigation.navigate('FeedFavorite')}>
      <Ionicons name="star" size={25} color={colors[theme].PRIMARY} />
    </Pressable>
  );
};

const Stack = createStackNavigator<FeedStackParamList>();

export const FeedStack = () => {
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
        name="FeedList"
        component={FeedListScreen}
        options={{
          title: '피드',
          headerLeft: DrawerButton,
          headerRight: FavoriteButton,
        }}
      />
      <Stack.Screen
        name="FeedDetail"
        component={FeedDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FeedFavorite"
        component={FeedFavoriteScreen}
        options={{
          title: '즐겨찾기',
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
      <Stack.Screen
        name="EditLocation"
        component={EditLocationScreen}
        options={{title: '장소 수정'}}
      />
      <Stack.Screen
        name="ImageZoom"
        component={ImageZoomScreen}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  favoriteButton: {
    paddingHorizontal: 12,
  },
});
