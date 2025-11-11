import {useMutation} from '@tanstack/react-query';

import {deletePost} from '@/api/post';
import queryClient from '@/api/queryClient';
import {queryKeys} from '@/constants/keys';
import {UseMutationCustomOptions} from '@/types/api';
import {Marker} from '@/types/domain';

const useMutateDeletePost = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: deleteId => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      queryClient.setQueryData<Marker[]>(
        [queryKeys.MARKER, queryKeys.GET_MARKERS],
        existingMarkers =>
          existingMarkers?.filter(marker => marker.id !== deleteId),
      );
    },
    ...mutationOptions,
  });
};

export default useMutateDeletePost;
