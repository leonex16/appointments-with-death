import { Unsubscribe } from "@firebase/firestore";
import { Appointment } from "./Appointment";
import { DTOUserAppointment } from "./DTOUserAppointment";
import { User } from "./User";

export interface AppointmentsService {
  getAll: () => Promise<Appointment[]>;
  getAllStream: () => Promise<Unsubscribe>;
  post: (dtoUserAppointment: DTOUserAppointment) => Promise<void>;
};