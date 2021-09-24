import { Appointment } from "../models/Appointment";
import { GroupAppointmentsByDate } from "../models/GroupAppointmentsByDate";

export const groupAppointmentsByDate = (appointments: Appointment[]) => {
  return appointments.reduce((prev: GroupAppointmentsByDate[], val: Appointment) => {
    const idDate = val.dateAppointment.toLocaleDateString('en-ZA').replaceAll('/', '');
    const periodIndx = prev.findIndex(period => period[ idDate ] ? true : false);

    (periodIndx === -1)
      ? prev.push({ [ idDate ]: [ val ] })
      : prev[ periodIndx ][ idDate ].push(val);

    return prev;
  }, []);
};