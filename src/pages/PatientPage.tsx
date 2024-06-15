import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Footer, Input } from "../components";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Separator } from "../components/Separator";
import Appointment from "../types/appointment";
import { supabase } from "../../supabase";
import { useAuth } from "../context/AuthContext";

function PatientPage() {
	const { isAuthenticated, userId } = useAuth();
	const [appointments, setAppointments] = useState<Appointment[]>([]);
	const [patientInfo, setPatientInfo] = useState<any>(null);
	const [medicalResults, setMedicalResults] = useState<any[]>([]);

	// Función para obtener la información del paciente
	const fetchPatientInfo = async (userId) => {
		try {
            console.log(userId)
			const { data: patientData, error: patientError } = await supabase
				.from("patients")
				.select("*")
				.eq("patient_user_id", userId)
				.single();

			if (!patientData || !patientData.patient_id) {
				throw new Error("Paciente no encontrado");
			}

			if (patientError) {
				throw patientError;
			}

			setPatientInfo(patientData);
			return patientData.patient_id;
		} catch (error) {
			console.error(
				"Error al obtener los datos del paciente:",
				error.message
			);
			throw error;
		}
	};

	// Función para obtener los turnos del paciente
	const fetchAppointments = async (patientId) => {
		try {
			const { data, error } = await supabase
				.from("appointments")
				.select(
					`appointment_time, 
					appointment_date, 
					appointment_doctor_id, 
					appointment_type,
					appointment_status,
					doctors:appointment_doctor_id (doctor_first_name, doctor_last_name)`
				)
				.limit(3) // Limitar a 3 turnos
				.eq("appointment_patient_id", patientId)
				.order("appointment_date, appointment_time", {
					ascending: true,
				})
				.returns<Appointment[]>();

			if (error) {
				throw error;
			}
			setAppointments(data);
		} catch (error) {
			console.error("Error al obtener los turnos:", error.message);
			throw error;
		}
	};

	// Función para obtener los resultados médicos del paciente
	const fetchMedicalResults = async (patientId) => {
		try {
			const { data, error } = await supabase
				.from("medical_results")
				.select(
					`
					*,
					appointments (
						appointment_type
					)
				`
				)
				.eq("patient_id", patientId);

			if (error) {
				throw error;
			}
			setMedicalResults(data);
		} catch (error) {
			console.error(
				"Error al obtener los resultados médicos:",
				error.message
			);
			throw error;
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (!isAuthenticated || !userId) return;

				const patientId = await fetchPatientInfo(userId);
				await fetchAppointments(patientId);
				await fetchMedicalResults(patientId);
			} catch (error) {
			}
		};

		fetchData();
	}, [isAuthenticated, userId]);
	return (
		<div className="flex flex-col min-h-screen">
			<NavBar message="Cerrar sesión"></NavBar>

			<div className="flex flex-1">
				<div className="flex-1 p-4 md:p-6">
					<header className="flex h-16 items-center justify-between border-b border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800 px-4 md:px-6">
						<div className="flex items-center gap-4">
							<button className="lg:hidden">
								<span className="sr-only">
									Cambiar navegación
								</span>
							</button>
							<h1 className="text-white font-semibold md:text-xl">
								Panel de Control
							</h1>
						</div>
						<div className="flex items-center gap-4">
							<form>
								<div className="relative">
									<Input
										type="search"
										placeholder="Buscar"
										className="w-full rounded-md bg-white px-8 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 dark:bg-gray-950 dark:text-gray-50 dark:focus:ring-gray-300"
									/>
								</div>
							</form>
						</div>
					</header>

					<main className="grid gap-8 p-4 md:p-6">
						<div className="grid gap-8 lg:grid-cols-2">
							<Card>
								<CardHeader>
									<CardTitle>Turnos</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid gap-4">
										{appointments.length > 0 ? (
											appointments.map(
												(appointment, index) => {
													const appointmentDate =
														new Date(
															appointment.appointment_date
														);
													const isAppointmentCompleted =
														appointment.appointment_status ===
															"Completed" ||
														appointmentDate <
															new Date();
													return (
														<div
															key={index}
															className="grid gap-2"
														>
															<div className="flex items-center justify-between">
																<div className="text-sm text-gray-500 dark:text-gray-400">
																	{
																		appointment.appointment_date
																	}{" "}
																	a las{" "}
																	{
																		appointment.appointment_time
																	}
																</div>
															</div>
															<div className="flex items-center justify-between">
																<div>
																	{
																		appointment
																			.doctors
																			?.doctor_first_name
																	}{" "}
																	{
																		appointment
																			.doctors
																			?.doctor_last_name
																	}
																</div>
																<div
																	className={`rounded-full px-3 py-1 text-xs font-bold ${
																		isAppointmentCompleted
																			? "bg-gray-900 text-green-600 dark:bg-black-900/20 dark:text-white"
																			: "bg-gray-100 text-gray-600 dark:bg-gray-100 dark:text-gray-700"
																	}`}
																>
																	{isAppointmentCompleted
																		? "Completada"
																		: "Pendiente"}
																</div>
															</div>
															{index <
																appointments.length -
																	1 && (
																<Separator />
															)}
														</div>
													);
												}
											)
										) : (
											<div className="text-gray-500 dark:text-gray-400 text-center">
												No se encontraron turnos
											</div>
										)}
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Detalles Personales</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid gap-4">
										<div className="flex items-center justify-between">
											<div>Nombre</div>
											<div>
												{
													patientInfo?.patient_first_name
												}{" "}
												{patientInfo?.patient_last_name}
											</div>
										</div>
										<Separator />
										<div className="flex items-center justify-between">
											<div>Email</div>
											<div>
												{patientInfo?.patient_email}
											</div>
										</div>
										<Separator />
										<div className="flex items-center justify-between">
											<div>Teléfono</div>
											<div>
												{patientInfo?.patient_phone}
											</div>
										</div>
										<Separator />
										<div className="flex items-center justify-between">
											<div>Fecha de Nacimiento</div>
											<div>
												{
													patientInfo?.patient_date_of_birth
												}
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
						<Card>
							<CardHeader>
								<CardTitle>Resultados Médicos</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-4">
									{medicalResults.length > 0 ? (
										medicalResults.map((result, index) => (
											<div
												key={index}
												className="grid gap-2"
											>
												<div className="flex items-center justify-between">
													<div className="font-medium">
														Informe de{" "}
														{
															result.appointments
																.appointment_type
														}
													</div>
													<div className="text-sm text-gray-500 dark:text-gray-400">
														{new Date(
															result.result_created_at
														).toLocaleDateString()}
													</div>
												</div>
												{result.result_type ===
												"text" ? (
													<div className="text-sm text-gray-500 dark:text-gray-400">
														{result.result_text}
													</div>
												) : (
													<div className="text-sm text-gray-500 dark:text-gray-400">
														<a
															href={
																result.result_file_url
															}
															className="underline"
															target="_blank"
															rel="noopener noreferrer"
														>
															Ver Informe
														</a>
													</div>
												)}
												{index <
													medicalResults.length -
														1 && <Separator />}
											</div>
										))
									) : (
										<div className="text-gray-500 dark:text-gray-400 text-center">
											No se encontraron resultados médicos
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					</main>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default PatientPage;
