import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';

import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';

interface DateBoxProps {
  date: number;
  selectedDate: number;
  isToday: boolean;
  hasSchedule: boolean;
  onPressDate: (date: number) => void;
}

const deviceWidth = Dimensions.get('window').width;

const DateBox = ({
  date,
  selectedDate,
  isToday,
  hasSchedule,
  onPressDate,
}: DateBoxProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable style={styles.container} onPress={() => onPressDate(date)}>
      {date > 0 && (
        <>
          <View
            style={[
              styles.dateContainer,
              selectedDate === date && styles.selectedContainer,
            ]}>
            <Text
              style={[
                styles.dateText,
                isToday && styles.todayText,
                selectedDate === date && styles.selectedDateText,
              ]}>
              {date}
            </Text>
          </View>
          {hasSchedule && <View style={styles.scheduleIndicator} />}
        </>
      )}
    </Pressable>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: deviceWidth / 7,
      height: deviceWidth / 7,
      alignItems: 'center',
    },
    dateContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 28,
      height: 28,
      marginTop: 5,
    },
    dateText: {
      color: colors[theme].BLACK,
      fontSize: 17,
    },
    selectedContainer: {
      borderRadius: 28,
      backgroundColor: colors[theme].BLACK,
    },
    selectedDateText: {
      color: colors[theme].WHITE,
      fontWeight: 'bold',
    },
    todayText: {
      color: colors[theme].PRIMARY,
      fontWeight: 'bold',
    },
    scheduleIndicator: {
      width: 6,
      height: 6,
      marginTop: 2,
      borderRadius: 6,
      backgroundColor: colors[theme].GRAY_500,
    },
  });

export default DateBox;
