import {StackScreenProps} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import ImageCarousel from '@/components/common/ImageCarousel';
import useGetPost from '@/hooks/queries/useGetPost';
import {FeedStackParamList} from '@/types/navigation';

type Props = StackScreenProps<FeedStackParamList, 'ImageZoom'>;

const ImageZoomScreen = ({route}: Props) => {
  const {id, index} = route.params;
  const {data: post} = useGetPost(id);

  return (
    <SafeAreaView style={styles.container}>
      <ImageCarousel images={post?.imageUris ?? []} pressedIndex={index} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ImageZoomScreen;
