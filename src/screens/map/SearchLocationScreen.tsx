import React, {useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';

import Pagination from '@/components/map/Pagination';
import SearchInput from '@/components/map/SearchInput';
import SearchRegionResult from '@/components/map/SearchRegionResult';
import useSearchLocation from '@/hooks/useSearchLocation';
import useUserLocation from '@/hooks/useUserLocation';

const SearchLocationScreen = () => {
  const [keyword, setKeyword] = useState('');

  const {userLocation} = useUserLocation();
  const {
    regionInfo,
    pageParam,
    fetchNextPage,
    fetchPrevPage,
    hasNextPage,
    search,
  } = useSearchLocation(userLocation);

  const handleSubmitKeyword = () => {
    search(keyword);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <SearchInput
        autoFocus
        placeholder="검색할 장소를 입력해 주세요."
        value={keyword}
        onChangeText={setKeyword}
        onSubmit={handleSubmitKeyword}
      />
      <SearchRegionResult regionInfo={regionInfo} />
      <Pagination
        pageParam={pageParam}
        hasNextPage={hasNextPage}
        totalLength={regionInfo.length}
        fetchNextPage={fetchNextPage}
        fetchPrevPage={fetchPrevPage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 15,
  },
});

export default SearchLocationScreen;
