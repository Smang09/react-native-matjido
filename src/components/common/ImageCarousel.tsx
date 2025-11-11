import {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';

import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';
import {ImageUri} from '@/types/domain';
import {getImageSource} from '@/utils/image';

interface ImageCarouselProps {
  images: ImageUri[];
  pressedIndex?: number;
}

const deviceWidth = Dimensions.get('window').width;

const ImageCarousel = ({images, pressedIndex = 0}: ImageCarouselProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const [initialIndex, setInitialIndex] = useState(pressedIndex);
  const [page, setPage] = useState(pressedIndex);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / deviceWidth);
    setPage(newPage);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <View style={{width: deviceWidth}}>
            <Image
              style={styles.image}
              source={getImageSource(item.uri)}
              resizeMode="contain"
            />
          </View>
        )}
        keyExtractor={item => String(item.id)}
        horizontal
        pagingEnabled
        initialScrollIndex={initialIndex}
        onScroll={handleScroll}
        onScrollToIndexFailed={() => {
          setInitialIndex(pressedIndex);
        }}
        getItemLayout={(_, index) => ({
          length: deviceWidth,
          offset: deviceWidth * index,
          index,
        })}
      />
      <View style={styles.pageContainer}>
        {Array.from({length: images.length}, (_, index) => (
          <View
            key={index}
            style={[styles.pageDot, index === page && styles.currentPageDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors[theme].WHITE,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    pageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    pageDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors[theme].GRAY_200,
    },
    currentPageDot: {
      backgroundColor: colors[theme].PRIMARY,
    },
  });

export default ImageCarousel;
