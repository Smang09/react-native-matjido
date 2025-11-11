import React, {Suspense} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Indicator from '@/components/common/Indicator';
import FeedFavoriteList from '@/components/feed/FeedFavoriteList';

const FeedFavoriteScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Suspense fallback={<Indicator size="large" />}>
        <FeedFavoriteList />
      </Suspense>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedFavoriteScreen;
