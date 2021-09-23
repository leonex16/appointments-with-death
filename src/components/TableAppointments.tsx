import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react'
import { ScheduleAppointment } from './ScheduleAppointment';

interface TableAppointmentsProps {
  appointmentsAvailable: any[];
  // setAppointmentsAvailable: React.Dispatch<React.SetStateAction<any[]>>;
};

export const TableAppointments = (props: TableAppointmentsProps) => {
  const { appointmentsAvailable } = props;
  const [ expandedData, setExpandedData ] = useState<any[]>([]);

  const rowExpansionTemplate = (data: any) => {
    return (
      <DataTable
        scrollable
        scrollHeight={'150%'}
        value={data.hoursAvailable}
      >
        <Column field="hoursAvailable" header="Hours available" body={hour => hour.slice(0, 5)} ></Column>
        <Column field="scheduleAppointment" header="Schedule appointment" body={hour => <ScheduleAppointment date={new Date(`${data.date} ${hour}`)} />}></Column>
      </DataTable>
    );
  };

  return (
    <DataTable
      scrollable
      scrollHeight={'60vh'}
      value={appointmentsAvailable}
      onRowToggle={(e) => {
        setExpandedData(e.data);
      }}
      expandedRows={expandedData}
      rowExpansionTemplate={rowExpansionTemplate}
      dataKey="id"
    >
      <Column expander style={{ width: '3rem' }} />
      <Column style={{ width: '3rem' }} field="id" header="#"></Column>
      <Column field="date" header="Date" body={({ date }) => date.toString()}></Column>
      <Column field="quantityAvailable" header="Quantity available" body={(e) => e.hoursAvailable.length}></Column>
    </DataTable>
  )
}
