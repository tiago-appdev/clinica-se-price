import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase"; // Importación del cliente Supabase
import "react-datepicker/dist/react-datepicker.css"; // Estilos para DatePicker
import AdminLoginModal from "../components/ModalLoginAdmin"; // Modal de inicio de sesión para administradores
import {
  CrossIcon,
  HeartPulseIcon,
  MicroscopeIcon,
  StethoscopeIcon,
} from "../icons/icons"; // Iconos utilizados en la página
import { generateTimeOptions } from "../utils/util"; // Función utilitaria para generar opciones de tiempo
import Footer from "../components/Footer"; // Componente de pie de página
import ModalPatients from "../components/ModalPatients"; // Modal para pacientes
import Appointment from "../types/appointment"; // Tipo de datos para citas médicas
import AppointmentModal from "../components/AppointmentModal"; // Modal para gestionar citas médicas

export default function Home() {
  // Estados para gestionar el estado de los modales y datos de la página
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal principal
  const [isModalPatientOpen, setIsModalPatientOpen] = useState(false); // Estado para abrir/cerrar el modal de pacientes
  const [isModalAdminOpen, setIsModalAdminOpen] = useState(false); // Estado para abrir/cerrar el modal de inicio de sesión de administrador
  const [patientId, setPatientId] = useState(""); // Estado para almacenar el ID del paciente
  const [professionals, setProfessionals] = useState<any[]>([]); // Estado para almacenar la lista de profesionales médicos
  const [professional, setProfessional] = useState(""); // Estado para almacenar el ID del profesional seleccionado
  const [appointmentType, setAppointmentType] = useState("Atención Medica"); // Estado para el tipo de cita seleccionado
  const [date, setDate] = useState(new Date()); // Estado para la fecha de la cita seleccionada
  const [time, setTime] = useState("08:00"); // Estado para la hora de la cita seleccionada
  const [availableTimes, setAvailableTimes] = useState<string[]>( // Estado para almacenar las horas disponibles
    generateTimeOptions(),
  );
  const [activeTab, setActiveTab] = useState("reservar"); // Estado para gestionar la pestaña activa en el modal de citas

  const [appointments, setAppointments] = useState<Appointment[]>([]); // Estado para almacenar las citas del paciente

  // Función para obtener la lista de profesionales médicos desde Supabase
  const fetchProfessionals = async () => {
    try {
      const { data, error } = await supabase.from("doctors").select("*");
      if (error) {
        throw error;
      }
      setProfessionals(data);
    } catch (error) {
      console.error("Error fetching professionals:", error.message);
    }
  };

  // Efecto que se ejecuta una vez al montar el componente para obtener la lista de profesionales
  useEffect(() => {
    fetchProfessionals();
  }, []);

  // Función para obtener las citas del doctor seleccionado para una fecha específica desde Supabase
  const fetchDoctorAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select("appointment_time")
        .eq("appointment_doctor_id", professional)
        .eq("appointment_date", date.toISOString().split("T")[0]);
      if (error) {
        throw error;
      }
      // Dependiendo del doctor seleccionado, buscamos las horas disponibles
      const bookedTimes = data.map(
        (appointment) => appointment.appointment_time,
      );
      // Actualizamos las horas disponibles
      updateAvailableTimes(bookedTimes);
    } catch (error) {
      console.error("Error fetching appointments:", error.message);
    }
  };

  // Función para obtener las citas del paciente especificado desde Supabase
  const fetchPatientAppointments = async () => {
    try {
      const { data: patientData, error: patientError } = await supabase
        .from("patients")
        .select("patient_id")
        .eq("patient_dni", patientId)
        .maybeSingle();

      if (patientError) {
        throw patientError;
      }

      if (!patientData) {
        setAppointments([]);
        return;
      }

      let query = supabase
        .from("appointments")
        .select(
          `appointment_time, 
                 appointment_date, 
                 appointment_doctor_id, 
                 appointment_type, 
                 doctors:appointment_doctor_id (doctor_first_name, doctor_last_name)`,
        )
        .eq("appointment_patient_id", patientData.patient_id)
        .gte("appointment_date", new Date().toISOString().split("T")[0]);

      // Si se seleccionó un profesional, filtramos las citas por ese profesional
      if (professional) {
        query = query.eq("appointment_doctor_id", professional);
      }

      const { data, error } = await query
        .returns<Appointment[]>()
        .order("appointment_date, appointment_time", {
          ascending: true,
        });

      if (error) {
        throw error;
      }
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error.message);
    }
  };

  // Función para actualizar las horas disponibles según las citas reservadas
  const updateAvailableTimes = (bookedTimes: string | any[]) => {
    const allTimes = generateTimeOptions();
    const filteredTimes = allTimes.filter(
      (time) => !bookedTimes.includes(time + ":00"),
    );
    setAvailableTimes(filteredTimes);
  };

  // Efecto que se ejecuta cuando se cambia el profesional médico seleccionado o la fecha de la cita
  useEffect(() => {
    if (professional && date) {
      fetchDoctorAppointments();
    }
  }, [professional, date]);

  // Efecto que se ejecuta cuando se cambia el profesional médico seleccionado (para manejar citas del paciente)
  useEffect(() => {
    handlePatientIdBlur();
  }, [professional]);

  // Cuando dejamos el input de DNI del paciente, buscamos los turnos del paciente
  const handlePatientIdBlur = async () => {
    if (patientId) {
      await fetchPatientAppointments();
    }
  };

  // Función para abrir el modal principal de reserva de cita
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal principal y limpiar los estados relacionados
  const handleModalClose = () => {
    setIsModalOpen(false);
    setPatientId("");
    setProfessional("");
    setDate(new Date());
    setTime("08:00");
    setActiveTab("reservar");
    setAppointments([]);
  };

  // Función para manejar el envío del formulario de reserva de cita
  const handleSubmit = (e) => {
    e.preventDefault();
    saveAppointment();
    handleModalClose();
    alert("Turno reservado con éxito");
  };

  // Función para guardar la cita médica en la base de datos usando Supabase
  const saveAppointment = async () => {
    try {
      const { data: patientData, error: patientError } = await supabase
        .from("patients")
        .select("patient_id")
        .eq("patient_dni", patientId)
        .single();

      if (patientError) {
        throw patientError;
      }

      const { data, error } = await supabase.from("appointments").insert([
        {
          appointment_patient_id: patientData.patient_id,
          appointment_doctor_id: professional,
          appointment_type: appointmentType,
          appointment_date: date,
          appointment_time: time,
        },
      ]);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error saving appointment:", error.message);
    }
  };

  // Función para manejar el cambio del profesional médico seleccionado
  const handleProfessionalChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setProfessional(e.target.value);
  };

  // Función para manejar el cambio de la fecha de la cita
  const handleDateChange = (date: React.SetStateAction<Date>) => {
    setDate(date);
  };

  // Función para manejar el cambio de la hora de la cita
  const handleTimeChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTime(e.target.value);
  };

  // Renderizado del componente principal de la página de inicio
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-gray-900 text-white px-4 lg:px-6 h-12 flex items-center">
        <a href="#" className="flex items-center justify-center">
          <CrossIcon className="h-6 w-6" />
          <span className="font-bold text-lg p-1">Clinica SePrice</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <button
            className="text-sm font-medium hover:underline underline-offset-4"
            onClick={() => setIsModalAdminOpen(true)}
          >
            Administrador
          </button>
          <AdminLoginModal
            isOpen={isModalAdminOpen}
            onClose={() => setIsModalAdminOpen(false)}
          />
          <button
            className="text-sm font-medium hover:underline underline-offset-4"
            onClick={() => setIsModalPatientOpen(true)}
          >
            Paciente
          </button>
          <ModalPatients
            isOpen={isModalPatientOpen}
            onClose={() => setIsModalPatientOpen(false)}
          />
        </nav>
      </header>
      <main className="flex-1">
        <section className="flex items-center justify-center w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 space-y-8">
            <div className="grid max-w-[800px] mx-auto gap-4 text-center">
              {/* <CrossIcon className="h-20 w-20 inline-flex items-center justify-center" /> */}
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Bienvenido a Clinica SePrice
              </h1>
              <p className="text-gray-500 md:text-xl dark:text-gray-400">
                Somos un proveedor líder de atención médica dedicado a brindar
                atención excepcional y atención personalizada a nuestros
                pacientes.
              </p>
              <div>
                <button
                  onClick={handleModalOpen}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 disabled:pointer-events-none disabled:opacity-50"
                >
                  Reservar Turno
                </button>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div className="flex flex-col items-center justify-center space-y-2 p-4">
                <StethoscopeIcon className="h-8 w-8" />
                <h3 className="text-lg font-semibold">Atención Primaria</h3>
                <p className="text-gray-500 text-center dark:text-gray-400">
                  Servicios completos de atención primaria para todas sus
                  necesidades de atención médica.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 p-4">
                <HeartPulseIcon className="h-8 w-8" />
                <h3 className="text-lg font-semibold">Cardiología</h3>
                <p className="text-gray-500 text-center dark:text-gray-400">
                  Atención cardíaca experta para mantener su corazón sano y
                  fuerte.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 p-4">
                <MicroscopeIcon className="h-8 w-8" />
                <h3 className="text-lg font-semibold">Laboratorios</h3>
                <p className="text-gray-500 text-center dark:text-gray-400">
                  Servicios de laboratorio avanzados para identificar y abordar
                  sus inquietudes de salud.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 p-4">
                <StethoscopeIcon className="h-8 w-8" />
                <h3 className="text-lg font-semibold">Pediatría</h3>
                <p className="text-gray-500 text-center dark:text-gray-400">
                  Atención médica integral para los más pequeños.
                </p>
              </div>
            </div>
          </div>
        </section>
        <AppointmentModal
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          patientId={patientId}
          setPatientId={setPatientId}
          handlePatientIdBlur={handlePatientIdBlur}
          appointmentType={appointmentType}
          setAppointmentType={setAppointmentType}
          professional={professional}
          handleProfessionalChange={handleProfessionalChange}
          professionals={professionals}
          date={date}
          handleDateChange={handleDateChange}
          time={time}
          handleTimeChange={handleTimeChange}
          availableTimes={availableTimes}
          handleSubmit={handleSubmit}
          appointments={appointments}
        />
      </main>
      <Footer />
    </div>
  );
}
