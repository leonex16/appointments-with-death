export const filterAppointmentsByMoth = (appointments: any, month: Date) => {
  return appointments.filter((appointment: any) => appointment?.date.getMonth() === month.getMonth());
};