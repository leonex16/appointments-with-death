import { ValueDataTable } from "../models/DataDataTable";
import { DatesOfMonthFilterByAppointmentsBusy } from "../models/DatesOfMonthFilterByAppointmentsBusy";

export const transformedDataToDataTable = (data: DatesOfMonthFilterByAppointmentsBusy[]) => {
  const removeDatesWithoutAppointment = data.filter((appointmentHours: DatesOfMonthFilterByAppointmentsBusy) => appointmentHours.hoursAvailable.length !== 0 ? true : false);
  return removeDatesWithoutAppointment.map((appointmentHours: DatesOfMonthFilterByAppointmentsBusy, i: number) => {
    const dateOfAppointment = appointmentHours.date.slice(0, 10);
    const transformedData: ValueDataTable = {
      id: i + 1,
      date: dateOfAppointment,
      hoursAvailable: appointmentHours.hoursAvailable
    };
    return transformedData;
  });
};