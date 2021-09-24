import React, { FormEvent } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

interface FormSendAppointmentProps {
  isDialogVisible: boolean;
  setIsDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (evt: FormEvent<HTMLFormElement>) => void;
  dateAppointment: Date,
  loading: boolean;
};

export const FormSendAppointment = (props: FormSendAppointmentProps) => {
  const { isDialogVisible, setIsDialogVisible, onSubmit, dateAppointment, loading } = props;

  return (
    <Dialog
      className={'dialog-form-container'}
      header={'Personal Information'}
      visible={isDialogVisible}
      onHide={() => setIsDialogVisible(false)}
    >
      <form className="form-container p-fluid" onSubmit={onSubmit}>
        <div className="form-group p-inputgroup">
          <span className=" p-float-label">
            <InputText id="name" name="name" type="text" />
            <label htmlFor="name">Name</label>
          </span>
          <span className="p-inputgroup-addon p-inputgroup-addon--custom">
            <i className="pi pi-user"></i>
          </span>
        </div>
        <div className="form-group p-inputgroup">
          <span className=" p-float-label">
            <InputText id="phoneNumber" name="phoneNumber" type="text" />
            <label htmlFor="phoneNumber">Phone Number</label>
          </span>
          <span className="p-inputgroup-addon p-inputgroup-addon--custom">
            <i className="pi pi-phone"></i>
          </span>
        </div>
        <div className="form-group p-inputgroup">
          <span className=" p-float-label">
            <InputText id="email" name="email" type="text" />
            <label htmlFor="email">Email</label>
          </span>
          <span className="p-inputgroup-addon p-inputgroup-addon--custom">
            <i className="pi pi-send"></i>
          </span>
        </div>
        <span className="form-group p-float-label">
          <Calendar id="appointment" name="appointment" value={dateAppointment} showIcon showTime disabled />
          <label htmlFor="appointment">Appointment</label>
        </span>
        <span className="form-group ">
          <Button type="submit" label="Submit" icon="pi pi-check" loading={loading} style={{ fontWeight: 'bold' }} />
        </span>
      </form>
    </Dialog>
  )
}
