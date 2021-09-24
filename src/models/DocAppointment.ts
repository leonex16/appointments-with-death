export interface DocAppointment {
  dateAppointment: DateClass;
}

export interface DateClass {
  seconds:     number;
  nanoseconds: number;
}