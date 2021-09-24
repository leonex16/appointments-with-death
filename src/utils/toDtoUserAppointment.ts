import { DTOUserAppointment } from "../models/DTOUserAppointment";

export const toDtoUserAppointment = (dataWithoutFormat: any) => {
  const dtoUserAppointment: DTOUserAppointment = {
    appointments: dataWithoutFormat.appointments ?? [],
    dateAppointment: new Date(dataWithoutFormat.dateAppointment),
    email: dataWithoutFormat.email,
    name: dataWithoutFormat.name,
    phoneNumber: +dataWithoutFormat.phoneNumber
  };
  return dtoUserAppointment;
}