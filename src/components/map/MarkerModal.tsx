import Ionicons from '@react-native-vector-icons/ionicons';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {colors} from '@/constants/colors';
import useGetPost from '@/hooks/queries/useGetPost';
import useThemeStore, {Theme} from '@/store/theme';
import {getDateWithSeparator} from '@/utils/date';
import {getImageSource} from '@/utils/image';

interface MarkerModalProps {
  markerId: number;
  isVisible: boolean;
  hide: () => void;
}

const MarkerModal = ({markerId, isVisible, hide}: MarkerModalProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const navigation = useNavigation();
  const {data: post, isPending, isError} = useGetPost(markerId);

  if (isPending || isError) {
    return <></>;
  }

  const handlePressModal = () => {
    navigation.navigate('Feed', {
      screen: 'FeedDetail',
      params: {
        id: post.id,
      },
      initial: false,
    });

    hide();
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <SafeAreaView style={styles.container} onTouchEnd={hide}>
        <Pressable style={styles.cardContainer} onPress={handlePressModal}>
          <View style={styles.cardAlign}>
            {post.imageUris.length > 0 && (
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={getImageSource(post.imageUris[0]?.uri)}
                />
              </View>
            )}
            {post.imageUris.length === 0 && (
              <View style={[styles.imageContainer, styles.emptyImageContainer]}>
                <Text style={styles.emptyText}>No Image</Text>
              </View>
            )}
            <View style={styles.infoContainer}>
              <Text
                style={styles.addressText}
                numberOfLines={1}
                ellipsizeMode="tail">
                {post.address}
              </Text>
              <Text
                style={styles.titleText}
                numberOfLines={1}
                ellipsizeMode="tail">
                {post.title}
              </Text>
              <Text style={styles.dateText}>
                {getDateWithSeparator(post.date, '.')}
              </Text>
            </View>
          </View>
          <View style={styles.nextIconContainer}>
            <Ionicons
              name="chevron-forward"
              size={25}
              color={colors[theme].BLACK}
            />
          </View>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    cardContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: 10,
      padding: 20,
      borderRadius: 15,
      backgroundColor: colors[theme].WHITE,
      boxShadow: '0 0 6px rgba(0, 0, 0, 0.2)',
    },
    cardAlign: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
    },
    imageContainer: {
      width: 70,
      height: 70,
      borderRadius: 15,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
    },
    emptyImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
    },
    emptyText: {
      color: colors[theme].GRAY_500,
      fontSize: 12,
    },
    infoContainer: {
      flex: 1,
      gap: 6,
    },
    addressText: {
      color: colors[theme].GRAY_500,
      fontSize: 12,
    },
    titleText: {
      color: colors[theme].BLACK,
      fontSize: 15,
      fontWeight: 'bold',
    },
    dateText: {
      color: colors[theme].GRAY_500,
      fontSize: 10,
    },
    nextIconContainer: {
      width: 40,
      height: 40,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  });

export default MarkerModal;
