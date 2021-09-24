import { Appointment } from "./Appointment";

export interface GroupAppointmentsByDate {
  [key: string]: Appointment[]
}