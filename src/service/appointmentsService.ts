import { collection, DocumentData, getDocs, addDoc, onSnapshot, QuerySnapshot } from "@firebase/firestore";

import { firestoreDB } from "../shared/firestoreDB";

import { usersService } from "./usersService";

import { Appointment } from "../models/Appointment";
import { AppointmentsService } from "../models/AppointmentsService";
import { DTOUserAppointment } from "../models/DTOUserAppointment";
import { queryDocSnapToAppointment } from "../utils/queryDocSnapToAppointment";

const _userService = usersService;
const appointmentsRef = collection(firestoreDB, '/appointments');

const getAll = async () => {
  const querySnap = await getDocs(appointmentsRef);
  const appointments: Appointment[] = [];

  querySnap.forEach(doc => appointments.push(queryDocSnapToAppointment(doc)));

  return appointments;
};

const getAllStream = (cb: (qs: QuerySnapshot<DocumentData>) => void) => {
  return onSnapshot(appointmentsRef, cb);
};

const post = async (dtoUserAppointment: DTOUserAppointment) => {
  const { dateAppointment, email, name, phoneNumber } = dtoUserAppointment;
  const appointmentRef = await addDoc(appointmentsRef, { dateAppointment: dateAppointment })
  const existUser = await _userService.getByEmail(email);

  (existUser === undefined)
    ? await _userService.post({ appointments: [ appointmentRef ], email, name, phoneNumber })
    : await _userService.addAppointment(existUser.user.id!, { name, phoneNumber }, appointmentRef);
};

export const appointmentsService: AppointmentsService = { getAll, getAllStream, post };