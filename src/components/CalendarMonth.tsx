import React from 'react'
import { Calendar } from 'primereact/calendar';

interface CalendarMonthProps {
  month: Date | undefined,
  setMonth: React.Dispatch<React.SetStateAction<Date | undefined>>
};

export const CalendarMonth = (props: CalendarMonthProps) => {
  const { month, setMonth } = props;

  return (
    <Calendar
      inline
      value={month}
      onChange={(e: any) => setMonth(e.value)}
      view="month"
      yearRange="2020:2025"
      showButtonBar
      todayButtonClassName="calendar-month-today-button"
      clearButtonClassName="calendar-month-clear-button"
    />
  )
}
