import { Appointment } from "../models/Appointment";

export const filterAppointmentsByMoth = (appointments: Appointment[], month: Date) => {
  return appointments.filter((appointment: Appointment) => appointment.dateAppointment.getMonth() === month.getMonth());
};