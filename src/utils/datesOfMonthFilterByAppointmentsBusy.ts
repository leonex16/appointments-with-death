import { Appointment } from "../models/Appointment";
import { DatesOfMonthFilterByAppointmentsBusy } from "../models/DatesOfMonthFilterByAppointmentsBusy";
import { GroupAppointmentsByDate } from "../models/GroupAppointmentsByDate";
import { getHoursOfDay } from "./getHoursOfDays";

export const datesOfMonthFilterByAppointmentsBusy = (allDatesOfMonth: string[], appointmentsBusy: GroupAppointmentsByDate[]) => {
  return allDatesOfMonth.map((date: string) => {
    const dateId = date.replaceAll('/', '');
    const valuesAgrupation: any = Object.values(appointmentsBusy);

    for (let i = 0; i < valuesAgrupation.length; i++) {
      const appointmentFound = valuesAgrupation[ i ][ dateId ];

      if (appointmentFound !== undefined) {
        const hoursAppointments = appointmentFound.map((appointment: Appointment) => appointment.dateAppointment.getHours());
        return {
          date,
          hoursAvailable: getHoursOfDay(hoursAppointments)
        } as DatesOfMonthFilterByAppointmentsBusy;
      };
    };

    return {
      date,
      hoursAvailable: getHoursOfDay([])
    } as DatesOfMonthFilterByAppointmentsBusy;
  });
};