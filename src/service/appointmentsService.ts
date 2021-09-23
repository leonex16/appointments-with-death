import { collection, DocumentData, getDocs, QueryDocumentSnapshot, addDoc } from "@firebase/firestore";

import { firestoreDB } from "../shared/firestoreDB";

import { Appointment } from "../models/Appointment";
import { AppointmentsService } from "../models/AppointmentsService";
import { DocAppointment } from "../models/DocAppointment";

const appointmentsRef = collection(firestoreDB, '/appointments');

const getAll = async () => {
  const querySnap = await getDocs(appointmentsRef);
  const appointments: Appointment[] = [];

  querySnap.forEach( doc => appointments.push(docToAppointment(doc)));

  return appointments;
};

const post = async (appointment: Appointment) => {};

export const appointmentsService: AppointmentsService = { getAll };

function docToAppointment(doc: QueryDocumentSnapshot<DocumentData>) {
  const { date, user } = doc.data() as DocAppointment;
  const id = doc.id;
  const dateAppointment = new Date(date.seconds * 1000);
  const userPath = user._key.path.segments[user._key.path.segments.length - 1];
  
  return { id, dateAppointment, userPath } as Appointment;
};