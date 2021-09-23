import { getHoursOfDay } from "./getHoursOfDays";

export const datesOfMonthFilterByAppointmentsBusy = (allDatesOfMonth: string[], appointmentsBusy: any) => {
  return allDatesOfMonth.map((date: string) => {
    const dateId = date.replaceAll('/', '');
    const valuesAgrupation: any = Object.values(appointmentsBusy);

    for (let i = 0; i < valuesAgrupation.length; i++) {
      const appointmentFound = valuesAgrupation[ i ][ dateId ];

      if (appointmentFound !== undefined) {
        const hoursAppointments = appointmentFound.map(({ date }: { date: Date }) => date.getHours());
        return {
          date,
          hoursAvailable: getHoursOfDay(hoursAppointments)
        };
      };
    };

    return {
      date,
      hoursAvailable: getHoursOfDay([])
    };
  });
};