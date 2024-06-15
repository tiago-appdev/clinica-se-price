interface Appointment {
    appointment_time: string;
    appointment_date: string;
    appointment_doctor_id: string;
    appointment_type: string;
    appointment_status: string;
    appointment_payment_status: boolean;
    doctors: {
      doctor_first_name: string;
      doctor_last_name: string;
    };
    patients: {
        patient_id: string;
        patient_date_of_birth: string;
        patient_first_name: string;
        patient_last_name: string;
    }
  }

export default Appointment;