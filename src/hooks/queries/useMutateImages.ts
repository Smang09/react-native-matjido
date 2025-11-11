import {useMutation} from '@tanstack/react-query';

import {uploadImages} from '@/api/image';
import {UseMutationCustomOptions} from '@/types/api';

const useMutateImages = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: uploadImages,
    ...mutationOptions,
  });
};

export default useMutateImages;
