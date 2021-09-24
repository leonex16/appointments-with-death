import { DocumentData, QueryDocumentSnapshot } from "@firebase/firestore";
import { Appointment } from "../models/Appointment";
import { DocAppointment } from "../models/DocAppointment";

export function queryDocSnapToAppointment(doc: QueryDocumentSnapshot<DocumentData>) {
  const { dateAppointment } = doc.data() as DocAppointment;
  const dateAppointmentFormatted = new Date(dateAppointment.seconds * 1000);

  return { dateAppointment: dateAppointmentFormatted } as Appointment;
};