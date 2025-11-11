import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';
import {Post} from '@/types/domain';
import {FeedStackParamList} from '@/types/navigation';
import {getDateWithSeparator} from '@/utils/date';
import {getImageSource} from '@/utils/image';

interface FeedItemProps {
  post: Post;
}

const deviceWidth = Dimensions.get('window').width;

const FeedItem = ({post}: FeedItemProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('FeedDetail', {id: post.id})}>
      {post.imageUris.length > 0 ? (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={getImageSource(post.imageUris[0].uri)}
            resizeMode="cover"
          />
        </View>
      ) : (
        <View style={[styles.imageContainer, styles.emptyImageContainer]}>
          <Text style={styles.descriptionText}>No Image</Text>
        </View>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.dateText}>
          {getDateWithSeparator(post.date, '/')}
        </Text>
        <Text style={styles.titleText}>{post.title}</Text>
        <Text style={styles.descriptionText} numberOfLines={1}>
          {post.description}
        </Text>
      </View>
    </Pressable>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 5,
      marginVertical: 12,
      width: deviceWidth / 2 - 25,
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: deviceWidth / 2 - 25,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
    },
    emptyImageContainer: {
      justifyContent: 'center',
      alignContent: 'center',
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      borderRadius: 15,
    },
    infoContainer: {
      paddingVertical: 8,
      gap: 1,
    },
    dateText: {
      color: colors[theme].GRAY_500,
      fontSize: 10,
      fontWeight: 500,
    },
    titleText: {
      color: colors[theme].BLACK,
      fontSize: 14,
      fontWeight: 500,
    },
    descriptionText: {
      color: colors[theme].GRAY_700,
      fontSize: 12,
    },
  });

export default FeedItem;
