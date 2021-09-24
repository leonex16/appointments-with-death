import React, { useEffect, useState } from 'react';
import { CalendarMonth } from './components/CalendarMonth';
import { TableAppointments } from './components/TableAppointments';
import { Button } from 'primereact/button';

import { appointmentsService } from './service/appointmentsService';

import { filterAppointmentsByMoth } from './utils/filterAppointmentsByMoth';
import { generateAppointmentsMonth } from './utils/generateAppointmentsMonth';
import { groupAppointmentsByDate } from './utils/groupAppointmentsByDate';
import { datesOfMonthFilterByAppointmentsBusy } from './utils/datesOfMonthFilterByAppointmentsBusy';
import { transformedDataToDataTable } from './utils/transformedDataToDataTable';

import { GroupAppointmentsByDate } from './models/GroupAppointmentsByDate';
import { DatesOfMonthFilterByAppointmentsBusy } from './models/DatesOfMonthFilterByAppointmentsBusy';
import { ValueDataTable } from './models/DataDataTable';
import { Appointment } from './models/Appointment';
import { DocumentData, QuerySnapshot, Unsubscribe } from '@firebase/firestore';
import { queryDocSnapToAppointment } from './utils/queryDocSnapToAppointment';

function App() {
  const [ month, setMonth ] = useState<Date | undefined>(undefined);
  const [ appointmentsRaw, setAppointmentsRaw ] = useState<Appointment[]>([])
  const [ appointmentsAvailable, setAppointmentsAvailable ] = useState<ValueDataTable[]>([]);
  const _appointmentsService = appointmentsService;

  const transformedAppointments = (appointments: Appointment[], month: Date) => {
    const filteredDatesByMonth: Appointment[] = filterAppointmentsByMoth(appointments, month);
    const datesOfMonth: string[] = generateAppointmentsMonth(month);
    const agrupationDates: GroupAppointmentsByDate[] = groupAppointmentsByDate(filteredDatesByMonth);
    const datesOfMonthFiltered: DatesOfMonthFilterByAppointmentsBusy[] = datesOfMonthFilterByAppointmentsBusy(datesOfMonth, agrupationDates);
    const transformedData: ValueDataTable[] = transformedDataToDataTable(datesOfMonthFiltered);

    return transformedData
  };

  const initFC = async () => {
    setAppointmentsRaw(await _appointmentsService.getAll());
    if (month === undefined) return;
    setAppointmentsAvailable(transformedAppointments(appointmentsRaw, month));
  };

  const observableAppointments = (qs: QuerySnapshot<DocumentData>) => {
    if (month === undefined) return;
    const appointments: Appointment[] = [];

    qs.forEach(doc => appointments.push(queryDocSnapToAppointment(doc)));

    setAppointmentsAvailable(transformedAppointments(appointments, month));
  };

  const resetStates = () => {
    setAppointmentsAvailable([]);
    setAppointmentsRaw([]);
    setMonth(undefined);
  }

  useEffect(() => {
    (async () => await initFC())();
    const unsubscribe = _appointmentsService.getAllStream(observableAppointments);
    
    return () => unsubscribe();
  }, [ month ]);

  return (
    <article role={'main'} className="p-grid p-justify-center p-align-center">
      <header className="header-container p-col-12 p-text-center">
        {
          month !== undefined &&
          <Button className="header-container__btn-back p-button-rounded p-button-outlined" icon="pi pi-arrow-left" onClick={resetStates} />
        }
        <h1 style={{ color: 'var(--text-color)' }}>💀🕺💀 Dancing with Death 💀💃💀</h1>
      </header>
      {
        month === undefined
          ? (
            <section className="calendar-month-container p-col-fixed p-shadow-10">
              <CalendarMonth month={month} setMonth={setMonth} />
            </section>
          )
          : (
            <section className="table-appointments-container p-col-12 p-shadow-10">
              <TableAppointments appointmentsAvailable={appointmentsAvailable} month={month} />
            </section>
          )
      }
    </article>
  );
}

export default App