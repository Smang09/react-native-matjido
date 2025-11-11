const getDateDetails = (dateString: Date | string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return {year, month, day};
};

const getDateWithSeparator = (
  dateString: Date | string,
  separator: string = '',
) => {
  const {year, month, day} = getDateDetails(dateString);
  return [
    year,
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join(separator);
};

export type MonthYear = {
  month: number;
  year: number;
  startDate: Date;
  firstDOW: number;
  lastDate: number;
};

const getMonthYearDetails = (date: Date): MonthYear => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const startDate = new Date(year, month - 1, 1);
  const firstDOW = startDate.getDay();
  const lastDate = new Date(year, month, 0).getDate();

  return {month, year, startDate, firstDOW, lastDate};
};

const getNewMonthYear = (prevDate: MonthYear, increment: number): MonthYear => {
  return getMonthYearDetails(
    new Date(prevDate.year, prevDate.month - 1 + increment, 1),
  );
};

const isSameAsCurrentDate = (year: number, month: number, date: number) => {
  const currentDate = getDateWithSeparator(new Date());
  const inputDate = `${year}${String(month).padStart(2, '0')}${String(
    date,
  ).padStart(2, '0')}`;

  return currentDate === inputDate;
};

export {
  getDateWithSeparator,
  getMonthYearDetails,
  getNewMonthYear,
  isSameAsCurrentDate,
};
