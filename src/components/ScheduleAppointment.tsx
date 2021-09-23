import React, { FormEvent, useRef, useState } from 'react';
import { Button } from 'primereact/button'
import { Toast, ToastMessage } from 'primereact/toast';
import { ToastCustom } from './ToastCustom';
import { FormSendAppointment } from './FormSendAppointment';

interface ScheduleAppointmentProps {
  date: Date
};

export const ScheduleAppointment = (props: ScheduleAppointmentProps) => {
  const { date } = props;
  const toast = useRef(null);
  const [ isDialogVisible, setIsDialogVisible ] = useState(false);

  const isValidFormSendAppointment = (formAppointment: any) => {
    if ( isNaN(formAppointment['phoneNumber']) ) return false;

    for (const key in formAppointment) {
      if ( formAppointment[key] === undefined || formAppointment[key] === "" ) return false;
    };
    
    return true;
  };

  const schuduleAppointment = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { name, phoneNumber, email, appointment } = (evt.target as any);
    const formAppointment = { name: name?.value, phoneNumber: phoneNumber?.value, email: email?.value, appointment: appointment?.value };
    const isValidForm = isValidFormSendAppointment(formAppointment);
    const toastMessage: ToastMessage = {
      contentClassName: '',
      severity: 'warn',
      life: 3000,
      content: <ToastCustom summary={'Scheduled Appointment'} detail={'Are you ready to dance with Death? 😱'} />
    };

    if ( isValidForm === false ) {
      toastMessage.severity = 'error';
      toastMessage.content = <ToastCustom summary={'Form Invalid'} detail={'Check the information entered, please'} />
    };
    
    return (toast.current! as any).show(toastMessage);
  };

  return (
    <>
    <FormSendAppointment
    isDialogVisible={isDialogVisible}
    setIsDialogVisible={setIsDialogVisible}
    onSubmit={schuduleAppointment}
    dateAppointment={date}
    />
      <Toast ref={toast} />
      <Button
        className="p-button-outlined"
        label="Schedule"
        icon="pi pi-calendar"
        iconPos="left"
        onClick={() => setIsDialogVisible(true)}
      />
    </>
  )
}
