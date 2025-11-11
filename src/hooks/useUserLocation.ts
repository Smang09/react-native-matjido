import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';

import useAppState from './useAppState';

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516032365118,
    longitude: 126.98989626020192,
  });
  const [isUserLocationError, setUserLocationError] = useState(false);
  const {isComeback} = useAppState();

  useEffect(() => {
    if (!isComeback) {
      return;
    }

    Geolocation.getCurrentPosition(
      info => {
        setUserLocation(info.coords);
        setUserLocationError(false);
      },
      () => {
        setUserLocationError(true);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, [isComeback]);

  return {userLocation, isUserLocationError};
};

export default useUserLocation;
