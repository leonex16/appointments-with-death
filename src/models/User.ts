import { DocumentData, DocumentReference } from "@firebase/firestore";
import { Appointment } from "./Appointment";

export interface User {
  id?: string;
  name: string;
  email: string;
  phoneNumber: number;
  appointments:  DocumentReference<DocumentData>[] | Appointment[] | string[]
}