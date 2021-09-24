import { DocumentData, QuerySnapshot, Unsubscribe } from "@firebase/firestore";
import { Appointment } from "./Appointment";
import { DTOUserAppointment } from "./DTOUserAppointment";
import { User } from "./User";

export interface AppointmentsService {
  getAll: () => Promise<Appointment[]>;
  getAllStream: (cb: (qs: QuerySnapshot<DocumentData>) => void) => Unsubscribe;
  post: (dtoUserAppointment: DTOUserAppointment) => Promise<void>;
};