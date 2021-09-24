import { DateTimeFormatOptions } from "../models/DateTimeFormatOptions";

export const formatDate = (date: Date, optFormat: DateTimeFormatOptions ) => {
  const locale: string = 'en-US';

  return new Intl.DateTimeFormat(locale, optFormat).format(date);
};