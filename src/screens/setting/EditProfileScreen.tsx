import Ionicons from '@react-native-vector-icons/ionicons';
import React from 'react';
import {Image, Keyboard, Pressable, StyleSheet, View} from 'react-native';
import Toast from 'react-native-toast-message';

import FixedBottomCTA from '@/components/common/FixedBottomCTA';
import InputField from '@/components/common/InputField';
import EditProfileActionSheet from '@/components/setting/EditProfileActionSheet';
import {colors} from '@/constants/colors';
import {errorMessages} from '@/constants/messages';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import useImagePicker from '@/hooks/useImagePicker';
import useModal from '@/hooks/useModal';
import useThemeStore, {Theme} from '@/store/theme';
import {getImageSource} from '@/utils/image';
import {validateEditProfile} from '@/utils/validation';

const EditProfileScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const {auth, profileMutation} = useAuth();
  const imageAction = useModal();

  const imagePicker = useImagePicker({
    initialImages: auth.imageUrl ? [{uri: auth.imageUrl}] : [],
    mode: 'single',
    onSettled: imageAction.hide,
  });

  const editProfileForm = useForm({
    initialValue: {nickname: auth.nickname ?? ''},
    validate: validateEditProfile,
  });

  const handlePressImage = () => {
    imageAction.show();
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    editProfileForm.setAllTouched();

    const hasErrors = Object.values(editProfileForm.errors).some(e => e !== '');
    if (hasErrors) {
      return;
    }

    profileMutation.mutate(
      {
        ...editProfileForm.values,
        imageUri: imagePicker.imageUris[0]?.uri,
      },
      {
        onSuccess: () =>
          Toast.show({
            type: 'success',
            text1: '프로필이 변경되었습니다.',
            position: 'bottom',
          }),
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
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Pressable
            style={[styles.imageContainer, styles.emptyImageContainer]}
            onPress={handlePressImage}>
            {imagePicker.imageUris.length === 0 ? (
              <Ionicons
                name="camera-outline"
                size={30}
                color={colors[theme].GRAY_500}
              />
            ) : (
              <Image
                source={getImageSource(imagePicker.imageUris[0]?.uri)}
                style={styles.image}
                resizeMode="cover"
              />
            )}
          </Pressable>
        </View>
        <InputField
          placeholder="닉네임을 입력해 주세요."
          error={editProfileForm.errors.nickname}
          touched={editProfileForm.touched.nickname}
          {...editProfileForm.getTextInputProps('nickname')}
        />
      </View>
      <FixedBottomCTA label="저장" onPress={handleSubmit} />
      <EditProfileActionSheet
        isVisible={imageAction.isVisible}
        hideAction={imageAction.hide}
        onChangeImage={imagePicker.handleChangeImage}
      />
    </>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    profileContainer: {
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 40,
    },
    imageContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    emptyImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors[theme].GRAY_200,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 50,
    },
  });

export default EditProfileScreen;
