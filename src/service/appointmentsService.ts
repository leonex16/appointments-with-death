import { collection, DocumentData, getDocs, QueryDocumentSnapshot, addDoc, onSnapshot } from "@firebase/firestore";

import { firestoreDB } from "../shared/firestoreDB";

import { usersService } from "./usersService";

import { Appointment } from "../models/Appointment";
import { AppointmentsService } from "../models/AppointmentsService";
import { DocAppointment } from "../models/DocAppointment";
import { DTOUserAppointment } from "../models/DTOUserAppointment";

const _userService = usersService;
const appointmentsRef = collection(firestoreDB, '/appointments');

const getAll = async () => {
  const querySnap = await getDocs(appointmentsRef);
  const appointments: Appointment[] = [];

  querySnap.forEach(doc => appointments.push(docToAppointment(doc)));

  return appointments;
};

const getAllStream = async () => {
  return onSnapshot(appointmentsRef, (qs) => {
    const appointments: Appointment[] = [];

    qs.forEach(doc => appointments.push(docToAppointment(doc)));
  
    return appointments;
  });
};

const post = async (dtoUserAppointment: DTOUserAppointment) => {
  const { dateAppointment, email, name, phoneNumber } = dtoUserAppointment;
  const appointmentRef = await addDoc(appointmentsRef, { dateAppointment: dateAppointment })
  const existUser = await _userService.getByEmail(email);

  if (existUser === undefined) {
    await _userService.post({ appointments: [ appointmentRef ], email, name, phoneNumber });
  } else {
    _userService.addAppointment(existUser.user.id!, appointmentRef);
  };
};

export const appointmentsService: AppointmentsService = { getAll, getAllStream, post };

function docToAppointment(doc: QueryDocumentSnapshot<DocumentData>) {
  const { dateAppointment } = doc.data() as DocAppointment;
  const dateAppointmentFormatted = new Date(dateAppointment.seconds * 1000);

  return { dateAppointment: dateAppointmentFormatted } as Appointment;
};