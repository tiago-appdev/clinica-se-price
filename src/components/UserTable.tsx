/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import AppointmentModal from "./AppointmentModal";
import FileUploadingModal from "./FileUploadingModal";
import { supabase } from "../../supabase";
import { calculateAge, formatDate, generateTimeOptions } from "../utils/util";
import Appointment from "../types/appointment";
import React from "react";
import Sidebar from '../components/Sidebar';


const UserTable = () => {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	//Modal Turnos
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeTab, setActiveTab] = useState("reservar");
	const [patientId, setPatientId] = useState("");
	const [appointmentType, setAppointmentType] = useState("");
	const [professionals, setProfessionals] = useState<any[]>([]);
	const [professional, setProfessional] = useState("");
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState("08:00");
	const [availableTimes, setAvailableTimes] = useState<string[]>(
		generateTimeOptions()
	);

	const [appointments, setAppointments] = useState<Appointment[]>([]);
	const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
	const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);
	const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>( null)

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

	const handleOpenModal = (appointment) => {
        console.log(appointment)
		setSelectedAppointment(appointment);
		setIsFileUploadModalOpen(true);
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
				.eq("appointment_date", date);
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
			let query = supabase
				.from("appointments")
				.select(
					`appointment_time, 
                             appointment_date, 
                             appointment_doctor_id, 
                             appointment_type, 
                             doctors:appointment_doctor_id (doctor_first_name, doctor_last_name),
                             patients:appointment_patient_id (patient_id, patient_date_of_birth, patient_first_name, patient_last_name)`
				)
				.gte(
					"appointment_date",
					new Date().toISOString().split("T")[0]
				);

			if (patientId) {
				// Retrieve the patient_id associated with the provided patient_dni
				const { data: patientData, error: patientError } =
					await supabase
						.from("patients")
						.select("patient_id")
						.eq("patient_dni", patientId)
						.single();

				if (patientData) {
					query = query.eq(
						"appointment_patient_id",
						patientData.patient_id
					);
				}
				if (patientError) {
					throw patientError;
				}

				if (professional) {
					query = query.eq("appointment_doctor_id", professional);
				}
			}

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
			console.error("Error fetching appointments:", error.message);
		}
	};

	// Fetch appointments for the selected patient
	const fetchAllPatientAppointments = async () => {
		try {
			let query = supabase
				.from("appointments")
				.select(
					`appointment_id, appointment_time, 
                             appointment_date, 
                             appointment_doctor_id, 
                             appointment_type,
                             appointment_status,
                             appointment_payment_status, 
                             doctors:appointment_doctor_id (doctor_first_name, doctor_last_name),
                             patients:appointment_patient_id (patient_id, patient_date_of_birth, patient_first_name, patient_last_name)`
				)
				.eq("appointment_date", date.toISOString().split("T")[0]);

			const { data, error } = await query
				.returns<Appointment[]>()
				.order("appointment_date, appointment_time", {
					ascending: true,
				});

			if (error) {
				throw error;
			}
			console.log(data);
			setAllAppointments(data);
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

	useEffect(() => {
		fetchAllPatientAppointments();
	}, []);

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
	// Function to handle time change
	const handleTimeChange = (e: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setTime(e.target.value);
	};

	const toggleEditModal = () => {
		setIsEditModalOpen(!isEditModalOpen);
	};

	return (
        
        <div
        className="flex flex-col items-center"
		>
			<div
				className="flex flex-col items-center w-11/12 mt-2"
			>
				<div className="flex justify-between items-center w-full mb-4">
					<h2 className="text-2xl font-bold"></h2>
					<button
						onClick={() => setIsModalOpen(true)}
						className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
					>
						{formatDate(date)}
					</button>

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
					<div className="space-x-2">
						<button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
							Hoy
						</button>
						<button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
							+7
						</button>
						<button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
							+14
						</button>
						<button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
							+21
						</button>
						<button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
							+28
						</button>
					</div>
				</div>
				<div className="flex justify-between items-center w-full mb-4">
					<div className="space-x-4">
						<div className="text-gray-700 bg-white border px-4 py-2 rounded">
							Turnos Médicos
						</div>
					</div>
					<button className="text-gray-700 bg-white border border-gray-300 px-4 py-2 rounded">
						Imprimir Horario
					</button>
				</div>
				<div className="w-full overflow-y-auto">
					<table className="w-full text-left border-collapse">
						<thead className="bg-gray-200 sticky top-0">
							<tr>
								<th className="px-4 py-2">Hora</th>
								<th className="px-4 py-2">Ficha</th>
								<th className="px-4 py-2">Paciente</th>
								<th className="px-4 py-2">Edad</th>
								<th className="px-4 py-2">Servicio</th>
								<th className="px-4 py-2">Profesional</th>
								<th className="px-4 py-2">Estado</th>
								<th className="px-4 py-2">Pago</th>
							</tr>
						</thead>
						<tbody>
							{allAppointments.map((appointment) => (
								<tr
									key={appointment.appointment_id}
									className="border-b cursor-pointer"
									onClick={handleOpenModal.bind(this, appointment)}
								>
									<td className="px-4 py-2">
										{appointment.appointment_time}
									</td>
									<td className="px-4 py-2">
										{appointment.patients.patient_id}
									</td>
									<td className="px-4 py-2">{`${appointment.patients.patient_first_name} ${appointment.patients.patient_last_name}`}</td>
									<td className="px-4 py-2">
										{calculateAge(
											appointment.patients
												.patient_date_of_birth
										)}
									</td>
									<td className="px-4 py-2">
										{appointment.appointment_type}
									</td>
									<td className="px-4 py-2">{`${appointment.doctors.doctor_first_name} ${appointment.doctors.doctor_last_name}`}</td>
									<td className="px-4 py-2">
										<button
											className={`px-4 py-2 rounded ${
												appointment.appointment_status ===
												"Pending"
													? "bg-red-500 text-white"
													: "bg-green-500 text-white"
											}`}
										>
											{appointment.appointment_status ===
											"Pending"
												? "Pendiente"
												: "Realizado"}
										</button>
									</td>
									<td className="px-4 py-2">
										<button
											className={`px-4 py-2 rounded ${
												appointment.appointment_payment_status
													? "bg-green-500 text-white"
													: "bg-red-500 text-white"
											}`}
										>
											{appointment.appointment_payment_status
												? "Pagado"
												: "Pendiente"}
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{selectedAppointment && (
						<FileUploadingModal
							isOpen={isFileUploadModalOpen}
							onOpenChange={setIsFileUploadModalOpen}
							appointmentId={
								selectedAppointment.appointment_id
							}
							patientId={selectedAppointment.patients.patient_id}
						/>
					)}
				</div>
			</div>

			{isEditModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<button
							onClick={toggleEditModal}
							type="button"
							className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
						>
							<svg
								className="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
						<div className="p-6 space-y-6">
							<div className="grid grid-cols-6 gap-6">
								<div className="col-span-6 sm:col-span-3">
									<label
										htmlFor="first-name"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										First Name
									</label>
									<input
										type="text"
										name="first-name"
										id="first-name"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Bonnie"
										required
									/>
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label
										htmlFor="last-name"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Last Name
									</label>
									<input
										type="text"
										name="last-name"
										id="last-name"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Green"
										required
									/>
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Email
									</label>
									<input
										type="email"
										name="email"
										id="email"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="example@company.com"
										required
									/>
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label
										htmlFor="position"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Position
									</label>
									<input
										type="text"
										name="position"
										id="position"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Web Developer"
										required
									/>
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label
										htmlFor="status"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Status
									</label>
									<select
										id="status"
										name="status"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									>
										<option>Active</option>
										<option>Inactive</option>
									</select>
								</div>
							</div>
						</div>
						<div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
							<button
								onClick={toggleEditModal}
								type="button"
								className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								I accept
							</button>
							<button
								onClick={toggleEditModal}
								type="button"
								className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
							>
								Decline
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserTable;
