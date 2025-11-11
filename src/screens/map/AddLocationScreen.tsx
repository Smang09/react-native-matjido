import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import CustomButton from '@/components/common/CustomButton';
import FixedBottomCTA from '@/components/common/FixedBottomCTA';
import InputField from '@/components/common/InputField';
import PreviewImageList from '@/components/common/PreviewImageList';
import ImageInput from '@/components/post/ImageInput';
import MarkerColorInput from '@/components/post/MarkerColorInput';
import ScoreInput from '@/components/post/ScoreInput';
import {colors} from '@/constants/colors';
import {errorMessages} from '@/constants/messages';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import useImagePicker from '@/hooks/useImagePicker';
import usePermission from '@/hooks/usePermission';
import useThemeStore from '@/store/theme';
import {MapStackParamList} from '@/types/navigation';
import {getDateWithSeparator} from '@/utils/date';
import {validateAddPost} from '@/utils/validation';

type Props = StackScreenProps<MapStackParamList, 'AddLocation'>;

const AddLocationScreen = ({route}: Props) => {
  const {theme} = useThemeStore();

  const {location} = route.params;
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const address = useGetAddress(location);
  const imagePicker = useImagePicker({initialImages: []});
  const [openDate, setOpenDate] = useState(false);
  const createPost = useMutateCreatePost();
  const postForm = useForm({
    initialValue: {
      title: '',
      description: '',
      date: new Date(),
      color: colors[theme].PINK_LIGHT,
      score: 3,
    },
    validate: validateAddPost,
  });

  usePermission('PHOTO');

  const handleSubmit = () => {
    postForm.setAllTouched();
    const hasErrors = Object.values(postForm.errors).some(e => e !== '');

    if (hasErrors) {
      return;
    }

    createPost.mutate(
      {
        address,
        ...location,
        ...postForm.values,
        imageUris: imagePicker.imageUris,
      },
      {
        onSuccess: () => navigation.goBack(),
        onError: error =>
          Toast.show({
            type: 'error',
            text1:
              error.response?.data.message || errorMessages.UNEXPECTED_ERROR,
          }),
      },
    );
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {paddingBottom: inset.bottom + 100},
        ]}>
        <InputField disabled value={address} />
        <CustomButton
          variant="outlined"
          label={getDateWithSeparator(postForm.values.date, '. ')}
          onPress={() => setOpenDate(true)}
        />
        <InputField
          placeholder="제목을 입력하세요."
          autoFocus
          error={postForm.errors.title}
          touched={postForm.touched.title}
          {...postForm.getTextInputProps('title')}
        />
        <InputField
          multiline
          placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
          error={postForm.errors.description}
          touched={postForm.touched.description}
          {...postForm.getTextInputProps('description')}
        />
        <MarkerColorInput
          color={postForm.values.color}
          score={postForm.values.score}
          onChangeColor={value => postForm.onChange('color', value)}
        />
        <ScoreInput
          score={postForm.values.score}
          onChangeScore={value => postForm.onChange('score', value)}
        />
        <DatePicker
          modal
          locale="ko"
          mode="date"
          title={null}
          cancelText="취소"
          confirmText="완료"
          date={postForm.values.date}
          open={openDate}
          onConfirm={date => postForm.onChange('date', date)}
          onCancel={() => setOpenDate(false)}
        />
        <View style={styles.imageInputContainer}>
          <ImageInput onChange={imagePicker.handleChangeImage} />
          <PreviewImageList
            imageUris={imagePicker.imageUris}
            onDelete={imagePicker.deleteImageUri}
            showDeleteButton
          />
        </View>
      </ScrollView>
      <FixedBottomCTA label="저장" onPress={handleSubmit} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
  imageInputContainer: {
    flexDirection: 'row',
  },
});

export default AddLocationScreen;
