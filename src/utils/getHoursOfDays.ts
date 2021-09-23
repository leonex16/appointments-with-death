export const getHoursOfDay = (hourToExclude: number[]) => {
  const hoursOfDay: string[] = [];

  for (let hh = 0; hh < 24; hh++) {
    if (
      hourToExclude.includes(hh) === true ||
      hh < 9 ||
      hh > 18
    ) continue;
    hoursOfDay.push(`${hh.toString().padStart(2, '0')}:00:00`);
  };

  return hoursOfDay;
};