/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogFooter, DialogHeader } from './Dialog';
import Label from './Label';
import DatePicker from 'react-datepicker';
import Input from './Input';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';

// Modal para reservar turnos
const AppointmentModal = ({
  isModalOpen,
  handleModalClose,
  activeTab,
  setActiveTab,
  patientId,
  setPatientId,
  handlePatientIdBlur,
  appointmentType,
  setAppointmentType,
  professional,
  handleProfessionalChange,
  professionals,
  date,
  handleDateChange,
  time,
  handleTimeChange,
  availableTimes,
  handleSubmit,
  appointments,
}) => {
  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={handleModalClose}
    >
      <DialogContent className='sm:max-w-[500px] sm:min-h-[495px] sm:max-h-[500px]'>
        <DialogHeader>
          <button
            className={`p-4 ${
              activeTab === 'reservar'
                ? 'border-b-2 border-gray-900 font-semibold'
                : ''
            }`}
            onClick={() => setActiveTab('reservar')}
          >
            Reservar Turno
          </button>
          <button
            className={`p-4 ${
              activeTab === 'mis-turnos'
                ? 'border-b-2 border-gray-900 font-semibold'
                : ''
            }`}
            onClick={() => setActiveTab('mis-turnos')}
          >
            Sus Turnos
          </button>
        </DialogHeader>
        {activeTab === 'reservar' ? (
          <form
            onSubmit={handleSubmit}
            className='grid gap-4 py-4'
          >
            <div className='grid items-center grid-cols-4 gap-4'>
              <Label
                htmlFor='patientId'
                className='text-right'
              >
                DNI
              </Label>
              <Input
                id='patientId'
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                onBlur={handlePatientIdBlur}
                type='text'
                placeholder='Ingrese su DNI. Sin puntos.'
                required
                className='col-span-3'
              />
            </div>
            <div className='grid items-center grid-cols-4 gap-4'>
              <Label
                htmlFor='appointmentType'
                className='text-right'
              >
                Tipo de Turno
              </Label>
              <select
                id='appointmentType'
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                required
                className='col-span-3 block w-full px-3 py-2 border rounded-md text-sm text-gray-700 focus:ring-1 focus:ring-primary focus:border-primary'
              >
                <option value='Atención Medica'>Atención Medica</option>
                <option value='Análisis Clínicos'>Análisis Clínicos</option>
              </select>
            </div>
            <div className='grid items-center grid-cols-4 gap-4'>
              <Label
                htmlFor='professional'
                className='text-right'
              >
                Profesional
              </Label>
              <select
                id='professional'
                value={professional}
                onChange={handleProfessionalChange}
                required
                className='col-span-3 block w-full px-3 py-2 border rounded-md text-sm text-gray-700 focus:ring-1 focus:ring-primary focus:border-primary'
              >
                <option value=''>Seleccione un profesional</option>
                {professionals.map((prof) => (
                  <option
                    key={prof.doctor_id}
                    value={prof.doctor_id}
                  >
                    {prof.doctor_first_name}
                  </option>
                ))}
              </select>
            </div>
            <div className='grid items-center grid-cols-4 gap-4'>
              <Label
                htmlFor='date'
                className='text-right'
              >
                Fecha
              </Label>
              <DatePicker
                id='date'
                selected={date}
                onChange={handleDateChange}
                dateFormat='dd/MM/yyyy'
                minDate={new Date()}
                required
                className='col-span-3 px-3 py-2 border rounded-md text-sm text-gray-700 focus:ring-1 focus:ring-primary focus:border-primary'
              />
            </div>
            <div className='grid items-center grid-cols-4 gap-4'>
              <Label
                htmlFor='time'
                className='text-right'
              >
                Hora
              </Label>
              <div>
                <select
                  id='time'
                  value={time}
                  onChange={handleTimeChange}
                  required
                  className='col-span-3 px-3 py-2 border rounded-md text-sm text-gray-700 focus:ring-1 focus:ring-primary focus:border-primary'
                >
                  {availableTimes.map((timeOption) => (
                    <option
                      key={timeOption}
                      value={timeOption}
                    >
                      {timeOption}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <DialogFooter>
              <button
                type='submit'
                className='inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 disabled:pointer-events-none disabled:opacity-50'
              >
                Confirmar Turno
              </button>
              <button
                type='button'
                className='inline-flex h-10 items-center justify-center rounded-md bg-red-700 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 disabled:pointer-events-none disabled:opacity-50'
                onClick={handleModalClose}
              >
                Cancelar
              </button>
            </DialogFooter>
          </form>
        ) : (
          <div className='overflow-auto sm:max-h-[20rem]'>
            <ul className='space-y-2'>
              {appointments.length > 0 ? (
                appointments.map((appointment, index) => (
                  <li
                    key={index}
                    className='border p-2 rounded-md'
                  >
                    <p>
                      Fecha:{' '}
                      {new Date(
                        appointment.appointment_date + 'T12:00:00'
                      ).toLocaleDateString()}
                    </p>
                    <p>Hora: {appointment.appointment_time}</p>
                    <p>
                      Doctor: {appointment.doctors.doctor_first_name}{' '}
                      {appointment.doctors.doctor_last_name}
                    </p>
                  </li>
                ))
              ) : (
                <li className='border p-2 rounded-md'>
                  <p>No hay turnos.</p>
                </li>
              )}
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
