import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';

import CustomMarker from '../common/CustomMarker';

interface MarkerColorInputProps {
  color: string;
  score: number;
  onChangeColor: (value: string) => void;
}

const MarkerColorInput = ({
  color,
  score,
  onChangeColor,
}: MarkerColorInputProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.markerLabel}>마커선택</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.markerInputScroll}>
          {[
            colors[theme].PINK_LIGHT,
            colors[theme].BLUE_LIGHT,
            colors[theme].YELLOW_LIGHT,
            colors[theme].GREEN_LIGHT,
            colors[theme].PURPLE_LIGHT,
          ].map(selectColor => (
            <Pressable
              key={selectColor}
              style={[
                styles.markerBox,
                color === selectColor && styles.pressedMarker,
              ]}
              onPress={() => onChangeColor(selectColor)}>
              <CustomMarker color={selectColor} score={score} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: 15,
      gap: 15,
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      borderRadius: 15,
    },
    markerInputScroll: {
      flexDirection: 'row',
      gap: 20,
    },
    markerLabel: {
      color: colors[theme].GRAY_700,
    },
    markerBox: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 8,
      backgroundColor: colors[theme].GRAY_200,
    },
    pressedMarker: {
      borderWidth: 2,
      borderColor: colors[theme].PRIMARY,
    },
  });

export default MarkerColorInput;
