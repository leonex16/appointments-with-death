export const groupAppointmentsByDate = (appointments: any) => {
  return appointments.reduce((prev: any[], val: any) => {
    const idDate = val.date.toLocaleDateString('en-ZA').replaceAll('/', '');
    const periodIndx = (prev as any[]).findIndex(period => period[ idDate ] ? true : false);

    (periodIndx === -1)
      ? prev.push({ [ idDate ]: [ val ] })
      : prev[ periodIndx ][ idDate ].push(val);

    return prev;
  }, []);
};