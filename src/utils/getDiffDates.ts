export const getDiffDates = (date1: Date, date2: Date) => {
  const ms1 = date1.getTime();
  const ms2 = date2.getTime();
  const hourFactor = 3.6e6;

  return (ms2 - ms1) / hourFactor;
}