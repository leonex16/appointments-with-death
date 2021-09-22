import React, { useState } from 'react'

import { Calendar as CalendarPrime, CalendarDateTemplateParams, CalendarMonthNavigatorTemplateParams, CalendarYearNavigatorTemplateParams } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

export const Calendar = () => {
  const [ date, setDate ] = useState<Date | any>(new Date());

  const dateTemplate = (date: CalendarDateTemplateParams) => {
    const { year, month, day } = date;
    const fullDate = new Date(year, month, day);

    if (fullDate.getDay() === 0 || fullDate.getDay() === 6) {
      date.selectable = false;

      return <s style={{ opacity: '0.6' }}>{date.day}</s>;
    }

    return date.day;
  };

  const monthNavigatorTemplate = (e: CalendarMonthNavigatorTemplateParams) => {
    return <Dropdown
      value={e.value}
      style={{ lineHeight: 1 }}
      options={e.options}
      onChange={(event) => (e as any).onChange(event.originalEvent, event.value)}
    />;
  };

  const yearNavigatorTemplate = (e: CalendarYearNavigatorTemplateParams) => {
    return <Dropdown
      className="p-ml-2"
      style={{ lineHeight: 1 }}
      value={e.value}
      options={e.options}
      onChange={(event) => (e as any).onChange(event.originalEvent, event.value)}
    />;
  }

  return (
    <CalendarPrime
      showWeek
      monthNavigator
      yearNavigator
      dateTemplate={dateTemplate}
      monthNavigatorTemplate={monthNavigatorTemplate}
      yearNavigatorTemplate={yearNavigatorTemplate}
      yearRange="2010:2030"
      value={date}
      onChange={(e) => setDate(e.value)}
    ></CalendarPrime>
  )
}
