import Ionicons from '@react-native-vector-icons/ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import CustomButton from '@/components/common/CustomButton';
import PreviewImageList from '@/components/common/PreviewImageList';
import FeedDetailActionSheet from '@/components/feed/FeedDetailActionSheet';
import {colors} from '@/constants/colors';
import useGetPost from '@/hooks/queries/useGetPost';
import useMutateFavoritePost from '@/hooks/queries/useMutateFavoritePost';
import useModal from '@/hooks/useModal';
import useLocationStore from '@/store/location';
import useThemeStore, {Theme} from '@/store/theme';
import {FeedStackParamList} from '@/types/navigation';
import {getDateWithSeparator} from '@/utils/date';
import {getImageSource} from '@/utils/image';

const deviceWidth = Dimensions.get('window').width;

type Props = StackScreenProps<FeedStackParamList, 'FeedDetail'>;

const FeedDetailScreen = ({route}: Props) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const {id} = route.params;
  const navigation = useNavigation();
  const {setMoveLocation} = useLocationStore();
  const {data: post, isPending, isError} = useGetPost(id);
  const favoriteMutation = useMutateFavoritePost();
  const detailAction = useModal();

  if (isPending || isError) {
    return <></>;
  }

  const handlePressLocation = () => {
    const {latitude, longitude} = post;
    setMoveLocation({latitude, longitude});

    navigation.navigate('Map', {
      screen: 'MapHome',
    });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.headerButton}
            onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back"
              size={25}
              color={colors[theme].BLACK}
            />
          </Pressable>
          <Pressable style={styles.headerButton} onPress={detailAction.show}>
            <Ionicons
              name="ellipsis-vertical"
              size={25}
              color={colors[theme].BLACK}
            />
          </Pressable>
        </View>
        <ScrollView>
          <View style={styles.imageContainer}>
            {post.imageUris.length > 0 ? (
              <Image
                style={styles.image}
                source={getImageSource(post.imageUris[0].uri)}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.emptyImageContainer}>
                <Text>No Image</Text>
              </View>
            )}
          </View>
          <View style={styles.contentContainer}>
            <Text
              style={styles.addressText}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {post.address}
            </Text>
            <View style={styles.titleContainer}>
              <View
                style={[styles.markerColor, {backgroundColor: post.color}]}
              />
              <Text style={styles.titleText}>{post.title}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                방문 날짜 {getDateWithSeparator(post.date, '.')}
              </Text>
              <Text style={styles.infoText}>평점 {post.score}</Text>
            </View>
            <Text style={styles.descriptionText}>{post.description}</Text>
          </View>
          <View
            style={[styles.divider, {backgroundColor: colors[theme].GRAY_100}]}
          />
          {post.imageUris.length > 0 && (
            <View style={styles.imageListContainer}>
              <PreviewImageList imageUris={post.imageUris} />
            </View>
          )}
          <View style={styles.bottomContainer}>
            <CustomButton
              style={styles.favoriteButton}
              label={
                <Ionicons
                  name="star"
                  size={25}
                  color={
                    post.isFavorite ? colors[theme].YELLOW : colors[theme].WHITE
                  }
                />
              }
              onPress={() => favoriteMutation.mutate(post.id)}
            />
            <CustomButton
              label="위치보기"
              style={styles.locationButton}
              onPress={handlePressLocation}
            />
          </View>
        </ScrollView>
      </SafeAreaView>

      <FeedDetailActionSheet
        id={post.id}
        isVisible={detailAction.isVisible}
        hideAction={detailAction.hide}
      />
    </>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 50,
      backgroundColor: colors[theme].WHITE,
    },
    headerButton: {
      paddingHorizontal: 10,
    },
    imageContainer: {
      width: deviceWidth,
      height: deviceWidth,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    emptyImageContainer: {
      height: deviceWidth,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      backgroundColor: colors[theme].GRAY_200,
      borderColor: colors[theme].GRAY_200,
    },
    contentContainer: {
      padding: 20,
      gap: 10,
      backgroundColor: colors[theme].WHITE,
    },
    addressText: {
      color: colors[theme].BLACK,
      fontSize: 12,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    markerColor: {
      width: 15,
      height: 15,
      borderRadius: 15,
    },
    titleText: {
      flex: 1,
      fontSize: 22,
      fontWeight: 'bold',
      color: colors[theme].BLACK,
      includeFontPadding: false,
    },
    infoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 15,
      gap: 8,
    },
    infoText: {
      flex: 1,
      color: colors[theme].BLACK,
      fontSize: 14,
    },
    descriptionText: {
      color: colors[theme].BLACK,
      fontSize: 16,
      lineHeight: 24,
    },
    divider: {
      height: 8,
    },
    imageListContainer: {
      marginBottom: 10,
      paddingVertical: 15,
    },
    bottomContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 8,
      padding: 15,
      paddingHorizontal: 20,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: colors[theme].GRAY_200,
    },
    favoriteButton: {
      width: 50,
    },
    locationButton: {
      flex: 1,
    },
  });

export default FeedDetailScreen;
