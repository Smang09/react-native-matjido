import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LatLng, Marker, MyMapMarkerProps} from 'react-native-maps';

import {colors} from '@/constants/colors';

interface CustomMarkerProps extends MyMapMarkerProps {
  coordinate?: LatLng;
  color: string;
  score?: number;
}

const CustomMarker = ({
  coordinate,
  color,
  score = 3,
  ...props
}: CustomMarkerProps) => {
  const markerView = (
    <View style={styles.container}>
      <View style={[styles.marker, {backgroundColor: color}]}>
        <View style={[styles.eye, styles.leftEye]} />
        <View style={[styles.eye, styles.rightEye]} />
        {score > 3 && <View style={[styles.mouth, styles.good]} />}
        {score === 3 && <View style={[styles.soso]} />}
        {score < 3 && <View style={[styles.mouth, styles.bad]} />}
      </View>
    </View>
  );

  return coordinate ? (
    <Marker coordinate={coordinate} {...props}>
      {markerView}
    </Marker>
  ) : (
    markerView
  );
};

const styles = StyleSheet.create({
  container: {
    height: 35,
    width: 32,
    alignItems: 'center',
  },
  marker: {
    width: 27,
    height: 27,
    borderWidth: 1,
    borderRadius: 27,
    borderBottomRightRadius: 1,
    borderColor: colors.light.BLACK,
    transform: [{rotate: '45deg'}],
  },
  eye: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: colors.light.BLACK,
  },
  leftEye: {
    top: 12,
    left: 5,
  },
  rightEye: {
    top: 5,
    left: 12,
  },
  mouth: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderRadius: 12,
    borderTopColor: 'rgba(255, 255, 255 / 0.01)',
    borderBottomColor: 'rgba(255, 255, 255 / 0.01)',
    transform: [{rotate: '45deg'}],
  },
  good: {
    marginLeft: 5,
    marginTop: 5,
    borderLeftColor: 'rgba(255, 255, 255 / 0.01)',
  },
  bad: {
    marginLeft: 12,
    marginTop: 12,
    borderRightColor: 'rgba(255, 255, 255 / 0.01)',
  },
  soso: {
    width: 8,
    height: 8,
    marginLeft: 13,
    marginTop: 13,
    borderLeftWidth: 1,
    borderLeftColor: colors.light.BLACK,
    transform: [{rotate: '45deg'}],
  },
});

export default CustomMarker;
