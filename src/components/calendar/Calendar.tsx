import Ionicons from '@react-native-vector-icons/ionicons';
import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';

import {ResponseCalendarPost} from '@/api/post';
import {colors} from '@/constants/colors';
import useModal from '@/hooks/useModal';
import useThemeStore, {Theme} from '@/store/theme';
import {isSameAsCurrentDate, MonthYear} from '@/utils/date';

import DateBox from './DateBox';
import DayOfWeeks from './DayOfWeeks';
import YearSelector from './YearSelector';

interface CalendarProps {
  monthYear: MonthYear;
  selectedDate: number;
  schedules: ResponseCalendarPost;
  onChangeMonth: (increment: number) => void;
  onPressDate: (date: number) => void;
}

const Calendar = ({
  monthYear,
  selectedDate,
  schedules,
  onChangeMonth,
  onPressDate,
}: CalendarProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const {month, year, firstDOW, lastDate} = monthYear;
  const yearSelector = useModal();

  const handleChangeYear = (selectYear: number) => {
    onChangeMonth((selectYear - year) * 12);
    yearSelector.hide();
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable style={styles.monthButton} onPress={() => onChangeMonth(-1)}>
          <Ionicons name="arrow-back" size={25} color={colors[theme].BLACK} />
        </Pressable>
        <Pressable
          style={styles.monthYearContainer}
          onPress={yearSelector.show}>
          <Text style={styles.monthYearText}>
            {year}년 {month}월
          </Text>
          <Ionicons
            name="chevron-down"
            size={20}
            color={colors[theme].GRAY_500}
          />
        </Pressable>
        <Pressable style={styles.monthButton} onPress={() => onChangeMonth(1)}>
          <Ionicons
            name="arrow-forward"
            size={25}
            color={colors[theme].BLACK}
          />
        </Pressable>
      </View>

      <DayOfWeeks />
      <View style={styles.bodyContainer}>
        <FlatList
          data={Array.from({length: lastDate + firstDOW}, (_, index) => ({
            id: index,
            date: index - firstDOW + 1,
          }))}
          renderItem={({item}) => (
            <DateBox
              date={item.date}
              selectedDate={selectedDate}
              isToday={isSameAsCurrentDate(year, month, item.date)}
              hasSchedule={Boolean(schedules[item.date])}
              onPressDate={onPressDate}
            />
          )}
          keyExtractor={item => String(item.id)}
          numColumns={7}
        />
      </View>

      <YearSelector
        isVisible={yearSelector.isVisible}
        currentYear={year}
        onChangeYear={handleChangeYear}
        hide={yearSelector.hide}
      />
    </>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 12,
      marginVertical: 16,
    },
    monthYearContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      padding: 12,
    },
    monthButton: {
      padding: 12,
    },
    monthYearText: {
      color: colors[theme].BLACK,
      fontSize: 18,
      fontWeight: 500,
    },
    bodyContainer: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors[theme].GRAY_300,
      backgroundColor: colors[theme].GRAY_100,
    },
  });

export default Calendar;
