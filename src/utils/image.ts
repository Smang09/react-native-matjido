import {Platform} from 'react-native';
import {Image} from 'react-native-image-crop-picker';

import {baseUrls} from '@/api/axios';

const getImageSource = (imageUrl?: string) => {
  const baseUrl = Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android;
  return {uri: `${baseUrl}/${imageUrl}`};
};

const getFormDataImages = (key: string = 'images', images: Image[]) => {
  const formData = new FormData();

  images.forEach(({path, mime}) => {
    const file = {
      uri: path,
      type: mime,
      name: path.split('/').pop(),
    };

    formData.append(key, file);
  });

  return formData;
};

export {getImageSource, getFormDataImages};
