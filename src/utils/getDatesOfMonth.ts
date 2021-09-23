export const getDatesOfMonth = (lastDateOfMonth: Date) => {
  const dates: string[] = [];
  const dd = lastDateOfMonth.getDate();
  const mm = (lastDateOfMonth.getMonth() + 1).toString().padStart(2, '0');
  const yy = lastDateOfMonth.getFullYear().toString();

  for (let i = 0; i < dd; i++) {
    const dd = (i + 1).toString().padStart(2, '0');
    dates.push(`${yy}/${mm}/${dd}`);
  };

  return dates;
};