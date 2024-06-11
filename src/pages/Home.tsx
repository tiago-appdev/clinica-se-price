"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
} from "../components/Dialog";
import Input from "../components/Input";
import Label from "../components/Label";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../components/Button";

export default function Home() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [patientId, setPatientId] = useState("");
	const [professionals, setProfessionals] = useState<any[]>([]);
	const [professional, setProfessional] = useState("");
	const [appointmentType, setAppointmentType] = useState("Atención Medica");
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState("08:00");
	const [availableTimes, setAvailableTimes] = useState<string[]>(
		generateTimeOptions()
	);
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [activeTab, setActiveTab] = useState("reservar");

	interface Appointment {
		appointment_time: string;
		appointment_date: string;
		appointment_doctor_id: string;
		appointment_type: string;
		doctors: {
			doctor_first_name: string;
			doctor_last_name: string;
		};
	}

	const [appointments, setAppointments] = useState<Appointment[]>([]);

	// Function to fetch professionals from Supabase
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

	// Fetch professionals on component mount
	useEffect(() => {
		fetchProfessionals();
	}, []);

	// Fetch appointments for the selected professional and date to get booked times
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
	// Fetch appointments for the selected patient
	const fetchPatientAppointments = async () => {
		try {
			// Retrieve the patient_id associated with the provided patient_dni
			const { data: patientData, error: patientError } = await supabase
				.from("patients")
				.select("patient_id")
				.eq("patient_dni", patientId)
				.single();

			if (patientError) {
				throw patientError;
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
				.gt("appointment_date", new Date().toISOString().split("T")[0])
				.eq("appointment_patient_id", patientData.patient_id);

			if (professional) {
				query = query.eq("appointment_doctor_id", professional);
			}

			const { data, error } = await query
				.returns<Appointment[]>()
				.order("appointment_date", { ascending: true });

			if (error) {
				throw error;
			}
			setAppointments(data);
		} catch (error) {
			console.error("Error fetching appointments:", error.message);
		}
	};

	// Update available times based on booked times
	const updateAvailableTimes = (bookedTimes: string | any[]) => {
		const allTimes = generateTimeOptions();
		const filteredTimes = allTimes.filter(
			(time) => !bookedTimes.includes(time + ":00")
		);
		setAvailableTimes(filteredTimes);
	};

	// Fetch appointments when professional or date changes
	useEffect(() => {
		if (professional && date) {
			fetchDoctorAppointments();
		}
	}, [professional, date]);

	useEffect(() => {
		handlePatientIdBlur();
	}, [professional]);

	// Function to handle ID input blur event
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
		console.log("ID:", patientId);
		console.log("Professional:", professional);
		console.log("Appointment Type:", appointmentType);
		console.log("Date:", date);
		console.log("Time:", time);
		saveAppointment();
		handleModalClose();
	};

	const saveAppointment = async () => {
		try {
			// Retrieve the patient_id associated with the provided patient_dni
			const { data: patientData, error: patientError } = await supabase
				.from("patients")
				.select("patient_id")
				.eq("patient_dni", patientId)
				.single();

			if (patientError) {
				throw patientError;
			}

			// Use the retrieved patient_id when inserting the appointment
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

			console.log("Appointment saved successfully:", data);
		} catch (error) {
			console.error("Error saving appointment:", error.message);
		}
	};

	const handleProfessionalChange = (e: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setProfessional(e.target.value);
	};

	// Function to handle date change
	const handleDateChange = (date: React.SetStateAction<Date>) => {
		setDate(date);
	};

	const handleLoginModalOpen = () => {
		setIsLoginModalOpen(true);
	};
	const handleLoginModalClose = () => {
		setIsLoginModalOpen(false);
		setUsername("");
		setPassword("");
	};

	// Function to handle time change
	const handleTimeChange = (e: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setTime(e.target.value);
	};

	const handleLogin = (e) => {
		e.preventDefault();
		if (username === "admin" && password === "password") {
			setIsLoginModalOpen(false);
			setUsername("");
			setPassword("");
		} else {
			alert("Usuario o contraseña invalidos.");
		}
	};

	return (
		<div className="flex flex-col min-h-[100dvh]">
			<header className="bg-gray-900 text-white px-4 lg:px-6 h-14 flex items-center">
				<a href="#" className="flex items-center justify-center">
					<CrossIcon className="h-6 w-6" />
					<span className="font-bold text-lg p-1">
						Clinica SePrice
					</span>
				</a>
				<nav className="ml-auto flex gap-4 sm:gap-6">
					<Button
						className="text-sm font-medium hover:underline underline-offset-4"
						onClick={handleLoginModalOpen}
					>
						Administrador
					</Button>
					<Button className="text-sm font-medium hover:underline underline-offset-4">
						Paciente
					</Button>
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
				<Dialog open={isModalOpen} onOpenChange={handleModalClose}>
					<DialogContent className="sm:max-w-[500px] sm:min-h-[495px] sm:max-h-[500px]">
						<DialogHeader>
							<button
								className={`p-4 ${
									activeTab === "reservar"
										? "border-b-2 border-gray-900 font-semibold"
										: ""
								}`}
								onClick={() => setActiveTab("reservar")}
							>
								Reservar Turno
							</button>
							<button
								className={`p-4 ${
									activeTab === "mis-turnos"
										? "border-b-2 border-gray-900 font-semibold"
										: ""
								}`}
								onClick={() => setActiveTab("mis-turnos")}
							>
								Mis Turnos
							</button>
						</DialogHeader>
						{activeTab === "reservar" ? (
							<form
								onSubmit={handleSubmit}
								className="grid gap-4 py-4"
							>
								<div className="grid items-center grid-cols-4 gap-4">
									<Label
										htmlFor="patientId"
										className="text-right"
									>
										DNI
									</Label>
									<Input
										id="patientId"
										value={patientId}
										onChange={(e) =>
											setPatientId(e.target.value)
										}
										onBlur={handlePatientIdBlur}
										type="text"
										placeholder="Ingrese su DNI. Sin puntos."
										required
										className="col-span-3"
									/>
								</div>
								<div className="grid items-center grid-cols-4 gap-4">
									<Label
										htmlFor="professional"
										className="text-right"
									>
										Profesional
									</Label>
									<select
										id="professional"
										value={professional}
										onChange={handleProfessionalChange}
										required
										className="col-span-3 block w-full px-3 py-2 border rounded-md text-sm text-gray-700 focus:ring-1 focus:ring-primary focus:border-primary"
									>
										<option value="">
											Seleccione un profesional
										</option>
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
								<div className="grid items-center grid-cols-4 gap-4">
									<Label
										htmlFor="appointmentType"
										className="text-right"
									>
										Tipo de Turno
									</Label>
									<select
										id="appointmentType"
										value={appointmentType}
										onChange={(e) =>
											setAppointmentType(e.target.value)
										}
										required
										className="col-span-3 block w-full px-3 py-2 border rounded-md text-sm text-gray-700 focus:ring-1 focus:ring-primary focus:border-primary"
									>
										<option value="Atención Medica">
											Atención Medica
										</option>
										<option value="Análisis Clínicos">
											Análisis Clínicos
										</option>
									</select>
								</div>
								<div className="grid items-center grid-cols-4 gap-4">
									<Label
										htmlFor="date"
										className="text-right"
									>
										Fecha
									</Label>
									<DatePicker
										id="date"
										selected={date}
										onChange={handleDateChange}
										dateFormat="dd/MM/yyyy"
                                        minDate={new Date()}
										required
										className="col-span-3 px-3 py-2 border rounded-md text-sm text-gray-700 focus:ring-1 focus:ring-primary focus:border-primary"
									/>
								</div>
								<div className="grid items-center grid-cols-4 gap-4">
									<Label
										htmlFor="time"
										className="text-right"
									>
										Hora
									</Label>
									<div>
										<select
											id="time"
											value={time}
											onChange={handleTimeChange}
											required
											className="col-span-3 px-3 py-2 border rounded-md text-sm text-gray-700 focus:ring-1 focus:ring-primary focus:border-primary"
										>
											{availableTimes.map(
												(timeOption) => (
													<option
														key={timeOption}
														value={timeOption}
													>
														{timeOption}
													</option>
												)
											)}
										</select>
									</div>
								</div>
								<DialogFooter>
									<button
										type="submit"
										className="bg-gray-900 inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 disabled:pointer-events-none disabled:opacity-50"
									>
										Confirmar Turno
									</button>
									<button
										type="button"
										className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-bold text-black shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 disabled:pointer-events-none disabled:opacity-50"
										onClick={handleModalClose}
									>
										Cancelar
									</button>
								</DialogFooter>
							</form>
						) : (
							<div className="overflow-auto sm:max-h-[20rem]">
								<ul className="space-y-2">
									{appointments.length > 0 ? (
										appointments.map(
											(appointment, index) => (
												<li
													key={index}
													className="border p-2 rounded-md bg-gray-900 text-white"
												>
													<p>
														{new Date(
															appointment.appointment_date
														).toLocaleDateString()}{" "}
														{
															appointment.appointment_time
														}
													</p>
													<p>
														{
															appointment.appointment_type
														}
													</p>
													<p>
														{
															appointment.doctors
																.doctor_first_name
														}{" "}
														{
															appointment.doctors
																.doctor_last_name
														}
													</p>
												</li>
											)
										)
									) : (
										<li className="border p-2 rounded-md">
											<p>No hay turnos.</p>
										</li>
									)}
								</ul>
							</div>
						)}
					</DialogContent>
				</Dialog>
				<Dialog
					open={isLoginModalOpen}
					onOpenChange={setIsLoginModalOpen}
				>
					<DialogContent className="sm:max-w-[450px]">
						<DialogHeader>
							<DialogTitle>Administrador</DialogTitle>
							<DialogDescription>
								Por favor ingrese su usuario y contraseña para
								acceder al panel de administrador.
							</DialogDescription>
						</DialogHeader>
						<form
							onSubmit={handleLogin}
							className="grid gap-4 py-4"
						>
							<div className="grid items-center grid-cols-4 gap-4">
								<Label
									htmlFor="username"
									className="text-right"
								>
									Usuario
								</Label>
								<Input
									id="username"
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
									className="col-span-3"
								/>
							</div>
							<div className="grid items-center grid-cols-4 gap-4">
								<Label
									htmlFor="password"
									className="text-right"
								>
									Contraseña
								</Label>
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									className="col-span-3"
								/>
							</div>
							<DialogFooter>
								<button
									type="submit"
									className="bg-gray-900 inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 disabled:pointer-events-none disabled:opacity-50"
								>
									Ingresar
								</button>
								<button
									className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-bold text-black shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 disabled:pointer-events-none disabled:opacity-50"
									onClick={handleLoginModalClose}
								>
									Cancelar
								</button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</main>
			<footer className="bg-gray-900 text-white px-4 lg:px-6 py-4">
				<div className="container mx-auto text-center">
					<p className="text-sm">
						© 2024 Clinica SePrice. Todos los derechos reservados.
					</p>
				</div>
			</footer>
		</div>
	);
}

function CrossIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
		</svg>
	);
}

function HeartPulseIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="red"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
			<path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
		</svg>
	);
}

function MicroscopeIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="blue"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M6 18h8" />
			<path d="M3 22h18" />
			<path d="M14 22a7 7 0 1 0 0-14h-1" />
			<path d="M9 14h2" />
			<path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
			<path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
		</svg>
	);
}

function StethoscopeIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="pink"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
			<path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
			<circle cx="20" cy="10" r="2" />
		</svg>
	);
}

// Function to generate time options
function generateTimeOptions() {
	const times: string[] = [];
	for (let hour = 8; hour < 19; hour++) {
		for (let minutes = 0; minutes < 60; minutes += 30) {
			const time = `${hour.toString().padStart(2, "0")}:${minutes
				.toString()
				.padStart(2, "0")}`;
			times.push(time);
		}
	}
	return times;
}
