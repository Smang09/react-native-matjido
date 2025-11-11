import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import MapView from 'react-native-map-clustering';
import {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import CustomMarker from '@/components/common/CustomMarker';
import DrawerButton from '@/components/common/DrawerButton';
import MapIconButton from '@/components/map/MapIconButton';
import MarkerFilterAction from '@/components/map/MarkerFilterAction';
import MarkerModal from '@/components/map/MarkerModal';
import {colors} from '@/constants/colors';
import {numbers} from '@/constants/numbers';
import useGetMarkers from '@/hooks/useGetMarkers';
import useModal from '@/hooks/useModal';
import useMoveMapView from '@/hooks/useMoveMapView';
import usePermission from '@/hooks/usePermission';
import useUserLocation from '@/hooks/useUserLocation';
import useFilterStore from '@/store/filter';
import useLocationStore from '@/store/location';
import useThemeStore, {Theme} from '@/store/theme';
import {MapStackParamList} from '@/types/navigation';

type Navigation = StackNavigationProp<MapStackParamList>;

const MapHomeScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const navigation = useNavigation<Navigation>();
  const inset = useSafeAreaInsets();

  const {selectLocation, setSelectLocation} = useLocationStore();
  const {filters} = useFilterStore();

  const {mapRef, moveMapView, onChangeDelta} = useMoveMapView();
  const {userLocation, isUserLocationError} = useUserLocation();
  const markerModal = useModal();
  const filterAction = useModal();

  const [markerId, setMarkerId] = useState<number>();

  const {data: markers = []} = useGetMarkers({
    select: data =>
      data.filter(
        marker =>
          filters[marker.color] === true &&
          filters[String(marker.score)] === true,
      ),
  });

  usePermission('LOCATION');

  const handlePressMarker = (id: number, coordinate: LatLng) => {
    setMarkerId(id);
    moveMapView(coordinate);
    markerModal.show();
  };

  const handlePressAddPost = () => {
    if (!selectLocation) {
      Alert.alert(
        '추가할 위치를 선택해 주세요.',
        '지도를 길게 누르면 위치가 선택됩니다.',
      );
      return;
    }

    navigation.navigate('AddLocation', {
      location: selectLocation,
    });

    setSelectLocation(null);
  };

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      Toast.show({
        type: 'error',
        text1: '위치 권한을 허용해 주세요.',
        position: 'bottom',
      });
      return;
    }

    moveMapView(userLocation);
  };

  return (
    <>
      <DrawerButton style={[styles.drawerButton, {top: inset.top + 10}]} />

      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        region={{
          ...userLocation,
          ...numbers.INITIAL_DELTA,
        }}
        clusterColor={colors[theme].PRIMARY}
        onRegionChangeComplete={onChangeDelta}
        onLongPress={({nativeEvent}) =>
          setSelectLocation(nativeEvent.coordinate)
        }>
        {markers.map(({id, color, ...coordinate}) => (
          <CustomMarker
            key={id}
            color={color}
            coordinate={coordinate}
            onPress={() => handlePressMarker(id, coordinate)}
          />
        ))}
        {selectLocation && <Marker coordinate={selectLocation} />}
      </MapView>
      <View style={styles.buttonList}>
        <MapIconButton
          name="magnifying-glass"
          onPress={() => navigation.navigate('SearchLocation')}
        />
        <MapIconButton name="filter" onPress={filterAction.show} />
        <MapIconButton name="plus" onPress={handlePressAddPost} />
        <MapIconButton
          name="location-crosshairs"
          onPress={handlePressUserLocation}
        />
      </View>

      <MarkerModal
        isVisible={markerModal.isVisible}
        markerId={Number(markerId)}
        hide={markerModal.hide}
      />
      <MarkerFilterAction
        isVisible={filterAction.isVisible}
        hideAction={filterAction.hide}
      />
    </>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerButton: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      left: 20,
      top: 0,
      zIndex: 1,
      width: 50,
      height: 50,
      paddingHorizontal: 0,
      borderRadius: 15,
      backgroundColor: colors[theme].WHITE,
      boxShadow: '0 0 6px rgba(0, 0, 0, 0.2)',
    },
    buttonList: {
      position: 'absolute',
      bottom: 40,
      right: 20,
      zIndex: 1,
    },
  });

export default MapHomeScreen;
