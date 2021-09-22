import React, { useEffect, useState } from 'react';

import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function App() {
  const [ month, setMonth ] = useState<any>(new Date(2021,1,1));

  const [products, setProducts] = useState<any>([]);
  const [expandedData, setExpandedData] = useState<any[]>([]);

  const groupAppointmentsByDay = (appointments: any) => {
    return appointments.reduce((prev: any[], val: any) => {
      const idDate = val.date.toISOString().slice(0,10).replaceAll('-', '');
      const periodIndx = (prev as any[]).findIndex(period => period[idDate] ? true : false );
      
      ( periodIndx === -1 ) 
        ? prev.push({ [idDate]: [val]})
        : prev[periodIndx][idDate].push(val);
      
      return prev;
    }, []);
  };

  const addDay = (date: Date) => {
    const dayInMs = 1000 * 60 * 60 * 24;
    return new Date(date.getTime() + dayInMs);
  };

  const filterAppointmentsByMoth = (appointments: any, month: Date) => {
    return appointments.filter((appointment: any) => appointment?.date.getMonth() === month.getMonth());
  };

  const getDatesBeetweenTwoDates = (firstDate: Date, lastDate: Date) => {
    const dates: Date[] = [];
    debugger;
    while (firstDate.getTime() < lastDate.getTime()) {
      dates.push(lastDate);
      lastDate = addDay(lastDate);
      break;
    }
    
    return dates;
  };

  const generateAppointmentsMonth = (month: Date) => {
    const yyyy = month.getFullYear();
    const mm = month.getMonth();
    const firstDateOfMonth = new Date(yyyy,mm,1,0,0,0,0);
    const lastDateOfMonth = new Date(yyyy,mm + 1,0,0,0,0,0);
    console.log(getDatesBeetweenTwoDates(firstDateOfMonth, lastDateOfMonth))
  };


  useEffect(() => {
    const filterDatesByMonth = filterAppointmentsByMoth(data, month);
    const agrupdationDates = groupAppointmentsByDay(filterDatesByMonth);
    generateAppointmentsMonth(month);
    setProducts(data);
  }, []);


  const rowExpansionTemplate = (data: any) => {
    console.log(data)
    return (
        <div className="orders-subtable">
            <h5>Orders for {data.name}</h5>
            <DataTable value={data.orders}>
                <Column field="id" header="Id" sortable></Column>
                <Column field="customer" header="Customer" sortable></Column>
                <Column field="date" header="Date" sortable></Column>
            </DataTable>
        </div>
    );
}
  return (
    <>
      {/* <div role={'main'} className="p-grid">
        <div className="p-col">
          <Calendar
            inline
            value={month}
            onChange={(e) => setMonth(e.value)}
            view="month"
            yearRange="2020:2025"
          />
        </div>
        <div className="p-col">
          {month && month.toLocaleString('es-CL')}
        </div>
      </div> */}
      <div className="p-grid">
        <div className="col">
          <DataTable
          value={products}
          onRowToggle={(e) => {
            console.log(e.data)
            setExpandedData(e.data);
          }}
          expandedRows={expandedData}
          // rowExpansionTemplate={rowExpansionTemplate}
          dataKey="id"
          >
            <Column expander style={{ width: '3em' }} />
            <Column field="counter" header="#"></Column>
            <Column field="date" header="Date" body={({date}) => date.toString()}></Column>
            <Column field="quantityAvailable" header="Quantity available"></Column>
          </DataTable>
        </div>
      </div>
    </>
  )
}

export default App

var data =  [
  {
    "id": "1",
    "counter": "1", // no va
    "date": new Date(2021,1,1,22),
    "user": "sntruhcokb"
  },
  {
    "id": "2",
    "counter": "2", // no va
    "date": new Date(2021,1,2, 20),
    "user": "sntruhcokb"
  },
  {
    "id": "3",
    "counter": "3", // no va
    "date": new Date(2021,1,1, 18),
    "user": "sntruhcokb"
  },
  {
    "id": "4",
    "counter": "4", // no va
    "date": new Date(2021,1,2, 16),
    "user": "sntruhcokb"
  },
  {
    "id": "5",
    "counter": "5", // no va
    "date": new Date(2021,2,1),
    "user": "sntruhcokb"
  },
  {
    "id": "6",
    "counter": "5", // no va
    "date": new Date(2021,2,2),
    "user": "sntruhcokb"
  },
]
