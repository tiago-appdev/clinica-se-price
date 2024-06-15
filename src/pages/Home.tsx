import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import "react-datepicker/dist/react-datepicker.css";
import AdminLoginModal from "../components/ModalLoginAdmin";
import {
	CrossIcon,
	HeartPulseIcon,
	MicroscopeIcon,
	StethoscopeIcon,
} from "../icons/icons";
import { generateTimeOptions } from "../utils/util";
import Footer from "../components/Footer";
import ModalPatients from "../components/ModalPatients";
import Appointment from "../types/appointment";
import AppointmentModal from "../components/AppointmentModal";

export default function Home() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalPatientOpen, setIsModalPatientOpen] = useState(false);
	const [isModalAdminOpen, setIsModalAdminOpen] = useState(false);
	const [patientId, setPatientId] = useState("");
	const [professionals, setProfessionals] = useState<any[]>([]);
	const [professional, setProfessional] = useState("");
	const [appointmentType, setAppointmentType] = useState("Atención Medica");
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState("08:00");
	const [availableTimes, setAvailableTimes] = useState<string[]>(
		generateTimeOptions()
	);
	const [activeTab, setActiveTab] = useState("reservar");

	const [appointments, setAppointments] = useState<Appointment[]>([]);

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

	useEffect(() => {
		fetchProfessionals();
	}, []);

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
			const bookedTimes = data.map(
				(appointment) => appointment.appointment_time
			);
			updateAvailableTimes(bookedTimes);
		} catch (error) {
			console.error("Error fetching appointments:", error.message);
		}
	};
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
                 doctors:appointment_doctor_id (doctor_first_name, doctor_last_name)`
				)
				.eq("appointment_patient_id", patientData.patient_id)
				.gte(
					"appointment_date",
					new Date().toISOString().split("T")[0]
				);

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

	const updateAvailableTimes = (bookedTimes: string | any[]) => {
		const allTimes = generateTimeOptions();
		const filteredTimes = allTimes.filter(
			(time) => !bookedTimes.includes(time + ":00")
		);
		setAvailableTimes(filteredTimes);
	};

	useEffect(() => {
		if (professional && date) {
			fetchDoctorAppointments();
		}
	}, [professional, date]);

	useEffect(() => {
		handlePatientIdBlur();
	}, [professional]);

	const handlePatientIdBlur = async () => {
		if (patientId) {
			await fetchPatientAppointments();
		}
	};

	const handleModalOpen = () => {
		setIsModalOpen(true);
	};
	const handleModalClose = () => {
		setIsModalOpen(false);
		setPatientId("");
		setProfessional("");
		setDate(new Date());
		setTime("08:00");
		setActiveTab("reservar");
		setAppointments([]);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		saveAppointment();
		handleModalClose();
		alert("Turno reservado con exito");
	};

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

	const handleProfessionalChange = (e: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setProfessional(e.target.value);
	};

	const handleDateChange = (date: React.SetStateAction<Date>) => {
		setDate(date);
	};

	const handleTimeChange = (e: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setTime(e.target.value);
	};

	return (
		<div className="flex flex-col min-h-[100dvh]">
			<header className="bg-gray-900 text-white px-4 lg:px-6 h-12 flex items-center">
				<a href="#" className="flex items-center justify-center">
					<CrossIcon className="h-6 w-6" />
					<span className="font-bold text-lg p-1">
						Clinica SePrice
					</span>
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
								Somos un proveedor líder de atención médica
								dedicado a brindar atención excepcional y
								atención personalizada a nuestros pacientes.
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
								<h3 className="text-lg font-semibold">
									Atención Primaria
								</h3>
								<p className="text-gray-500 text-center dark:text-gray-400">
									Servicios completos de atención primaria
									para todas sus necesidades de atención
									médica.
								</p>
							</div>
							<div className="flex flex-col items-center justify-center space-y-2 p-4">
								<HeartPulseIcon className="h-8 w-8" />
								<h3 className="text-lg font-semibold">
									Cardiología
								</h3>
								<p className="text-gray-500 text-center dark:text-gray-400">
									Atención cardíaca experta para mantener su
									corazón sano y fuerte.
								</p>
							</div>
							<div className="flex flex-col items-center justify-center space-y-2 p-4">
								<MicroscopeIcon className="h-8 w-8" />
								<h3 className="text-lg font-semibold">
									Laboratorios
								</h3>
								<p className="text-gray-500 text-center dark:text-gray-400">
									Servicios de laboratorio avanzados para
									identificar y abordar sus inquietudes de
									salud.
								</p>
							</div>
							<div className="flex flex-col items-center justify-center space-y-2 p-4">
								<StethoscopeIcon className="h-8 w-8" />
								<h3 className="text-lg font-semibold">
									Pediatría
								</h3>
								<p className="text-gray-500 text-center dark:text-gray-400">
									Atención médica integral para los más
									pequeños.
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
