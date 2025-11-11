import axios from 'axios';
import {useCallback, useRef, useState} from 'react';
import Config from 'react-native-config';
import {LatLng} from 'react-native-maps';

type Meta = {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
  same_name: {
    region: string[];
    keyword: string;
    selected_region: string;
  };
};

export type RegionInfo = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

type RegionResponse = {
  meta: Meta;
  documents: RegionInfo[];
};

const useSearchLocation = (location: LatLng) => {
  const [regionInfo, setRegionInfo] = useState<RegionInfo[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pageParam, setPageParam] = useState(1);

  const searchKeywordRef = useRef('');

  const fetchData = useCallback(
    async (keyword: string, page: number) => {
      if (!keyword) {
        setRegionInfo([]);
        setHasNextPage(false);
        return;
      }

      try {
        const {data} = await axios.get<RegionResponse>(
          `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}&y=${location.latitude}&x=${location.longitude}&page=${page}`,
          {headers: {Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`}},
        );

        setRegionInfo(data.documents);
        setHasNextPage(!data.meta.is_end);
      } catch {
        setRegionInfo([]);
        setHasNextPage(false);
      }
    },
    [location],
  );

  const search = useCallback(
    (keyword: string) => {
      searchKeywordRef.current = keyword;
      setPageParam(1);
      fetchData(keyword, 1);
    },
    [fetchData],
  );

  const fetchNextPage = useCallback(() => {
    if (!hasNextPage) {
      return;
    }

    const nextPage = pageParam + 1;
    setPageParam(nextPage);
    fetchData(searchKeywordRef.current, nextPage);
  }, [fetchData, hasNextPage, pageParam]);

  const fetchPrevPage = useCallback(() => {
    if (pageParam <= 1) {
      return;
    }

    const prevPage = pageParam - 1;
    setPageParam(prevPage);
    fetchData(searchKeywordRef.current, prevPage);
  }, [fetchData, pageParam]);

  return {
    regionInfo,
    pageParam,
    hasNextPage,
    search,
    fetchNextPage,
    fetchPrevPage,
  };
};

export default useSearchLocation;
