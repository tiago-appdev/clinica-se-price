import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Input } from "../components";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Separator } from "../components/Separator";
import Appointment from "../types/appointment";
import { supabase } from "../../supabase";
import { useAuth } from "../context/AuthContext";

function PatientPage() {
	const { isAuthenticated, userId } = useAuth(); // Destructure isAuthenticated, login, and logout
	const [appointments, setAppointments] = useState<Appointment[]>([]);
	const [patientInfo, setPatientInfo] = useState<any>(null);

	useEffect(() => {
		const fetchPatientInfo = async () => {
			try {
				if (!isAuthenticated || !userId) return;

				// Fetch user data from supabase
				const { data: patientData, error: patientError } =
					await supabase
						.from("patients")
						.select("*")
						.eq("patient_user_id", userId)
						.single();

				if (!patientData || !patientData.patient_id) {
					throw new Error("Patient not found");
				}

				if (patientError) {
					throw patientError;
				}

				setPatientInfo(patientData);

				let query = supabase
					.from("appointments")
					.select(
						`appointment_time, 
             appointment_date, 
             appointment_doctor_id, 
             appointment_type,
             appointment_status,
             doctors:appointment_doctor_id (doctor_first_name, doctor_last_name)`
					)
					.eq("appointment_patient_id", patientData.patient_id)


				const { data, error } = await query
					.returns<Appointment[]>()
					.order("appointment_date, appointment_time", {
						ascending: true,
					});

				if (error) {
					throw error;
				}
				console.log(data);
				setAppointments(data);
			} catch (error) {
				console.error("Error fetching patient data:", error.message);
				// Handle error or set appropriate state for error display
			}
		};

		fetchPatientInfo();
	}, [isAuthenticated, userId]); // Fetch data when 'user' changes

	return (
		<div className="flex flex-col min-h-screen">
			{/* <header className="bg-gray-900 text-white px-4 lg:px-6 h-12 flex items-center">
        <a href="#" className="flex items-center">
          <CrossIcon className="h-6 w-6" />
          <span className="font-bold text-lg ml-2">Clinica SePrice</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">

        </nav>
      </header> */}
			<NavBar message="Logout"></NavBar>

			<div className="flex flex-1">
				<nav className="w-64 bg-gray-100 dark:bg-gray-900 flex flex-col gap-1 p-4">
					<a
						href="#"
						className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 bg-gray-200 dark:bg-gray-800 dark:text-gray-50 transition-all"
					>
						Dashboard
					</a>
					<a
						href="#"
						className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-gray-900 dark:hover:text-gray-50"
					>
						Appointments
					</a>
					<a
						href="#"
						className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-gray-900 dark:hover:text-gray-50"
					>
						Profile
					</a>
					<a
						href="#"
						className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-gray-900 dark:hover:text-gray-50"
					>
						Medical Records
					</a>
					<a
						href="#"
						className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-gray-900 dark:hover:text-gray-50"
					>
						Settings
					</a>
				</nav>

				<div className="flex-1 p-4 md:p-6">
					<header className="flex h-16 items-center justify-between border-b border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800 px-4 md:px-6">
						<div className="flex items-center gap-4">
							<button className="lg:hidden">
								<span className="sr-only">
									Toggle navigation
								</span>
							</button>
							<h1 className="text-white font-semibold md:text-xl">
								Dashboard
							</h1>
						</div>
						<div className="flex items-center gap-4">
							<form>
								<div className="relative">
									<Input
										type="search"
										placeholder="Search"
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
									<CardTitle>Appointments</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid gap-4">
										{appointments.length > 0? (appointments.map(
											(appointment, index) => (
												<div
													key={index}
													className="grid gap-2"
												>
													<div className="flex items-center justify-between">
														<div className="text-sm text-gray-500 dark:text-gray-400">
															{
																appointment.appointment_date
															}{" "}
															at{" "}
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
														</div>
														<div
															className={`rounded-full px-3 py-1 text-xs font-medium ${
																appointment.appointment_status ===
																"Confirmed"
																	? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
																	: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
															}`}
														>
															{
																appointment.appointment_status
															}
														</div>
													</div>
													{index <
														appointments.length -
															1 && <Separator />}
												</div>
											))) : (
                                                <div className="text-gray-500 dark:text-gray-400 text-center">
                                                    No appointments found
                                                </div>
										)}
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Personal Details</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid gap-4">
										<div className="flex items-center justify-between">
											<div>Name</div>
											<div>
												{patientInfo?.patient_first_name} {patientInfo?.patient_last_name}
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
											<div>Phone</div>
											<div>
												{patientInfo?.patient_phone}
											</div>
										</div>
										<Separator />
										<div className="flex items-center justify-between">
											<div>Date of Birth</div>
											<div>
												{patientInfo?.patient_date_of_birth}
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
						<Card>
							<CardHeader>
								<CardTitle>Medical Results</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-4">
									<div className="grid gap-2">
										<div className="flex items-center justify-between">
											<div className="font-medium">
												Blood Test
											</div>
											<div className="text-sm text-gray-500 dark:text-gray-400">
												June 1, 2023
											</div>
										</div>
										<div className="flex items-center justify-between">
											<div>
												<div>Hemoglobin</div>
												<div className="text-sm text-gray-500 dark:text-gray-400">
													14.2 g/dL
												</div>
											</div>
											<div>
												<div>Cholesterol</div>
												<div className="text-sm text-gray-500 dark:text-gray-400">
													180 mg/dL
												</div>
											</div>
											<div>
												<div>Glucose</div>
												<div className="text-sm text-gray-500 dark:text-gray-400">
													95 mg/dL
												</div>
											</div>
										</div>
									</div>
									<Separator />
									<div className="grid gap-2">
										<div className="flex items-center justify-between">
											<div className="font-medium">
												X-Ray
											</div>
											<div className="text-sm text-gray-500 dark:text-gray-400">
												May 15, 2023
											</div>
										</div>
										<div className="flex items-center justify-between">
											<div>
												<div>Chest X-Ray</div>
												<div className="text-sm text-gray-500 dark:text-gray-400">
													<a
														href="#"
														className="underline"
													>
														View Report
													</a>
												</div>
											</div>
											<div>
												<div>Bone Density</div>
												<div className="text-sm text-gray-500 dark:text-gray-400">
													<a
														href="#"
														className="underline"
													>
														View Report
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</main>
				</div>
			</div>
		</div>
	);
}

export default PatientPage;
