import {useCallback, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

import {ImageUri} from '@/types/domain';
import {getFormDataImages} from '@/utils/image';

import useMutateImages from './queries/useMutateImages';

interface UseImagePickerProps {
  initialImages: ImageUri[];
  mode?: 'multiple' | 'single';
  onSettled?: () => void;
}

const useImagePicker = ({
  initialImages,
  mode = 'multiple',
  onSettled,
}: UseImagePickerProps) => {
  const uploadImages = useMutateImages();
  const [imageUris, setImageUris] = useState<ImageUri[]>(initialImages);

  const addImageUris = (uris: string[]) => {
    setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
  };

  const deleteImageUri = useCallback((uri: string) => {
    setImageUris(prev => prev.filter(image => image.uri !== uri));
  }, []);

  const replaceImageUri = (uris: string[]) => {
    setImageUris([...uris.map(uri => ({uri}))]);
  };

  const handleChangeImage = useCallback(async () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: mode === 'multiple' ? 5 : 1,
    })
      .then(images => {
        const formData = getFormDataImages('images', images);
        uploadImages.mutate(formData, {
          onSuccess: data =>
            mode === 'multiple' ? addImageUris(data) : replaceImageUri(data),
          onSettled: () => onSettled?.(),
        });
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          Toast.show({
            type: 'error',
            text1: '권한을 허용했는지 확인해 주세요.',
            position: 'bottom',
          });
        }
      });
  }, [mode, onSettled, uploadImages]);

  return {imageUris, deleteImageUri, handleChangeImage};
};

export default useImagePicker;
