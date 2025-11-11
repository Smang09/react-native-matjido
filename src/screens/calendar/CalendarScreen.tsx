import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Calendar from '@/components/calendar/Calendar';
import Schedule from '@/components/calendar/Schedule';
import {colors} from '@/constants/colors';
import {numbers} from '@/constants/numbers';
import useGetCalendarPosts from '@/hooks/queries/useGetCalendarPosts';
import useThemeStore, {Theme} from '@/store/theme';
import {getMonthYearDetails, getNewMonthYear} from '@/utils/date';

const TodayButton = ({theme, onPress}: {theme: Theme; onPress: () => void}) => {
  const styles = styling(theme);

  return (
    <Pressable style={styles.todayButton} onPress={onPress}>
      <Text style={styles.todayText}>오늘</Text>
    </Pressable>
  );
};

const CalendarScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const navigation = useNavigation();
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const {data: posts} = useGetCalendarPosts(monthYear.year, monthYear.month);
  const [selectedDate, setSelectedDate] = useState(0);

  const handleChangeMonth = (increment: number) => {
    const next = getNewMonthYear(monthYear, increment);
    if (
      next.year < numbers.MIN_CALENDAR_YEAR ||
      next.year > numbers.MAX_CALENDAR_YEAR
    ) {
      return;
    }

    setSelectedDate(0);
    setMonthYear(next);
  };

  const handlePressSchedule = (postId: number) => {
    navigation.navigate('Feed', {
      screen: 'FeedDetail',
      params: {id: postId},
      initial: false,
    });
  };

  useEffect(() => {
    const moveToToday = () => {
      const today = new Date();
      setSelectedDate(today.getDate());
      setMonthYear(getMonthYearDetails(today));
    };

    navigation.setOptions({
      headerRight: () => TodayButton({theme, onPress: moveToToday}),
    });
  }, [navigation, theme]);

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        monthYear={monthYear}
        schedules={posts ?? {}}
        selectedDate={selectedDate}
        onPressDate={(date: number) => setSelectedDate(date)}
        onChangeMonth={handleChangeMonth}
      />
      <ScrollView
        style={styles.scheduleContainer}
        contentContainerStyle={styles.scheduleContentContainer}>
        {posts?.[selectedDate]?.map(post => (
          <Schedule
            key={post.id}
            title={post.title}
            subTitle={post.address}
            onPress={() => handlePressSchedule(post.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    todayButton: {
      paddingHorizontal: 10,
    },
    todayText: {
      color: colors[theme].PRIMARY,
      fontWeight: 'bold',
    },
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
    scheduleContainer: {
      padding: 20,
      backgroundColor: colors[theme].WHITE,
    },
    scheduleContentContainer: {
      gap: 20,
    },
  });

export default CalendarScreen;
