import React, { useEffect, useState } from 'react'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { ScheduleAppointment } from './ScheduleAppointment';
import { formatDate } from '../utils/formatDate';
import { DateTimeFormatOptions } from '../models/DateTimeFormatOptions';
import { ValueDataTable } from '../models/DataDataTable';

interface TableAppointmentsProps {
  appointmentsAvailable: ValueDataTable[];
  month: Date;
};

export const TableAppointments = (props: TableAppointmentsProps) => {
  const { appointmentsAvailable, month } = props;
  const [ expandedData, setExpandedData ] = useState<ValueDataTable[]>([]);
  const [ loadingData, setLoadingData ] = useState<boolean>(true);

  const rowExpansionTemplate = (data: any) => {
    return (
      <DataTable
        scrollable
        scrollHeight={'150%'}
        value={data.hoursAvailable}
      >
        <Column field="hoursAvailable" header="Hours available" body={hour => hour.slice(0, 5)} ></Column>
        <Column field="scheduleAppointment" header="Schedule appointment" body={hour => <ScheduleAppointment date={new Date(`${data.date} ${hour}`)}/>}></Column>
      </DataTable>
    );
  };

  const nameDateColumn = () => {
    const optFormat: DateTimeFormatOptions = { month: 'long' };
    const monthName = formatDate(new Date(month), optFormat)
    return `Date (${monthName})`;
  };

  const templateDateColumn = (date: string) => {
    const optFormat: DateTimeFormatOptions = { weekday: 'long', day: '2-digit' };
    const dateFormat = formatDate(new Date(date), optFormat)
    return dateFormat;
  };

  useEffect(() => {
    if ( appointmentsAvailable.length > 0 ) setLoadingData(false);
  }, [appointmentsAvailable])

  return (
    <DataTable
      scrollable
      dataKey="id"
      scrollHeight={'calc(75vh - 80px)'} // height header
      value={appointmentsAvailable}
      loading={loadingData}
      expandedRows={expandedData}
      rowExpansionTemplate={rowExpansionTemplate}
      onRowToggle={dataTableRowToggleParams => setExpandedData(dataTableRowToggleParams.data)}
    >
      <Column expander style={{ width: '3rem' }} />
      <Column style={{ width: '3rem' }} field="id" header="#"></Column>
      <Column field="date" header={nameDateColumn()} body={({ date }) => templateDateColumn(date)}></Column>
      <Column field="quantityAvailable" header="Quantity available" body={(e) => e.hoursAvailable.length}></Column>
    </DataTable>
  )
}
