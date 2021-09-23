import React, { useEffect, useState } from 'react';

import { CalendarMonth } from './components/CalendarMonth';
import { TableAppointments } from './components/TableAppointments';

import { filterAppointmentsByMoth } from './utils/filterAppointmentsByMoth';
import { generateAppointmentsMonth } from './utils/generateAppointmentsMonth';
import { groupAppointmentsByDate } from './utils/groupAppointmentsByDate';
import { datesOfMonthFilterByAppointmentsBusy } from './utils/datesOfMonthFilterByAppointmentsBusy';
import { transformateDataTable } from './utils/transformateDataTable';
import { Button } from 'primereact/button';
import { appointmentsService } from './service/appointmentsService';

function App() {
  const [ month, setMonth ] = useState<Date | undefined>(undefined);
  const [ appointmentsAvailable, setAppointmentsAvailable ] = useState<any>([]);
  const _appointmentsService = appointmentsService;

  useEffect(() => {
    (async () => {
      console.log(await _appointmentsService.getAll());
    })();
    if (month === undefined) return;

    const filteredDatesByMonth = filterAppointmentsByMoth(data, month);
    const datesOfMonth = generateAppointmentsMonth(month);
    const agrupdationDates = groupAppointmentsByDate(filteredDatesByMonth);
    const datesOfMonthFiltered = datesOfMonthFilterByAppointmentsBusy(datesOfMonth, agrupdationDates);
    const dataTransformated = transformateDataTable(datesOfMonthFiltered);

    setAppointmentsAvailable(dataTransformated);
  }, [ month ]);

  return (
    <article role={'main'} className="p-grid p-justify-center p-align-center">
      <header className="header-container p-col-12 p-text-center">
        {
          month !== undefined &&
          <Button className="header-container__btn-back p-button-rounded p-button-outlined" icon="pi pi-arrow-left" onClick={() => setMonth(undefined)} />
        }
        <h1 style={{ color: 'var(--text-color)'}}>💀💀💀 Appointment With The Death 💀💀💀</h1>
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
              <TableAppointments appointmentsAvailable={appointmentsAvailable} />
            </section>
          )
      }
    </article>
  );
}

export default App

var data = [
  {
    "id": "1",
    "counter": "1", // no va
    "date": new Date(2021, 1, 1, 22),
    "user": "sntruhcokb"
  },
  {
    "id": "2",
    "counter": "2", // no va
    "date": new Date(2021, 1, 2, 20),
    "user": "sntruhcokb"
  },
  {
    "id": "10",
    "counter": "10", // no va
    "date": new Date(2021, 1, 3, 0),
    "user": "sntruhcokb"
  },
  {
    "id": "3",
    "counter": "3", // no va
    "date": new Date(2021, 1, 1, 18),
    "user": "sntruhcokb"
  },
  {
    "id": "4",
    "counter": "4", // no va
    "date": new Date(2021, 1, 2, 16),
    "user": "sntruhcokb"
  },
  {
    "id": "5",
    "counter": "5", // no va
    "date": new Date(2021, 2, 1),
    "user": "sntruhcokb"
  },
  {
    "id": "6",
    "counter": "5", // no va
    "date": new Date(2021, 2, 2),
    "user": "sntruhcokb"
  },
]
