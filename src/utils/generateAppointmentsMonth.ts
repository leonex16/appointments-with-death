import { getDatesOfMonth } from "./getDatesOfMonth";

export const generateAppointmentsMonth = (month: Date) => {
  const yyyy = month.getFullYear();
  const mm = month.getMonth();
  const lastDateOfMonth = new Date(yyyy, mm + 1, 0);

  return getDatesOfMonth(lastDateOfMonth);
};