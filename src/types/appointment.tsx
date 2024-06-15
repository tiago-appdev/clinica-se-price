interface Appointment {
    appointment_time: string;
    appointment_date: string;
    appointment_doctor_id: string;
    appointment_type: string;
    appointment_status: string;
    doctors: {
      doctor_first_name: string;
      doctor_last_name: string;
    };
  }

export default Appointment;