import {useQuery} from '@tanstack/react-query';

import {getMarkers} from '@/api/markers';
import {queryKeys} from '@/constants/keys';
import {UseQueryCustomOptions} from '@/types/api';
import {Marker} from '@/types/domain';

const useGetMarkers = (queryOptions?: UseQueryCustomOptions<Marker[]>) => {
  return useQuery({
    queryFn: getMarkers,
    queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
    ...queryOptions,
  });
};

export default useGetMarkers;
