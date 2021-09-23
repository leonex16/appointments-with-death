export const transformateDataTable = (data: any) => {
  return data.map((appointmentHours: any, i: number) => {
    const dateOfAppointment = appointmentHours.date.slice(0,10);
    const newData = {
      id: i + 1,
      date: dateOfAppointment,
      hoursAvailable: appointmentHours.hoursAvailable
    };
    return newData;
  });
};