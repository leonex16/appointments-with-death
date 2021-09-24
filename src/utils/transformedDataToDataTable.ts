import { ValueDataTable } from "../models/DataDataTable";
import { DatesOfMonthFilterByAppointmentsBusy } from "../models/DatesOfMonthFilterByAppointmentsBusy";

export const transformedDataToDataTable = (data: DatesOfMonthFilterByAppointmentsBusy[]) => {
  return data.map((appointmentHours: DatesOfMonthFilterByAppointmentsBusy, i: number) => {
    const dateOfAppointment = appointmentHours.date.slice(0, 10);
    const transformedData: ValueDataTable = {
      id: i + 1,
      date: dateOfAppointment,
      hoursAvailable: appointmentHours.hoursAvailable
    };
    return transformedData;
  });
};