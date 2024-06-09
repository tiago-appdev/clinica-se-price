"use client";

import React, { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "../components/Dialog";
import Input from "../components/Input";
import Label from "../components/Label";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [id, setId] = useState("");
	const [professionals, setProfessionals] = useState([]);
	const [professional, setProfessional] = useState("");
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedTime, setSelectedTime] = useState("08:30"); // Initial time value
	const [datetime, setDatetime] = useState("");

	// Function to fetch professionals from Supabase
	// const fetchProfessionals = async () => {
	// 	try {
	// 		const { data, error } = await supabase
	// 			.from("professionals")
	// 			.select("*");
	// 		if (error) {
	// 			throw error;
	// 		}
	// 		setProfessionals(data);
	// 	} catch (error) {
	// 		console.error("Error fetching professionals:", error.message);
	// 	}
	// };

	// Fetch professionals on component mount
	// useEffect(() => {
	// 	fetchProfessionals();
	// }, []);

	const handleModalOpen = () => {
		setIsModalOpen(true);
	};
	const handleModalClose = () => {
		setIsModalOpen(false);
		setId("");
		setProfessional("");
		setDatetime("");
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("ID:", id);
		console.log("Professional:", professional);
		console.log("Datetime:", datetime);
		handleModalClose();
	};

	// Function to handle date change
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	// Function to handle time change
	const handleTimeChange = (e) => {
		setSelectedTime(e.target.value);
	};

	return (
		<div className="flex flex-col min-h-[100dvh]">
			<header className="bg-gray-900 text-white px-4 lg:px-6 h-14 flex items-center">
				<a href="#" className="flex items-center justify-center">
					<CrossIcon className="h-6 w-6" />
					<span className="font-bold text-lg">Clinica SePrice</span>
				</a>
				<nav className="ml-auto flex gap-4 sm:gap-6">
					<a
						href="#"
						className="text-sm font-medium hover:underline underline-offset-4"
					>
						Administrador
					</a>
					<a
						href="#"
						className="text-sm font-medium hover:underline underline-offset-4"
					>
						Paciente
					</a>
				</nav>
			</header>
			<main className="flex-1">
				<section className="flex items-center justify-center w-full py-12 md:py-24 lg:py-32">
					<div className="container px-4 md:px-6 space-y-8">
						<div className="grid max-w-[800px] mx-auto gap-4 text-center">
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
									Diagnósticos
								</h3>
								<p className="text-gray-500 text-center dark:text-gray-400">
									Servicios de diagnóstico avanzados para
									identificar y abordar sus inquietudes de
									salud.
								</p>
							</div>
							<div className="flex flex-col items-center justify-center space-y-2 p-4">
								<StethoscopeIcon className="h-8 w-8" />
								<h3 className="text-lg font-semibold">
									Atención de Urgencia
								</h3>
								<p className="text-gray-500 text-center dark:text-gray-400">
									Atención rápida y eficiente para necesidades
									médicas inesperadas.
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className="bg-gray-900 text-white px-4 md:px-6 py-6 w-full shrink-0">
				<div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-sm">
						&copy; 2024 Clinica SePrice. Todos los derechos
						reservados.
					</p>
					<nav className="flex gap-4 sm:gap-6">
						<a
							href="#"
							className="text-sm hover:underline underline-offset-4"
						>
							Términos de Servicio
						</a>
						<a
							href="#"
							className="text-sm hover:underline underline-offset-4"
						>
							Política de Privacidad
						</a>
						<a
							href="#"
							className="text-sm hover:underline underline-offset-4"
						>
							Descargo de responsabilidad
						</a>
						<a
							href="#"
							className="text-sm hover:underline underline-offset-4"
						>
							Contáctenos
						</a>
					</nav>
				</div>
			</footer>
			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="sm:max-w-[450px]">
					<DialogHeader>
						<DialogTitle>Reservar Turno</DialogTitle>
						<DialogDescription>
							Por favor, proporcione la siguiente información para
							reservar su turno.
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleSubmit} className="grid gap-4 py-4">
						<div className="grid items-center grid-cols-4 gap-4">
							<Label htmlFor="id" className="text-right">
								DNI
							</Label>
							<Input
								id="id"
								value={id}
								onChange={(e) => setId(e.target.value)}
								className="col-span-3"
							/>
						</div>
						<div className="grid items-center grid-cols-4 gap-4">
							<Label
								htmlFor="professional"
								className="text-right"
							>
								Seleccioná el Profesional
							</Label>
							<select
								id="professional"
								value={professional}
								onChange={(e) =>
									setProfessional(e.target.value)
								}
								className="col-span-3 block w-full px-3 py-2 border rounded-md text-sm text-gray-700 focus:ring-1 focus:ring-primary focus:border-primary"
							>
								<option value="">
									Seleccione un profesional
								</option>
								{professionals.map((prof) => (
									// <option key={prof.id} value={prof.id}>
									// 	{prof.name}
									// </option>
									<option>Juan Gonzalez</option>
								))}
							</select>
						</div>
						<div className="grid items-center grid-cols-4 gap-4">
							<Label htmlFor="date" className="text-right">
								Fecha
							</Label>
							<DatePicker
								id="date"
								selected={selectedDate}
								onChange={handleDateChange}
								dateFormat="dd/MM/yyyy"
								className="col-span-3 px-3 py-2 border rounded-md text-sm text-gray-700 focus:ring-1 focus:ring-primary focus:border-primary"
							/>
						</div>
						<div className="grid items-center grid-cols-4 gap-4">
							<Label htmlFor="time" className="text-right">
								Hora
							</Label>
							<div>
								<select
									id="time"
									value={selectedTime}
									onChange={handleTimeChange}
									className="col-span-3 px-3 py-2 border rounded-md text-sm text-gray-700 focus:ring-1 focus:ring-primary focus:border-primary"
								>
									{/* Generate options for time */}
									{generateTimeOptions()}
								</select>
							</div>
						</div>
						<DialogFooter>
							<button
								type="submit"
								className="inline-flex h-10 items-center justify-center rounded-md bg-green-700 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 disabled:pointer-events-none disabled:opacity-50"
							>
								Confirmar Turno
							</button>
							<button
								type="button"
								className="inline-flex h-10 items-center justify-center rounded-md bg-red-700 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 disabled:pointer-events-none disabled:opacity-50"
								onClick={handleModalClose}
							>
								Cancelar
							</button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
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
			stroke="currentColor"
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
			stroke="currentColor"
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
			stroke="currentColor"
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
const generateTimeOptions = (): JSX.Element[] => {
	const startTime = new Date();
	startTime.setHours(8, 30, 0); // Start time: 08:30
	const endTime = new Date();
	endTime.setHours(12, 20, 0); // End time: 12:20

	const timeOptions: JSX.Element[] = [];
	let currentTime = new Date(startTime);

	// Loop to generate options every 10 minutes
	while (currentTime <= endTime) {
		const optionValue = `${currentTime
			.getHours()
			.toString()
			.padStart(2, "0")}:${currentTime
			.getMinutes()
			.toString()
			.padStart(2, "0")}`;
		const optionLabel = `${optionValue}`;
		timeOptions.push(
			<option key={optionValue} value={optionValue}>
				{optionLabel}
			</option>
		);
		currentTime.setMinutes(currentTime.getMinutes() + 10);
	}

	return timeOptions;
};
