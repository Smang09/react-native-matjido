import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';

interface ScheduleProps {
  title: string;
  subTitle: string;
  onPress: () => void;
}

const Schedule = ({title, subTitle, onPress}: ScheduleProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.subTitleText}>
        {subTitle}
      </Text>
      <Text style={styles.titleText}>{title}</Text>
    </Pressable>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      gap: 2,
      minHeight: 50,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderLeftWidth: 4,
      borderLeftColor: colors[theme].PRIMARY,
    },
    subTitleText: {
      color: colors[theme].GRAY_500,
      fontSize: 12,
    },
    titleText: {
      color: colors[theme].BLACK,
      fontSize: 16,
      fontWeight: 600,
    },
  });

export default Schedule;
