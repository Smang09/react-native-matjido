import {useCallback, useEffect, useRef, useState} from 'react';
import MapView, {LatLng, Region} from 'react-native-maps';

import {numbers} from '@/constants/numbers';
import useLocationStore from '@/store/location';

type Delta = Pick<Region, 'latitudeDelta' | 'longitudeDelta'>;

const useMoveMapView = () => {
  const mapRef = useRef<MapView>(null);
  const [regionDelta, setRegionDelta] = useState<Delta>(numbers.INITIAL_DELTA);
  const {moveLocation} = useLocationStore();

  const moveMapView = useCallback(
    (coordinate: LatLng, delta?: Delta) => {
      mapRef.current?.animateToRegion({
        ...coordinate,
        ...(delta ?? regionDelta),
      });
    },
    [regionDelta],
  );

  const onChangeDelta = useCallback((region: Region) => {
    const {latitudeDelta, longitudeDelta} = region;
    setRegionDelta({latitudeDelta, longitudeDelta});
  }, []);

  useEffect(() => {
    moveLocation && moveMapView(moveLocation);
  }, [moveLocation, moveMapView]);

  return {mapRef, moveMapView, onChangeDelta};
};

export default useMoveMapView;
