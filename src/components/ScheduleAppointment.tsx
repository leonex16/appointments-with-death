import React, { FormEvent, useRef, useState } from 'react';
import { Button } from 'primereact/button'
import { Toast, ToastMessage } from 'primereact/toast';

import { ToastCustom } from './ToastCustom';
import { FormSendAppointment } from './FormSendAppointment';

import { appointmentsService } from '../service/appointmentsService';

import { getDiffDates } from '../utils/getDiffDates';
import { toDtoUserAppointment } from '../utils/toDtoUserAppointment';

import { DTOUserAppointment } from '../models/DTOUserAppointment';

interface ScheduleAppointmentProps {
  date: Date,
};

export const ScheduleAppointment = (props: ScheduleAppointmentProps) => {
  const { date } = props;
  const toast = useRef(null);
  const [ isDialogVisible, setIsDialogVisible ] = useState(false);
  const [ formSending, setFormSending ] = useState(false);

  const isValidFormSendAppointment = (formAppointment: any) => {
    if (isNaN(formAppointment[ 'phoneNumber' ])) return false;

    for (const key in formAppointment) {
      if (formAppointment[ key ] === undefined || formAppointment[ key ] === "") return false;
    };

    return true;
  };

  const scheduleAppointment = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setFormSending(true);

    const { name, phoneNumber, email, appointment } = (evt.target as any);
    const formAppointment = {
      name: name?.value?.trim(),
      phoneNumber: phoneNumber?.value?.trim(),
      email: email?.value?.trim(),
      dateAppointment: appointment?.value?.trim()
    };
    const toastMessage: ToastMessage = {
      contentClassName: '',
      severity: 'warn',
      life: 6000,
      content: <ToastCustom summary={'Scheduled Appointment'} detail={'Are you ready to dance with Death? 😱'} />
    };
    const isValidForm = isValidFormSendAppointment(formAppointment);

    if (isValidForm === false) {
      toastMessage.severity = 'error';
      toastMessage.content = <ToastCustom summary={'Form Invalid'} detail={'Check the information entered, please 🥺👉👈'} />
      toast.current !== null && (toast.current as any).show(toastMessage);
      setFormSending(false);
      return;
    }

    const dtoUserAppointment: DTOUserAppointment = toDtoUserAppointment(formAppointment);

    appointmentsService.post(dtoUserAppointment)
      .then(() => {
        localStorage.setItem('lastScheduling', new Date().getTime().toString());
        setIsDialogVisible(false);
        toast.current !== null && (toast.current as any).show(toastMessage);
        setFormSending(false);
      })
      .catch((err) => {
        toastMessage.severity = 'error';
        toastMessage.content = <ToastCustom summary={'Ops!'} detail={'Sorry, we are having trouble 😥. Try again later 🥺👉👈'} />;
        console.error("SCHEDULE_APPOINTMENT: " + err);
        toast.current !== null && (toast.current as any).show(toastMessage);
        setFormSending(false);
      });
  };

  const openDialog = () => {
    const lastScheduling = localStorage.getItem('lastScheduling');

    if (
      lastScheduling === null ||
      getDiffDates(new Date(+lastScheduling), new Date()) > 1
    ) return setIsDialogVisible(true);

    const toastMessage: ToastMessage = {
      contentClassName: '',
      severity: 'error',
      life: 6000,
      content: <ToastCustom summary={'Scheduling blocked'} detail={'Sorry, but you scheduled an appointment less than an hour ago'} />
    };

    (toast.current! as any).show(toastMessage);
  };

  return (
    <>
      <FormSendAppointment
        isDialogVisible={isDialogVisible}
        setIsDialogVisible={setIsDialogVisible}
        onSubmit={scheduleAppointment}
        dateAppointment={date}
        loading={formSending}
      />
      <Toast ref={toast} />
      <Button
        className="p-button-outlined"
        label="Schedule"
        icon="pi pi-calendar"
        iconPos="left"
        onClick={openDialog}
      />
    </>
  )
}
